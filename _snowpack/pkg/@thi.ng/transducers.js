import { i as illegalArity } from '../common/map-ab3a157d.js';
export { f as iterator, m as map } from '../common/map-ab3a157d.js';
export { c as comp } from '../common/comp-b69ffdf6.js';
export { m as mapcat } from '../common/mapcat-e4b80d60.js';
import { r as range } from '../common/range-90bff8dc.js';
export { s as sideEffect } from '../common/side-effect-4102843c.js';
import '../common/implements-function-c507affc.js';
import '../common/deferror-480a42fb.js';
import '../common/cat-e7588608.js';

/**
 * Iterator yielding an infinite (by default) repetition of given value
 * `x`. If `n` is given, only produces that many values.
 *
 * See also: {@link repeatedly}
 *
 * @example
 * ```ts
 * [...repeat(42, 5)]
 * // [42, 42, 42, 42, 42]
 * ```
 *
 * @param x - value to repeat
 * @param n - num values (default: ∞)
 */
function* repeat(x, n = Infinity) {
    while (n-- > 0) {
        yield x;
    }
}

function* range3d(...args) {
    let fromX, toX, stepX;
    let fromY, toY, stepY;
    let fromZ, toZ, stepZ;
    switch (args.length) {
        case 9:
            stepX = args[6];
            stepY = args[7];
            stepZ = args[8];
        case 6:
            [fromX, toX, fromY, toY, fromZ, toZ] = args;
            break;
        case 3:
            [toX, toY, toZ] = args;
            fromX = fromY = fromZ = 0;
            break;
        default:
            illegalArity(args.length);
    }
    const rx = range(fromX, toX, stepX);
    const ry = range(fromY, toY, stepY);
    for (let z of range(fromZ, toZ, stepZ)) {
        for (let y of ry) {
            for (let x of rx) {
                yield [x, y, z];
            }
        }
    }
}

export { range3d, repeat };
