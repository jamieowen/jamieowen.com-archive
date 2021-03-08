import { m as map } from './map-ab3a157d.js';

/**
 * Helper transducer. Applies given `fn` to each input value, presumably
 * for side effects. Discards function's result and yields original
 * inputs.
 *
 * @param fn - side effect
 */
const sideEffect = (fn) => map((x) => (fn(x), x));

export { sideEffect as s };
