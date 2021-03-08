import { v as vop, c as compileG, b as compile } from './codegen-6bdfa5cb.js';
import { a as mulN } from './muln-5d44e24a.js';
import { b as set } from './set-260c7c36.js';
import { E as EPS } from './api-37d17bdb.js';

const $ = (dim) => magSq.add(dim, compile(dim, ([a]) => `${a}*${a}`, "a", "a", "", "+", "return ", ";"));
const magSq = vop();
magSq.default(compileG(([a]) => `sum+=${a}*${a};`, "a", undefined, "sum", "let sum=0;"));
$(2);
$(3);
$(4);

const mag = (v) => Math.sqrt(magSq(v));

/**
 * Normalizes vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param n -
 */
const normalize = (out, v, n = 1) => {
    !out && (out = v);
    const m = mag(v);
    return m >= EPS ? mulN(out, v, n / m) : out !== v ? set(out, v) : out;
};

export { mag as m, normalize as n };
