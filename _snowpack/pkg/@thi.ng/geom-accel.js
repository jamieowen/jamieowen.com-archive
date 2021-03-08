import { e as ensureArray } from '../common/ensure-array-ed3d476a.js';
import { m as map } from '../common/map-ab3a157d.js';
import { E as EPS } from '../common/api-37d17bdb.js';
import { d as distSq } from '../common/distsq-6316f3e1.js';
import '../common/illegal-arguments-f9331715.js';
import '../common/deferror-480a42fb.js';
import '../common/is-array-a7fa88fb.js';
import '../common/implements-function-c507affc.js';
import '../common/codegen-6bdfa5cb.js';
import '../common/unsupported-d467609e.js';
import '../common/comp-b69ffdf6.js';
import '../common/range-90bff8dc.js';

const compare = (a, b) => {
    if (a === b) {
        return 0;
    }
    if (a == null) {
        return b == null ? 0 : -1;
    }
    if (b == null) {
        return a == null ? 0 : 1;
    }
    if (typeof a.compare === "function") {
        return a.compare(b);
    }
    if (typeof b.compare === "function") {
        return -b.compare(a);
    }
    return a < b ? -1 : a > b ? 1 : 0;
};

/**
 * Generic binary heap / priority queue with customizable ordering via
 * user-supplied comparator. By default, implements min-heap ordering
 * and uses @thi.ng/compare.
 *
 * @example
 * ```ts
 * h = new Heap([20, 5, 10]);
 * h.push(15);
 *
 * h.pop(); // 5
 * h.pop(); // 10
 * h.pop(); // 15
 * h.pop(); // 20
 * h.pop(); // undefined
 * ```
 */
class Heap {
    constructor(values, opts) {
        opts = Object.assign({ compare: compare }, opts);
        this.compare = opts.compare;
        this.values = [];
        if (values) {
            this.into(values);
        }
    }
    static parentIndex(idx) {
        return idx > 0 ? (idx - 1) >> 1 : -1;
    }
    static childIndex(idx) {
        return idx >= 0 ? (idx << 1) + 1 : -1;
    }
    *[Symbol.iterator]() {
        yield* this.min();
    }
    get length() {
        return this.values.length;
    }
    copy() {
        const h = this.empty();
        h.values = this.values.slice();
        return h;
    }
    clear() {
        this.values.length = 0;
    }
    empty() {
        return new Heap(null, { compare: this.compare });
    }
    peek() {
        return this.values[0];
    }
    push(val) {
        this.values.push(val);
        this.percolateUp(this.values.length - 1);
        return this;
    }
    pop() {
        const vals = this.values;
        const tail = vals.pop();
        let res;
        if (vals.length > 0) {
            res = vals[0];
            vals[0] = tail;
            this.percolateDown(0);
        }
        else {
            res = tail;
        }
        return res;
    }
    pushPop(val, vals = this.values) {
        const head = vals[0];
        if (vals.length > 0 && this.compare(head, val) <= 0) {
            vals[0] = val;
            val = head;
            this.percolateDown(0, vals);
        }
        return val;
    }
    into(vals) {
        for (let v of vals) {
            this.push(v);
        }
        return this;
    }
    /**
     * Calls {@link Heap.pushPop} for each given value in `vals` and
     * returns last result (i.e. the smallest value in heap after
     * processing all `vals`).
     *
     * @param vals - values to insert
     */
    pushPopAll(vals) {
        let res;
        for (let v of vals) {
            res = this.pushPop(v);
        }
        return res;
    }
    replaceHead(val) {
        const res = this.values[0];
        this.values[0] = val;
        this.percolateDown(0);
        return res;
    }
    heapify(vals = this.values) {
        for (var i = (vals.length - 1) >> 1; i >= 0; i--) {
            this.percolateDown(i, vals);
        }
    }
    /**
     * Returns the largest `n` values (or less) in heap, based on
     * comparator ordering.
     *
     * @param n - number of values
     */
    max(n = this.values.length) {
        const { compare, values } = this;
        const res = values.slice(0, n);
        if (!n) {
            return res;
        }
        this.heapify(res);
        for (let m = values.length; n < m; n++) {
            this.pushPop(values[n], res);
        }
        return res.sort((a, b) => compare(b, a));
    }
    /**
     * Returns the smallest `n` values (or less) in heap, based on
     * comparator ordering.
     *
     * @param n - number of values
     */
    min(n = this.values.length) {
        const { compare, values } = this;
        const res = values.slice(0, n).sort(compare);
        if (!n) {
            return res;
        }
        let x = res[n - 1], y;
        for (let i = n, m = values.length; i < m; i++) {
            y = values[i];
            if (compare(y, x) < 0) {
                res.splice(binarySearch(y, res, 0, n, compare), 0, y);
                res.pop();
                x = res[n - 1];
            }
        }
        return res;
    }
    parent(n) {
        n = Heap.parentIndex(n);
        return n >= 0 ? this.values[n] : undefined;
    }
    children(n) {
        n = Heap.childIndex(n);
        const vals = this.values;
        const m = vals.length;
        if (n >= m)
            return;
        if (n === m - 1)
            return [vals[n]];
        return [vals[n], vals[n + 1]];
    }
    leaves() {
        const vals = this.values;
        if (!vals.length) {
            return [];
        }
        return vals.slice(Heap.parentIndex(vals.length - 1) + 1);
    }
    percolateUp(i, vals = this.values) {
        const node = vals[i];
        const cmp = this.compare;
        while (i > 0) {
            const pi = (i - 1) >> 1;
            const parent = vals[pi];
            if (cmp(node, parent) >= 0) {
                break;
            }
            vals[pi] = node;
            vals[i] = parent;
            i = pi;
        }
    }
    percolateDown(i, vals = this.values) {
        const n = vals.length;
        const node = vals[i];
        const cmp = this.compare;
        let child = (i << 1) + 1;
        while (child < n) {
            const next = child + 1;
            if (next < n && cmp(vals[child], vals[next]) >= 0) {
                child = next;
            }
            if (cmp(vals[child], node) < 0) {
                vals[i] = vals[child];
            }
            else {
                break;
            }
            i = child;
            child = (i << 1) + 1;
        }
        vals[i] = node;
    }
}
const binarySearch = (x, vals, lo, hi, cmp) => {
    let m;
    while (lo < hi) {
        m = (lo + hi) >>> 1;
        if (cmp(x, vals[m]) < 0) {
            hi = m;
        }
        else {
            lo = m + 1;
        }
    }
    return lo;
};

