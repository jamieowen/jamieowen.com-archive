import { m as maddN, a as mixN } from '../common/mixn-90aeef01.js';
import { a as mulN } from '../common/muln-5d44e24a.js';
import { m as mapIndexed, f as defOp, j as ARGS_VVN, M as MATH2_N, t as transduce } from '../common/codegen-6bdfa5cb.js';
import { e as ensureArray } from '../common/ensure-array-ed3d476a.js';
import { i as inRange } from '../common/interval-eabb0a00.js';
import { i as illegalArgs } from '../common/illegal-arguments-f9331715.js';
import { $ as $iter, f as iterator, p as push } from '../common/map-ab3a157d.js';
import { c as comp } from '../common/comp-b69ffdf6.js';
import { c as cat } from '../common/cat-e7588608.js';
import '../common/unsupported-d467609e.js';
import '../common/deferror-480a42fb.js';
import '../common/range-90bff8dc.js';
import '../common/is-array-a7fa88fb.js';
import '../common/implements-function-c507affc.js';

function partition(...args) {
    const iter = $iter(partition, args, iterator);
    if (iter) {
        return iter;
    }
    let size = args[0], all, step;
    if (typeof args[1] == "number") {
        step = args[1];
        all = args[2];
    }
    else {
        step = size;
        all = args[1];
    }
    return ([init, complete, reduce]) => {
        let buf = [];
        let skip = 0;
        return [
            init,
            (acc) => {
                if (all && buf.length > 0) {
                    acc = reduce(acc, buf);
                    buf = [];
                }
                return complete(acc);
            },
            (acc, x) => {
                if (skip <= 0) {
                    if (buf.length < size) {
                        buf.push(x);
                    }
                    if (buf.length === size) {
                        acc = reduce(acc, buf);
                        buf = step < size ? buf.slice(step) : [];
                        skip = step - size;
                    }
                }
                else {
                    skip--;
                }
                return acc;
            },
        ];
    };
}

function mapcatIndexed(...args) {
    return ($iter(mapcatIndexed, args, iterator) ||
        comp(mapIndexed(args[0], args[1]), cat()));
}

/**
 * Yields iterator of `src` with the last `numLeft` values of `src`
 * prepended at the beginning and/or the first `numRight` values
 * appended at the end.
 *
 * @remarks
 * `numLeft` defaults to 1 and `numRight` defaults to same value as
 * `numLeft`, therefore wraps both sides by default and throws error if
 * either `nXXX < 0` or larger than `src.length`.
 *
 * See also:
 * - {@link extendSides}
 * - {@link padSides}
 *
 * @param src -
 * @param numLeft -
 * @param numRight -
 */
function* wrapSides(src, numLeft = 1, numRight = numLeft) {
    const _src = ensureArray(src);
    !(inRange(numLeft, 0, _src.length) && inRange(numRight, 0, _src.length)) &&
        illegalArgs(`allowed wrap range: [0..${_src.length}]`);
    if (numLeft > 0) {
        for (let m = _src.length, i = m - numLeft; i < m; i++) {
            yield _src[i];
        }
    }
    yield* _src;
    if (numRight > 0) {
        for (let i = 0; i < numRight; i++) {
            yield _src[i];
        }
    }
}

const addW2 = (out, a, b, wa, wb) => (!out && (out = a), maddN(out, b, wb, mulN(out, a, wa)));
const addW3 = (out, a, b, c, wa, wb, wc) => (!out && (out = a), maddN(out, c, wc, maddN(out, b, wb, mulN(out, a, wa))));
const addW5 = (out, a, b, c, d, e, wa, wb, wc, wd, we) => (!out && (out = a),
    maddN(out, e, we, maddN(out, d, wd, maddN(out, c, wc, maddN(out, b, wb, mulN(out, a, wa))))));

/**
 * Returns `out = (a + b) * n`.
 */
const [addmN, addmN2, addmN3, addmN4] = defOp(MATH2_N("+", "*"), ARGS_VVN);

/**
 * HOF subdiv kernel function for computing 2 split points from 2 source
 * points, using weighted summation (thi.ng/vectors/addW2)
 *
 * @param u - split coeffs
 * @param v - split coeffs
 */
const kernel2 = ([ua, ub], [va, vb]) => ([a, b,]) => [addW2([], a, b, ua, ub), addW2([], a, b, va, vb)];
/**
 * HOF subdiv kernel function for computing 2 split points from 3 source
 * points, using weighted summation (thi.ng/vectors/addW3)
 *
 * @param u - split coeffs
 * @param v - split coeffs
 */
