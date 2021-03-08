import { v as vop, c as compileG, D as DOT_G, b as compile, e as DOT } from './codegen-6bdfa5cb.js';

/**
 * Returns `a - b * floor(a/b)`
 *
 * @param a -
 * @param b -
 */
const fmod = (a, b) => a - b * Math.floor(a / b);
const fract = (x) => x - Math.floor(x);

const $ = (dim) => dot.add(dim, compile(dim, DOT, "a,b", undefined, "", "+", "return ", ";"));
const dot = vop();
dot.default(compileG(DOT_G, "a,b", undefined, "s", "let s=0;"));
const dot2 = $(2);
const dot3 = $(3);
const dot4 = $(4);

export { dot as a, fmod as b, dot2 as c, dot3 as d, dot4 as e, fract as f };