/** @internal */
const CMP = (a, b) => b[0] - a[0];
/** @internal */
const addResults = (fn, sel, acc) => {
    for (let n = sel.sort(CMP).length; --n >= 0;) {
        const s = sel[n][1];
        s && acc.push(fn(s));
    }
    return acc;
};
/**
 * Shared `into()` impl for spatial map types.
 *
 * @param map
 * @param pairs
 * @param eps
 *
 * @internal
 */
const into = (map, pairs, eps) => {
    let ok = true;
    for (let p of pairs) {
        ok = map.set(p[0], p[1], eps) && ok;
    }
    return ok;
};

class KdNode {
    constructor(parent, dim, key, val) {
        this.parent = parent;
        this.d = dim;
        this.k = key;
        this.v = val;
    }
    get height() {
        return (1 + Math.max(this.l ? this.l.height : 0, this.r ? this.r.height : 0));
    }
}
/**
 * {@link https://en.wikipedia.org/wiki/K-d_tree}
 *
 * Partially based on:
 * {@link https://github.com/ubilabs/kd-tree-javascript}
 *
 */
class KdTreeMap {
    constructor(dim, pairs) {
        this.dim = dim;
        this._size = 0;
        this.root = pairs ? this.buildTree(ensureArray(pairs), 0) : undefined;
    }
    *[Symbol.iterator]() {
        let queue = this.root ? [this.root] : [];
        while (queue.length) {
            const n = queue.pop();
            if (n) {
                yield [n.k, n.v];
                queue.push(n.r, n.l);
            }
        }
    }
    *keys() {
        let queue = this.root ? [this.root] : [];
        while (queue.length) {
            const n = queue.pop();
            if (n) {
                yield n.k;
                queue.push(n.r, n.l);
            }
        }
    }
    values() {
        return map((p) => p[1], this);
    }
    get size() {
        return this._size;
    }
    get height() {
        return this.root ? this.root.height : 0;
    }
    get ratio() {
        return this._size ? this.height / Math.log2(this._size) : 0;
    }
    copy() {
        return new KdTreeMap(this.dim, this);
    }
    clear() {
        delete this.root;
        this._size = 0;
    }
    empty() {
        return new KdTreeMap(this.dim);
    }
    set(key, val, eps = EPS) {
        eps = Math.max(0, eps);
        eps *= eps;
        const search = (node, parent) => node
            ? search(key[node.d] < node.k[node.d] ? node.l : node.r, node)
            : parent;
        let parent;
        if (this.root) {
            parent = nearest1(key, [eps, undefined], this.dim, this.root)[1];
            if (parent) {
                parent.v = val;
                return false;
            }
            parent = search(this.root, undefined);
            const dim = parent.d;
            parent[key[dim] < parent.k[dim] ? "l" : "r"] = new KdNode(parent, (dim + 1) % this.dim, key, val);
        }
        else {
            this.root = new KdNode(undefined, 0, key, val);
        }
        this._size++;
        return true;
    }
    into(pairs, eps = EPS) {
        return into(this, pairs, eps);
    }
    remove(key) {
        const node = find(key, this.root, 0);
        if (node) {
            remove(node) && (this.root = undefined);
            this._size--;
            return true;
        }
        return false;
    }
    has(key, eps = EPS) {
        return (!!this.root &&
            !!nearest1(key, [eps * eps, undefined], this.dim, this.root)[1]);
    }
    get(key, eps = EPS) {
        if (this.root) {
            const node = nearest1(key, [eps * eps, undefined], this.dim, this.root)[1];
            return node ? node.v : undefined;
        }
    }
    query(q, maxDist, limit, acc) {
        return this.doSelect(q, (x) => [x.k, x.v], maxDist, limit, acc);
    }
    queryKeys(q, maxDist, limit, acc) {
        return this.doSelect(q, (x) => x.k, maxDist, limit, acc);
    }
    queryValues(q, maxDist, limit, acc) {
        return this.doSelect(q, (x) => x.v, maxDist, limit, acc);
    }
    doSelect(q, f, maxDist, maxNum = 1, acc = []) {
        if (!this.root)
            return [];
        maxDist *= maxDist;
        if (maxNum === 1) {
            const sel = nearest1(q, [maxDist, undefined], this.dim, this.root)[1];
            sel && acc.push(f(sel));
        }
        else {
            const nodes = new Heap([[maxDist, undefined]], {
                compare: CMP,
            });
            nearest(q, nodes, this.dim, maxNum, this.root);
            return addResults(f, nodes.values, acc);
        }
        return acc;
    }
    buildTree(points, depth, parent) {
        const n = points.length;
        if (n === 0) {
            return;
        }
        this._size++;
        let dim = depth % this.dim;
        if (n === 1) {
            return new KdNode(parent, dim, ...points[0]);
        }
        points.sort((a, b) => a[0][dim] - b[0][dim]);
        const med = n >>> 1;
        const node = new KdNode(parent, dim, ...points[med]);
        node.l = this.buildTree(points.slice(0, med), depth + 1, node);
        node.r = this.buildTree(points.slice(med + 1), depth + 1, node);
        return node;
    }
}
/**
 * Returns node for point or `undefined` if none found.
 *
 * @param p - point
 * @param node - tree node
 * @param epsSq - squared epsilon / tolerance
 */
