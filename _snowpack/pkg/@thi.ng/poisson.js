import { S as SYSTEM } from '../common/system-2f58b569.js';
import { m as mapcat } from '../common/mapcat-e4b80d60.js';
import { m as map } from '../common/map-ab3a157d.js';
import { a as ensureArrayLike } from '../common/ensure-array-ed3d476a.js';
import { r as range } from '../common/range-90bff8dc.js';
import { z as zip } from '../common/codegen-6bdfa5cb.js';
import { c as add } from '../common/add-24a0ae37.js';
import { a as randNorm, b as random } from '../common/random-75d43ebd.js';
import { i as isNumber } from '../common/is-number-dd4646bb.js';
import '../common/comp-b69ffdf6.js';
import '../common/cat-e7588608.js';
import '../common/implements-function-c507affc.js';
import '../common/deferror-480a42fb.js';
import '../common/illegal-arguments-f9331715.js';
import '../common/is-array-a7fa88fb.js';
import '../common/unsupported-d467609e.js';
import '../common/normalize-a82f17ef.js';
import '../common/muln-5d44e24a.js';
import '../common/set-260c7c36.js';
import '../common/api-37d17bdb.js';

/**
 * Iterator yielding return values of given no-arg function `fn`. If `n`
 * is given, only that many values will be produced, else the iterator
 * is infinite.
 *
 * @example
 * ```ts
 * [...repeatedly(() => Math.floor(Math.random() * 10), 5)]
 * // [7, 0, 9, 3, 1]
 * ```
 *
 * @param fn - value producer
 * @param n - num values (default: ∞)
 */
function* repeatedly(fn, n = Infinity) {
    while (n-- > 0) {
        yield fn();
    }
}

function* permutations(...src) {
    const n = src.length - 1;
    if (n < 0) {
        return;
    }
    const step = new Array(n + 1).fill(0);
    const realized = src.map(ensureArrayLike);
    const total = realized.reduce((acc, x) => acc * x.length, 1);
    for (let i = 0; i < total; i++) {
        const tuple = [];
        for (let j = n; j >= 0; j--) {
            const r = realized[j];
            let s = step[j];
            if (s === r.length) {
                step[j] = s = 0;
                j > 0 && step[j - 1]++;
            }
            tuple[j] = r[s];
        }
        step[n]++;
        yield tuple;
    }
}

/**
 * If called with one vector, yields an iterator for the n-dimensional
 * interval: `[[0, 0,...] .. [x, y,...])`. If called with two vectors,
 * the first vector defines the inclusive interval start and the 2nd
 * vector the exclusive interval end. Each dimension can also contain
 * negative values.
 *
 * @example
 * ```ts
 * [...rangeNd([2])]
 * // [ [ 0 ], [ 1 ] ]
 *
 * [...rangeNd([2, -2])]
 * // [ [ 0, 0 ], [ 0, -1 ], [ 1, 0 ], [ 1, -1 ] ]
 *
 * [...rangeNd([-1,2], [1,3])]
 * // [ [ -1, 2 ], [ -1, 3 ], [ 0, 2 ], [ 0, 3 ] ]
 *
 * [...rangeNd([2, 2, 2])]
 * // [
 * //   [ 0, 0, 0 ],
 * //   [ 0, 0, 1 ],
 * //   [ 0, 1, 0 ],
 * //   [ 0, 1, 1 ],
 * //   [ 1, 0, 0 ],
 * //   [ 1, 0, 1 ],
 * //   [ 1, 1, 0 ],
 * //   [ 1, 1, 1 ]
 * // ]
 * ```
 *
 * @param vec
 */
const rangeNd = (min, max) => permutations.apply(null, ((max
    ? [...map(([a, b]) => range(a, b), zip(min, max))]
    : [...map(range, min)])));

const jitter = (out, a, n = 1, rnd = SYSTEM) => add(out, a, randNorm(new Array(a.length), n, rnd));

/**
 * Produces a number of Poisson-disk samples based on given
 * configuration.
 *
 * @param opts -
 */
const samplePoisson = (_opts) => {
    const opts = Object.assign({ rnd: SYSTEM, iter: 1, jitter: 1, quality: 500 }, _opts);
    const { points, index, rnd, jitter: jitter$1, quality, density: _d } = opts;
    const density = isNumber(_d) ? () => _d : _d;
    const iter = Math.max(opts.iter, 1);
    const samples = [];
    let failed = 0;
    let pos;
    let d;
    let i;
    outer: for (let num = opts.max; num > 0;) {
        pos = points(rnd);
        d = density(pos);
        i = iter;
        while (i-- > 0) {
            if (!index.has(pos, d)) {
                index.add(pos, 0);
                samples.push(pos);
                failed = 0;
                num--;
                continue outer;
            }
            jitter(null, pos, jitter$1, rnd);
        }
        if (++failed > quality) {
            break;
        }
    }
    return samples;
};

/**
 * Yields iterator of nD point samples of for given stratified grid
 * config.
 *
 * @remarks
 * All samples will be in `[[0,0,...] ...[dimx,dimy,...])` interval
 *
 * @param opts
 */
const stratifiedGrid = (opts) => {
    const { rnd, samples } = Object.assign({ samples: 1, rnd: SYSTEM }, opts);
    const tmp = new Array(opts.dim.length);
    return mapcat((p) => repeatedly(() => add([], p, random(tmp, 0, 1, rnd)), samples), rangeNd(opts.dim));
};

export { samplePoisson, stratifiedGrid };
