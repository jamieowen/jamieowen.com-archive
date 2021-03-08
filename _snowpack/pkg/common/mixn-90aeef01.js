import { f as defOp, k as ARGS_VV, l as ARGS_VNV, n as MATH2A_N, j as ARGS_VVN, o as MIX_N } from './codegen-6bdfa5cb.js';

/**
 * Returns `out = a * n + b`.
 *
 * @param out - vec
 * @param a - vec
 * @param n - scalar
 * @param b - vec
 */
const [maddN, maddN2, maddN3, maddN4] = defOp(MATH2A_N("*", "+"), ARGS_VNV, ARGS_VV);

const [mixN, mixN2, mixN3, mixN4] = defOp(MIX_N, ARGS_VVN);

export { mixN as a, mixN2 as b, mixN3 as c, mixN4 as d, maddN as m };
