import { i as illegalArgs } from './illegal-arguments-f9331715.js';
import { i as isArray } from './is-array-a7fa88fb.js';
import { k as isArrayLike } from './map-ab3a157d.js';

/**
 * Attempts to obtain an iterator from `x` and throws error if `x` is
 * not iterable.
 *
 * @param x -
 */
const ensureIterable = (x) => {
    (x == null || !x[Symbol.iterator]) &&
        illegalArgs(`value is not iterable: ${x}`);
    return x;
};

/**
 * Helper function to avoid unnecessary copying if `x` is already an
 * array.
 *
 * @remarks
 * First checks if `x` is an array and if so returns it. Else attempts
 * to obtain an iterator from `x` and if successful collects it as array
 * and returns it. Throws error if `x` isn't iterable.
 *
 * @param x -
 */
const ensureArray = (x) => isArray(x) ? x : [...ensureIterable(x)];
/**
 * Similar to {@link ensureArray}, but for `ArrayLike` types.
 *
 * {@link ensureArray}
 *
 * @param x -
 */
const ensureArrayLike = (x) => isArrayLike(x) ? x : [...ensureIterable(x)];

export { ensureArrayLike as a, ensureArray as e };