const find = (p, node, epsSq) => {
    if (!node)
        return;
    return distSq(p, node.k) <= epsSq
        ? node
        : find(p, p[node.d] < node.k[node.d] ? node.l : node.r, epsSq);
};
const findMin = (node, dim) => {
    if (!node)
        return;
    if (node.d === dim) {
        return node.l ? findMin(node.l, dim) : node;
    }
    const q = node.k[dim];
    const l = findMin(node.l, dim);
    const r = findMin(node.r, dim);
    let min = node;
    if (l && l.k[dim] < q) {
        min = l;
    }
    if (r && r.k[dim] < min.k[dim]) {
        min = r;
    }
    return min;
};
/**
 * Returns true if root is to be deleted.
 *
 * @param node - tree node
 */
const remove = (node) => {
    if (!node.l && !node.r) {
        if (!node.parent) {
            return true;
        }
        const parent = node.parent;
        const pdim = parent.d;
        parent[node.k[pdim] < parent.k[pdim] ? "l" : "r"] = undefined;
        return;
    }
    let next;
    let nextP;
    if (node.r) {
        next = findMin(node.r, node.d);
        nextP = next.k;
        remove(next);
        node.k = nextP;
    }
    else {
        next = findMin(node.l, node.d);
        nextP = next.k;
        remove(next);
        node.r = node.l;
        node.l = undefined;
        node.k = nextP;
    }
};
const nearest = (q, acc, dims, maxNum, node) => {
    const p = node.k;
    const ndist = distSq(p, q);
    if (!node.l && !node.r) {
        collect(acc, maxNum, node, ndist);
        return;
    }
    const tdist = nodeDist(node, dims, q, p);
    let best = bestChild(node, q);
    nearest(q, acc, dims, maxNum, best);
    collect(acc, maxNum, node, ndist);
    if (tdist < acc.values[0][0]) {
        best = best === node.l ? node.r : node.l;
        best && nearest(q, acc, dims, maxNum, best);
    }
};
/**
 * Optimized version of {@link nearest} for single closest point search.
 *
 * @param q - search point
 * @param acc - accumulator
 * @param dims - dimensions
 * @param node - tree node
 */
