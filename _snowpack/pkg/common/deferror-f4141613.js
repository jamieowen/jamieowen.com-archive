import { i as isPlainObject } from './is-plain-object-24968a48.js';

const RE_VEC = /^[iub]?vec[234]$/;
const RE_MAT = /^mat[234]$/;
/**
 * Returns true if given `t` is a {@link Term}-like object.
 *
 * @param t
 */
const isTerm = (t) => isPlainObject(t) && !!t.tag && !!t.type;
/**
 * Returns true, if given term evaluates to a boolean value.
 */
const isBool = (t) => t.type === "bool";
/**
 * Returns true, if given term evaluates to a signed integer value.
 */
const isInt = (t) => t.type === "int";
/**
 * Returns true, if given term evaluates to an unsigned integer value.
 */
const isUint = (t) => t.type === "uint";
/**
 * Returns true, if given term evaluates to a vector value (vec, ivec, bvec).
 */
const isVec = (t) => RE_VEC.test(t.type);
/**
 * Returns true, if given term evaluates to a matrix value.
 */
const isMat = (t) => RE_MAT.test(t.type);

const defError = (prefix, suffix = (msg) => (msg !== undefined ? ": " + msg : "")) => class extends Error {
    constructor(msg) {
        super(prefix(msg) + suffix(msg));
    }
};

export { isMat as a, isTerm as b, isBool as c, defError as d, isInt as e, isUint as f, isVec as i };