const kernel3 = ([ua, ub, uc], [va, vb, vc]) => ([a, b, c,]) => [
    addW3([], a, b, c, ua, ub, uc),
    addW3([], a, b, c, va, vb, vc),
];
/**
 * HOF subdiv kernel function for computing 2 split points from 5 source
 * points, using weighted summation (thi.ng/vectors/addW5)
 *
 * @param u - split coeffs
 * @param v - split coeffs
 */
const kernel5 = ([ua, ub, uc, ud, ue], [va, vb, vc, vd, ve]) => ([a, b, c, d, e]) => [
    addW5([], a, b, c, d, e, ua, ub, uc, ud, ue),
    addW5([], a, b, c, d, e, va, vb, vc, vd, ve),
];

const MIDP = ([a, b]) => [a, addmN([], a, b, 0.5)];
const THIRDS = ([a, b]) => [
    a,
    mixN([], a, b, 1 / 3),
    mixN([], a, b, 2 / 3),
];
const wrap2 = (pts) => wrapSides(pts, 0, 1);
const wrap3 = (pts) => wrapSides(pts, 1, 1);
const subdivWith = (fn) => (pts, i, n) => (i < n - 2 ? fn(pts) : [...fn(pts), pts[1]]);
/**
 * Splits each curve / line segment into halves at midpoint. Version for
 * open curves.
 */
const SUBDIV_MID_OPEN = {
    fn: subdivWith(MIDP),
    size: 2,
};
/**
 * Splits each curve / line segment into halves at midpoint. Version for
 * closed curves.
 */
const SUBDIV_MID_CLOSED = {
    fn: MIDP,
    pre: wrap2,
    size: 2,
};
/**
 * Splits each curve / line segment into 3 parts at 1/3 and 2/3. Version for
 * open curves.
 */
const SUBDIV_THIRDS_OPEN = {
    fn: subdivWith(THIRDS),
    size: 2,
};
/**
 * Splits each curve / line segment into 3 parts at 1/3 and 2/3. Version for
 * open curves.
 */
const SUBDIV_THIRDS_CLOSED = {
    fn: THIRDS,
    pre: wrap2,
    size: 2,
};
const CHAIKIN_FIRST = kernel3([1 / 2, 1 / 2, 0], [0, 3 / 4, 1 / 4]);
const CHAIKIN_MAIN = kernel3([1 / 4, 3 / 4, 0], [0, 3 / 4, 1 / 4]);
const CHAIKIN_LAST = kernel3([1 / 4, 3 / 4, 0], [0, 1 / 2, 1 / 2]);
/**
 * Chaikin subdivision scheme for open curves.
 */
const SUBDIV_CHAIKIN_OPEN = {
    fn: (pts, i, n) => i == 0
        ? [pts[0], ...CHAIKIN_FIRST(pts)]
        : i === n - 3
            ? [...CHAIKIN_LAST(pts), pts[2]]
            : CHAIKIN_MAIN(pts),
    size: 3,
};
/**
 * Chaikin subdivision scheme for closed curves.
 */
const SUBDIV_CHAIKIN_CLOSED = {
    fn: CHAIKIN_MAIN,
    pre: wrap3,
    size: 3,
};
const CUBIC_MAIN = kernel3([1 / 8, 3 / 4, 1 / 8], [0, 1 / 2, 1 / 2]);
/**
 * Cubic bezier subdivision scheme for closed curves.
 */
const SUBDIV_CUBIC_CLOSED = {
    fn: CUBIC_MAIN,
    pre: wrap3,
    size: 3,
};

/**
 * {@link http://algorithmicbotany.org/papers/subgpu.sig2003.pdf}
 *
 * @param kernel - subdivision scheme
 * @param pts - source points
 * @param iter - number of iterations
 */
const subdivide = (pts, { fn, pre, size }, iter = 1) => {
    while (--iter >= 0) {
        const nump = pts.length;
        pts = transduce(comp(partition(size, 1), mapcatIndexed((i, pts) => fn(pts, i, nump))), push(), pre ? pre(pts) : pts);
    }
    return pts;
};

export { SUBDIV_CHAIKIN_CLOSED, SUBDIV_CHAIKIN_OPEN, SUBDIV_CUBIC_CLOSED, SUBDIV_MID_CLOSED, SUBDIV_MID_OPEN, SUBDIV_THIRDS_CLOSED, SUBDIV_THIRDS_OPEN, kernel2, kernel3, kernel5, subdivide };