const nearest1 = (q, acc, dims, node) => {
    const p = node.k;
    const ndist = distSq(p, q);
    if (!node.l && !node.r) {
        collect1(acc, node, ndist);
        return acc;
    }
    const tdist = nodeDist(node, dims, q, p);
    let best = bestChild(node, q);
    nearest1(q, acc, dims, best);
    collect1(acc, node, ndist);
    if (tdist < acc[0]) {
        best = best === node.l ? node.r : node.l;
        best && nearest1(q, acc, dims, best);
    }
    return acc;
};
const bestChild = (node, q) => {
    const d = node.d;
    return !node.r
        ? node.l
        : !node.l
            ? node.r
            : q[d] < node.k[d]
                ? node.l
                : node.r;
};
const collect = (acc, maxNum, node, ndist) => (!acc.length || ndist < acc.peek()[0]) &&
    (acc.length >= maxNum
        ? acc.pushPop([ndist, node])
        : acc.push([ndist, node]));
const collect1 = (acc, node, ndist) => ndist < acc[0] && ((acc[0] = ndist), (acc[1] = node));
const TMP = [];
const nodeDist = (node, dims, q, p) => {
    for (let i = dims, d = node.d; --i >= 0;) {
        TMP[i] = i === d ? q[i] : p[i];
    }
    return distSq(TMP, p);
};

class KdTreeSet {
    constructor(dim, keys) {
        this.tree = new KdTreeMap(dim);
        keys && this.into(keys);
    }
    [Symbol.iterator]() {
        return this.tree.keys();
    }
    keys() {
        return this.tree.keys();
    }
    values() {
        return this.tree.keys();
    }
    get size() {
        return this.tree.size;
    }
    get height() {
        return this.tree.height;
    }
    get ratio() {
        return this.tree.ratio;
    }
    copy() {
        return new KdTreeSet(this.tree.dim, this);
    }
    clear() {
        this.tree.clear();
    }
    empty() {
        return new KdTreeSet(this.tree.dim);
    }
    add(key, eps) {
        return this.tree.set(key, key, eps);
    }
    into(ks, eps) {
        let ok = true;
        for (let k of ks) {
            ok = this.tree.set(k, k, eps) && ok;
        }
        return ok;
    }
    remove(key) {
        return this.tree.remove(key);
    }
    has(key, eps) {
        return this.tree.has(key, eps);
    }
    get(key, eps) {
        return this.tree.get(key, eps);
    }
    query(q, maxDist, limit, acc) {
        return this.tree.query(q, maxDist, limit, acc);
    }
    queryKeys(q, maxDist, limit, acc) {
        return this.tree.queryKeys(q, maxDist, limit, acc);
    }
    queryValues(q, maxDist, limit, acc) {
        return this.tree.queryKeys(q, maxDist, limit, acc);
    }
}

export { KdTreeSet };
