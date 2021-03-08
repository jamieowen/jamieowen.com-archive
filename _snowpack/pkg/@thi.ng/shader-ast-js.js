import { p as defFnOp, q as defBitOp, r as defBitOpN, g as defMathOpN, f as defOp, k as ARGS_VV, s as FN2, u as ARGS_V, N as NEW_OUT, a as defHofOp, w as FN, d as defMathOp, x as SET_N, v as vop, y as ARGS_VN, B as FN_N, A as ARGS_VVV, C as MIX, E as DEFAULT_OUT, F as FN3, G as MATH, b as compile, H as MATH_N } from '../common/codegen-6bdfa5cb.js';
import { a as clamp01, c as clamp } from '../common/interval-eabb0a00.js';
import { d as deg, r as rad } from '../common/angle-c4aa0791.js';
import { a as dot, b as fmod$1, f as fract$1, c as dot2, d as dot3, e as dot4 } from '../common/dot-bdae3efe.js';
import { a as add4, c as add$1, d as add2, b as add3 } from '../common/add-24a0ae37.js';
import { a as setC3, s as setC4, b as setC, d as setC2, e as setC6, f as clamp2, g as clamp3, c as clamp4 } from '../common/clamp-bf64be6a.js';
import { a as sub4, b as sub$1, c as dist, e as sub2, s as sub3 } from '../common/dist-ed974f7e.js';
import { a as mulN$1, b as mulN4, c as mulN2, m as mulN3 } from '../common/muln-5d44e24a.js';
import { b as set } from '../common/set-260c7c36.js';
import { m as mag, n as normalize } from '../common/normalize-a82f17ef.js';
import { m as maddN, b as mixN2, c as mixN3, d as mixN4 } from '../common/mixn-90aeef01.js';
import { m as mul4, a as mul$1, b as mul2, c as mul3 } from '../common/mul-ed648689.js';
import { m as modN2, c as cross3, a as modN3, b as modN4 } from '../common/modn-8daddc6c.js';
import { a as dotS2, d as dotS3, b as dotS4 } from '../common/dots-43396d16.js';
import { i as isNumber } from '../common/is-number-dd4646bb.js';
import { d as defTarget } from '../common/target-6ab9d31f.js';
import { u as unsupported } from '../common/unsupported-d467609e.js';
import { c as isBool, i as isVec, a as isMat, e as isInt, f as isUint } from '../common/deferror-f4141613.js';
import { i as isBoolean } from '../common/is-boolean-6acf0f42.js';
import '../common/map-ab3a157d.js';
import '../common/implements-function-c507affc.js';
import '../common/deferror-480a42fb.js';
import '../common/comp-b69ffdf6.js';
import '../common/range-90bff8dc.js';
import '../common/api-37d17bdb.js';
import '../common/distsq-6316f3e1.js';
import '../common/is-plain-object-24968a48.js';

/**
 * Linear interpolation without clamping. Computes `a + (b - a) * t`
 *
 * @param a - start value
 * @param b - end value
 * @param t - interpolation factor [0..1]
 */
const mix = (a, b, t) => a + (b - a) * t;

/**
 * Step/threshold function.
 *
 * @param edge - threshold
 * @param x - test value
 * @returns 0, if `x < e`, else 1
 */
const step = (edge, x) => (x < edge ? 0 : 1);
/**
 * GLSL-style smoothStep threshold function.
 *
 * @param edge - lower threshold
 * @param edge2 - upper threshold
 * @param x - test value
 * @returns 0, if `x < edge1`, 1 if `x > edge2`, else S-curve polynomial interpolation
 */
const smoothStep = (edge, edge2, x) => {
    x = clamp01((x - edge) / (edge2 - edge));
    return (3 - 2 * x) * x * x;
};

const mi = -Infinity;
const mx = Infinity;
Object.freeze([mi, mi]);
Object.freeze([mx, mx]);
Object.freeze([1, 1]);
const ZERO2 = Object.freeze([0, 0]);
Object.freeze([1, 0]);
Object.freeze([0, 1]);
Object.freeze([mi, mi, mi]);
Object.freeze([mx, mx, mx]);
Object.freeze([1, 1, 1]);
const ZERO3 = Object.freeze([0, 0, 0]);
Object.freeze([1, 0, 0]);
Object.freeze([0, 1, 0]);
Object.freeze([0, 0, 1]);
Object.freeze([mi, mi, mi, mi]);
Object.freeze([mx, mx, mx, mx]);
Object.freeze([1, 1, 1, 1]);
const ZERO4 = Object.freeze([0, 0, 0, 0]);
Object.freeze([1, 0, 0, 0]);
Object.freeze([0, 1, 0, 0]);
Object.freeze([0, 0, 1, 0]);
Object.freeze([0, 0, 0, 1]);

const [abs, abs2, abs3, abs4] = defFnOp("Math.abs");

const [acos, acos2, acos3, acos4] = defFnOp("Math.acos");

const [addI, addI2, addI3, addI4] = defBitOp("+", true);
const [addU, addU2, addU3, addU4] = defBitOp("+");
const [addNI, addNI2, addNI3, addNI4] = defBitOpN("+", true);
const [addNU, addNU2, addNU3, addNU4] = defBitOpN("+");

const [addN, addN2, addN3, addN4] = defMathOpN("+");

const [asin, asin2, asin3, asin4] = defFnOp("Math.asin");

const [atan, atan2, atan3, atan4] = defFnOp("Math.atan");
const [atan_2, atan_22, atan_23, atan_24] = defOp(FN2("Math.atan2"), ARGS_VV);

const [bitAndI, bitAndI2, bitAndI3, bitAndI4] = defBitOp("&", true);
const [bitAndU, bitAndU2, bitAndU3, bitAndU4] = defBitOp("&");
defBitOpN("&", true);
defBitOpN("&");

const [bitNotI, bitNotI2, bitNotI3, bitNotI4] = defOp(([o, a]) => `${o}=(~${a})|0;`, ARGS_V);
const [bitNotU, bitNotU2, bitNotU3, bitNotU4] = defOp(([o, a]) => `${o}=(~${a})>>>0;`, ARGS_V);

const [bitOrI, bitOrI2, bitOrI3, bitOrI4] = defBitOp("|", true);
const [bitOrU, bitOrU2, bitOrU3, bitOrU4] = defBitOp("|");
defBitOpN("|", true);
defBitOpN("|");

const [bitXorI, bitXorI2, bitXorI3, bitXorI4] = defBitOp("^", true);
const [bitXorU, bitXorU2, bitXorU3, bitXorU4] = defBitOp("^");
defBitOpN("^", true);
defBitOpN("^");

const [ceil, ceil2, ceil3, ceil4] = defFnOp("Math.ceil");

const $ = (tpl, pre = NEW_OUT) => defOp(tpl, ARGS_V, ARGS_V, "o", 1, pre);
$(([o, a]) => `${o}=${a}|0;`);
$(([o, a]) => `${o}=${a}>>>0;`);
$(([o, a]) => `${o}=!!${a};`);
const [fromBVec, fromBVec2, fromBVec3, fromBVec4] = $(([o, a]) => `${o}=~~${a};`);

const [cos, cos2, cos3, cos4] = defFnOp("Math.cos");

const [degrees, degrees2, degrees3, degrees4] = defHofOp(deg, FN("op"));

const [div, div2, div3, div4] = defMathOp("/");

const [divI, divI2, divI3, divI4] = defBitOp("/", true);
const [divU, divU2, divU3, divU4] = defBitOp("/");
const [divNI, divNI2, divNI3, divNI4] = defBitOpN("/", true);
const [divNU, divNU2, divNU3, divNU4] = defBitOpN("/");

const [divN, divN2, divN3, divN4] = defMathOpN("/");

const [setN, setN2, setN3, setN4] = defOp(SET_N, "a,n", "a", "a", 0, "");
const zero = (a) => setN(a, 0);

/**
 * Returns returns true if all vector components in `v` are truthy.
 *
 * @param v -
 */
const every = vop();
every.default((v) => {
    for (let i = v.length; --i >= 0;) {
        if (!v[i])
            return false;
    }
    return true;
});
const every2 = every.add(2, (a) => a[0] && a[1]);
const every3 = every.add(3, (a) => a[0] && a[1] && a[2]);
const every4 = every.add(4, (a) => a[0] && a[1] && a[2] && a[3]);

const [exp, exp2, exp3, exp4] = defFnOp("Math.exp");

/**
 * Componentwise 2^x
 */
const [exp_2, exp_22, exp_23, exp_24] = defOp(([o, a]) => `${o}=Math.pow(2,${a});`, ARGS_V);

const faceForward = (out, n, i, nref) => {
    !out && (out = n);
    return dot(nref, i) < 0
        ? out !== n
            ? set(out, n)
            : out
        : mulN$1(out, n, -1);
};

const [floor, floor2, floor3, floor4] = defFnOp("Math.floor");

/**
 * This version of mod uses the same logic as in GLSL, whereas {@link mod}
 * merely uses JavaScript's `%` modulo operator, yielding different
 * results for negative values, i.e. using the sign of the last arg.
 *
 * `a - b * floor(a/b)`
 *
 */
const [fmod, fmod2, fmod3, fmod4] = defHofOp(fmod$1, FN2("op"), ARGS_VV);

/**
 * Same as {@link fmod}, but 2nd operand is a single scalar (uniform domain
 * for all vector components).
 */
const [fmodN, fmodN2, fmodN3, fmodN4] = defHofOp(fmod$1, FN_N("op"), ARGS_VN, ARGS_V);

const [fract, fract2, fract3, fract4] = defHofOp(fract$1);

const [invSqrt, invSqrt2, invSqrt3, invSqrt4] = defOp(([o, a]) => `${o}=1/Math.sqrt(${a});`);

const [log, log2, log3, log4] = defFnOp("Math.log");

/**
 * Componentwise Math.log2
 */
const [log_2, log_22, log_23, log_24] = defFnOp("Math.log2");

const [lshiftI, lshiftI2, lshiftI3, lshiftI4] = defBitOp("<<", true);
const [lshiftU, lshiftU2, lshiftU3, lshiftU4] = defBitOp("<<");
// prettier-ignore
defBitOpN("<<", true);
defBitOpN("<<");

const [max, max2, max3, max4] = defOp(FN2("Math.max"));

const [min, min2, min3, min4] = defOp(FN2("Math.min"));

const [mix$1, mix2, mix3, mix4] = defOp(MIX, ARGS_VVV);

const [mod, mod2, mod3, mod4] = defMathOp("%");

const [mulI, mulI2, mulI3, mulI4] = defBitOp("*", true);
const [mulU, mulU2, mulU3, mulU4] = defBitOp("*");
const [mulNI, mulNI2, mulNI3, mulNI4] = defBitOpN("*", true);
const [mulNU, mulNU2, mulNU3, mulNU4] = defBitOpN("*");

const neg = (out, v) => mulN$1(out, v, -1);

const [not, not2, not3, not4] = defOp(([o, a]) => `${o}=!${a};`, ARGS_V, ARGS_V, "o", 1, NEW_OUT);

const [pow, pow2, pow3, pow4] = defOp(FN2("Math.pow"));

const [radians, radians2, radians3, radians4] = defHofOp(rad, FN("op"));

const reflect = (out, a, b) => maddN(out || a, b, -2 * dot(a, b), a);

const refract = (out, a, n, eta) => {
    !out && (out = a);
    const d = dot(a, n);
    const k = 1 - eta * eta * (1 - d * d);
    return k < 0
        ? zero(out)
        : maddN(out, n, -(eta * d + Math.sqrt(k)), mulN$1(out, a, eta));
};

const [rshiftI, rshiftI2, rshiftI3, rshiftI4] = defBitOp(">>", true);
const [rshiftU, rshiftU2, rshiftU3, rshiftU4] = defBitOp(">>>");
// prettier-ignore
defBitOpN(">>", true);
defBitOpN(">>>");

/**
 * Sets `out` to `[a.x, a.y, n]`
 *
 * @param out -
 * @param a -
 * @param n -
 */
const setVN3 = (out, a, n) => setC3(out, a[0], a[1], n);
/**
 * Sets `out` to `[a.x, a.y, a.z, n]`
 *
 * @param out -
 * @param a -
 * @param n -
 */
const setVN4 = (out, a, n) => setC4(out, a[0], a[1], a[2], n);

/**
 * Sets `out` to `[a.x, a.y, b.x, b.y]`
 *
 * @param out -
 * @param a -
 * @param b -
 */
const setVV4 = (out, a, b) => setC4(out, a[0], a[1], b[0], b[1]);
/**
 * Sets `out` to:
 * `[a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z]`
 *
 * @param out -
 * @param a -
 * @param b -
 * @param c -
 */
const setVV9 = (out, a, b, c) => setC(out, a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
/**
 * Sets `out` to concatenation of `a`, `b`, `c`, `d`:
 *
 * @example
 * ```ts
 * [a.x, a.y, a.z, a.w, b.x, b.y, b.z, b.w,
 *  c.x, c.y, c.z, c.w, d.x, d.y, d.z, d.w]
 * ```
 *
 * @param out -
 * @param a -
 * @param b -
 * @param c -
 */
const setVV16 = (out, a, b, c, d) => setC(out, a[0], a[1], a[2], a[3], b[0], b[1], b[2], b[3], c[0], c[1], c[2], c[3], d[0], d[1], d[2], d[3]);

const [sign, sign2, sign3, sign4] = defFnOp("Math.sign");

const [sin, sin2, sin3, sin4] = defFnOp("Math.sin");

/**
 * Returns returns true if at least one vector component in `v` is
 * truthy.
 *
 * @param v -
 */
const some = vop();
some.default((v) => {
    for (let i = v.length; --i >= 0;) {
        if (v[i])
            return true;
    }
    return false;
});
const some2 = some.add(2, (a) => a[0] || a[1]);
const some3 = some.add(3, (a) => a[0] || a[1] || a[2]);
const some4 = some.add(4, (a) => a[0] || a[1] || a[2] || a[3]);

const [sqrt, sqrt2, sqrt3, sqrt4] = defFnOp("Math.sqrt");

/**
 * Like GLSL `step()`
 *
 * @param out -
 * @param e -
 * @param v -
 */
const [step$1, step2, step3, step4] = defHofOp(step, FN2("op"), "o,e,a", undefined, "o", 2, DEFAULT_OUT);

/**
 * Like GLSL `smoothstep()`
 *
 * @param out -
 * @param e1 -
 * @param e2 -
 * @param v -
 */
const [smoothStep$1, smoothStep2, smoothStep3, smoothStep4] = defHofOp(smoothStep, FN3(), "o,e1,e2,a", undefined, "o", 3, DEFAULT_OUT);

const [subI, subI2, subI3, subI4] = defBitOp("-", true);
const [subU, subU2, subU3, subU4] = defBitOp("-");
const [subNI, subNI2, subNI3, subNI4] = defBitOpN("-", true);
const [subNU, subNU2, subNU3, subNU4] = defBitOpN("-");

const [subN, subN2, subN3, subN4] = defMathOpN("-");

/**
 * Places a re-ordered 2D version of vector `a` into `out`. The given
 * coord indices must be valid for `a`. No bounds checking.
 *
 * @param out -
 * @param a -
 * @param x - new x coord index
 * @param y - new y coord index
 */
const swizzle2 = (out, a, x, y) => setC2(out || a, a[x] || 0, a[y] || 0);
/**
 * Places a re-ordered 3D version of vector `a` into `out`. The given
 * coord indices must be valid for `a`. No bounds checking.
 *
 * @param out -
 * @param a -
 * @param x - new x coord index
 * @param y - new y coord index
 * @param z - new z coord index
 */
const swizzle3 = (out, a, x, y, z) => setC3(out || a, a[x] || 0, a[y] || 0, a[z] || 0);
/**
 * Places a re-ordered 4D version of vector `a` into `out`. The given
 * coord indices must be valid for `a`. No bounds checking.
 *
 * @param out -
 * @param a -
 * @param x - new x coord index
 * @param y - new y coord index
 * @param z - new z coord index
 * @param w - new w coord index
 */
const swizzle4 = (out, a, x, y, z, w) => setC4(out || a, a[x] || 0, a[y] || 0, a[z] || 0, a[w] || 0);
/**
 * Sets `out[a] = v.x, out[b] = v.y`, returns `out`.
 *
 * @param out -
 * @param v -
 * @param a -
 * @param b -
 */
const setSwizzle2 = (out, v, a, b) => (((out[a] = v[0]), (out[b] = v[1])), out);
/**
 * Sets `out[a] = v.x, out[b] = v.y, out[c] = v.z`, returns `out`.
 *
 * @param out -
 * @param v -
 * @param a -
 * @param b -
 * @param c -
 */
const setSwizzle3 = (out, v, a, b, c) => (((out[a] = v[0]), (out[b] = v[1]), (out[c] = v[2])), out);
/**
 * Sets `out[a] = v.x, out[b] = v.y, out[c] = v.z, out[d]=v.w`, returns `out`.
 *
 * @param out -
 * @param v -
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 */
const setSwizzle4 = (out, v, a, b, c, d) => (((out[a] = v[0]), (out[b] = v[1]), (out[c] = v[2]), (out[d] = v[3])), out);

const [tan, tan2, tan3, tan4] = defFnOp("Math.tan");

/**
 * Returns new vector of `size` with all components set to `n`.
 *
 * @param size -
 * @param n -
 */
const vecOf = (size, n = 0) => new Array(size).fill(n);

const [eq, eq2, eq3, eq4] = defOp(MATH("==="));

const [neq, neq2, neq3, neq4] = defOp(MATH("!=="));

const [gt, gt2, gt3, gt4] = defOp(MATH(">"));

const [gte, gte2, gte3, gte4] = defOp(MATH(">="));

const [lt, lt2, lt3, lt4] = defOp(MATH("<"));

const [lte, lte2, lte3, lte4] = defOp(MATH("<="));

const DEFAULT_SIZES = [6, 9, 16];
const defMath = (fn, op, sizes = DEFAULT_SIZES) => sizes.map((n) => fn.add(n, compile(n, MATH(op), ARGS_VV, undefined, "o", "", DEFAULT_OUT)));
const defMathN = (fn, op, sizes = DEFAULT_SIZES) => sizes.map((n) => fn.add(n, compile(n, MATH_N(op), ARGS_VN, "o,a", "o", "", DEFAULT_OUT)));

/**
 * Componentwise matrix addition. If `out` is not given, writes result
 * in `a`. Both input matrices MUST be of same size.
 *
 * out = a + b
 *
 * @param out -
 * @param a -
 * @param b -
 */
const add = add$1;
const add22 = add4;
const [add23, add33, add44] = defMath(add, "+");

/**
 * Adds single scalar componentwise to matrix. If `out` is not given,
 * writes result in `mat`.
 *
 * out = mat + n
 *
 * @param out -
 * @param mat -
 * @param n -
 */
const addN$1 = addN;
const addN22 = addN4;
const [addN23, addN33, addN44] = defMathN(addN$1, "+");

/**
 * Multi-method. Performs matrix-matrix multiplication. If `out` is not
 * given, writes result in `a`.
 *
 * @param out -
 * @param a -
 * @param b -
 */
const mulM = vop(1);
/**
 * 2x2 matrix-matrix multiplication. If `out` is not given, writes
 * result in `a`.
 *
 * @param out -
 * @param a -
 * @param b -
 */
const mulM22 = mulM.add(4, (out, a, b) => setC4(out || a, dotS2(a, b, 0, 0, 2), dotS2(a, b, 1, 0, 2), dotS2(a, b, 0, 2, 2), dotS2(a, b, 1, 2, 2)));
/**
 * 2x3 matrix-matrix multiplication. If `out` is not given, writes
 * result in `a`.
 *
 * @param out -
 * @param a -
 * @param b -
 */
mulM.add(6, (out, a, b) => setC6(out || a, dotS2(a, b, 0, 0, 2), dotS2(a, b, 1, 0, 2), dotS2(a, b, 0, 2, 2), dotS2(a, b, 1, 2, 2), dotS2(a, b, 0, 4, 2) + a[4], dotS2(a, b, 1, 4, 2) + a[5]));
/**
 * 3x3 matrix-matrix multiplication. If `out` is not given, writes
 * result in `a`.
 *
 * @param out -
 * @param a -
 * @param b -
 */
const mulM33 = mulM.add(9, (out, a, b) => setC(out || a, dotS3(a, b, 0, 0, 3), dotS3(a, b, 1, 0, 3), dotS3(a, b, 2, 0, 3), dotS3(a, b, 0, 3, 3), dotS3(a, b, 1, 3, 3), dotS3(a, b, 2, 3, 3), dotS3(a, b, 0, 6, 3), dotS3(a, b, 1, 6, 3), dotS3(a, b, 2, 6, 3)));
/**
 * 4x4 matrix-matrix multiplication. If `out` is not given, writes
 * result in `a`.
 *
 * @param out -
 * @param a -
 * @param b -
 */
const mulM44 = mulM.add(16, (out, a, b) => setC(out || a, dotS4(a, b, 0, 0, 4), dotS4(a, b, 1, 0, 4), dotS4(a, b, 2, 0, 4), dotS4(a, b, 3, 0, 4), dotS4(a, b, 0, 4, 4), dotS4(a, b, 1, 4, 4), dotS4(a, b, 2, 4, 4), dotS4(a, b, 3, 4, 4), dotS4(a, b, 0, 8, 4), dotS4(a, b, 1, 8, 4), dotS4(a, b, 2, 8, 4), dotS4(a, b, 3, 8, 4), dotS4(a, b, 0, 12, 4), dotS4(a, b, 1, 12, 4), dotS4(a, b, 2, 12, 4), dotS4(a, b, 3, 12, 4)));

/**
 * Componentwise matrix division. If `out` is not given, writes result
 * in `a`. Both input matrices MUST be of same size.
 *
 * out = a / b
 *
 * @param out -
 * @param a -
 * @param b -
 */
const div$1 = div;
const div22 = div4;
const [div23, div33, div44] = defMath(div$1, "/");

/**
 * Componentwise matrix division by single scalar. If `out` is not
 * given, writes result in `mat`.
 *
 * out = mat / n
 *
 * @param out -
 * @param mat -
 * @param n -
 */
const divN$1 = divN;
const divN22 = divN4;
const [divN23, divN33, divN44] = defMathN(divN$1, "/");

/**
 * Computes 2x2 matrix scale matrix and writes result to `out`. If `s`
 * is a number, scaling will be uniform.
 *
 * @param m -
 * @param s -
 */
const scale22 = (m, s) => ((s = isNumber(s) ? [s, s] : s), setC4(m || [], s[0], 0, 0, s[1]));
/**
 * Computes 3x3 matrix scale matrix and writes result to `out`. If `s`
 * is a number, scaling will be uniform.
 *
 * @param m -
 * @param s -
 */
const scale33 = (m, s) => ((s = isNumber(s) ? [s, s, s] : s),
    setC(m || [], s[0], 0, 0, 0, s[1], 0, 0, 0, s[2]));
/**
 * Computes 4x4 matrix scale matrix and writes result to `out`. If `s`
 * is a number, scaling will be uniform.
 *
 * @param m -
 * @param s -
 */
const scale44 = (m, s) => ((s = isNumber(s) ? [s, s, s] : s),
    setC(m || [], 
    // x
    s[0], 0, 0, 0, 
    // y
    0, s[1], 0, 0, 
    // z
    0, 0, s[2], 0, 
    // w
    0, 0, 0, s[3] !== undefined ? s[3] : 1));

const mat22n = (out, n) => scale22(out, n);
const mat33n = (out, n) => scale33(out, n);
const mat44n = (out, n) => ((out = scale44(out, n)), (out[15] = n), out);

/**
 * Initializes 2x2 matrix from 2D column vectors.
 *
 * @param out -
 * @param x -
 * @param y -
 */
const mat22v = setVV4;
/**
 * Initializes 3x3 matrix from 3D column vectors.
 *
 * @param out -
 * @param x -
 * @param y -
 * @param z -
 */
const mat33v = setVV9;
/**
 * Initializes 4x4 matrix from 4D column vectors.
 *
 * @param out -
 * @param x -
 * @param y -
 * @param z -
 * @param w -
 */
const mat44v = setVV16;

/**
 * Componentwise matrix multiplication. Use {@link mulM} or
 * {@link concat} for actual matrix-matrix multiplication/concatenation.
 * If `out` is not given, writes result in `a`. Both input matrices MUST
 * be of same size.
 *
 * out = a * b
 *
 * @param out -
 * @param a -
 * @param b -
 */
const mul = mul$1;
const mul22 = mul4;
const [mul23, mul33, mul44] = defMath(mul, "*");

/**
 * Multiplies matrix componentwise with single scalar. If `out` is not
 * given, writes result in `mat`.
 *
 * out = mat * n
 *
 * @param out -
 * @param mat -
 * @param n -
 */
const mulN = mulN$1;
const mulN22 = mulN4;
const [mulN23, mulN33, mulN44] = defMathN(mulN, "*");

/**
 * Matrix-vector multiplication. Supports in-place modification, i.e. if
 * `out === v`.
 *
 * @param out -
 * @param m -
 * @param v -
 */
const mulV = vop(1);
/**
 * Multiplies 2x2 matrix `m` with 2D vector `v`. Supports in-place
 * modification, i.e. if `out === v`.
 *
 * @param out -
 * @param m -
 * @param v -
 */
const mulV22 = mulV.add(4, (out, m, v) => setC2(out || v, dotS2(m, v, 0, 0, 2), dotS2(m, v, 1, 0, 2)));
/**
 * Multiplies 2x3 matrix `m` with 2D vector `v`. Supports in-place
 * modification, i.e. if `out === v`.
 *
 * @param out -
 * @param m -
 * @param v -
 */
mulV.add(6, (out, m, v) => setC2(out || v, dotS2(m, v, 0, 0, 2) + m[4], dotS2(m, v, 1, 0, 2) + m[5]));
/**
 * Multiplies 3x3 matrix `m` with 3D vector `v`. Supports in-place
 * modification, i.e. if `out === v`.
 *
 * @param out -
 * @param m -
 * @param v -
 */
const mulV33 = mulV.add(9, (out, m, v) => setC3(out || v, dotS3(m, v, 0, 0, 3), dotS3(m, v, 1, 0, 3), dotS3(m, v, 2, 0, 3)));
/**
 * Multiplies 4x4 matrix `m` with 4D vector `v`. Supports in-place
 * modification, i.e. if `out === v`.
 *
 * @param out -
 * @param m -
 * @param v -
 */
const mulV44 = mulV.add(16, (out, m, v) => setC4(out || v, dotS4(m, v, 0, 0, 4), dotS4(m, v, 1, 0, 4), dotS4(m, v, 2, 0, 4), dotS4(m, v, 3, 0, 4)));

/**
 * Same as:
 *
 * @example
 * ```ts
 * out[0] = dot(v, column(m, 0))
 * out[1] = dot(v, column(m, 1))
 * ```
 *
 * @param out -
 * @param v -
 * @param m -
 */
const mulVM22 = (out, v, m) => setC2(out, dot2(v, m), dotS2(v, m, 0, 2));
/**
 * Same as:
 *
 * @example
 * ```ts
 * out[0] = dot(v, column(m, 0))
 * out[1] = dot(v, column(m, 1))
 * out[2] = dot(v, column(m, 2))
 * ```
 *
 * @param out -
 * @param v -
 * @param m -
 */
const mulVM33 = (out, v, m) => setC3(out, dot3(v, m), dotS3(v, m, 0, 3), dotS3(v, m, 0, 6));
/**
 * Same as:
 *
 * @example
 * ```ts
 * out[0] = dot(v, column(m, 0))
 * out[1] = dot(v, column(m, 1))
 * out[2] = dot(v, column(m, 2))
 * out[3] = dot(v, column(m, 3))
 * ```
 *
 * @param out -
 * @param v -
 * @param m -
 */
const mulVM44 = (out, v, m) => setC4(out, dot4(v, m), dotS4(v, m, 0, 4), dotS4(v, m, 0, 8), dotS4(v, m, 0, 12));

/**
 * Componentwise matrix subtraction. If `out` is not given, writes
 * result in `a`. Both input matrices MUST be of same size.
 *
 * out = a - b
 *
 * @param out -
 * @param a -
 * @param b -
 */
const sub = sub$1;
const sub22 = sub4;
const [sub23, sub33, sub44] = defMath(sub, "-");

/**
 * Componentwise scalar subtraction. If `out` is not given, writes
 * result in `mat`.
 *
 * out = mat - n
 *
 * @param out -
 * @param mat -
 * @param n -
 */
const subN$1 = subN;
const subN22 = subN4;
const [subN23, subN33, subN44] = defMathN(subN$1, "-");

const BVEC2 = {
    all: every2,
    any: some2,
    not: (v) => not2([], v),
};
const BVEC3 = {
    all: every3,
    any: some3,
    not: (v) => not3([], v),
};
const BVEC4 = {
    all: every4,
    any: some4,
    not: (v) => not4([], v),
};

const FLOAT = {
    abs: Math.abs,
    acos: Math.acos,
    asin: Math.asin,
    atan: Math.atan,
    atannn: Math.atan2,
    ceil: Math.ceil,
    clamp,
    cos: Math.cos,
    degrees: deg,
    dFdx: () => 0,
    dFdy: () => 0,
    exp: Math.exp,
    exp2: (x) => Math.pow(2, x),
    floor: Math.floor,
    fract: fract$1,
    fwidth: () => 0,
    inversesqrt: (x) => 1 / Math.sqrt(x),
    log: Math.log,
    log2: Math.log2,
    max: Math.max,
    min: Math.min,
    mix,
    mixn: mix,
    mod: fmod$1,
    modn: fmod$1,
    pow: Math.pow,
    radians: rad,
    sign: Math.sign,
    sin: Math.sin,
    smoothstep: smoothStep,
    sqrt: Math.sqrt,
    step,
    tan: Math.tan,
};

const INT = {
    abs: Math.abs,
    add: (a, b) => (a + b) | 0,
    bitand: (a, b) => a & b,
    bitnot1: (a) => ~a,
    bitor: (a, b) => a | b,
    bitxor: (a, b) => a ^ b,
    clamp,
    dec: (a) => (a - 1) | 0,
    div: (a, b) => (a / b) | 0,
    inc: (a) => (a + 1) | 0,
    lshift: (a, b) => a << b,
    max: Math.max,
    min: Math.min,
    modi: (a, b) => a % b,
    mul: (a, b) => (a * b) | 0,
    rshift: (a, b) => a >> b,
    sign: Math.sign,
    sub: (a, b) => (a - b) | 0,
    sub1: (a) => -a | 0,
};

const VEC2 = {
    abs: (a) => abs2([], a),
    acos: (a) => acos2([], a),
    add: (a, b) => add2([], a, b),
    addnv: (a, b) => addN2([], b, a),
    addvn: (a, b) => addN2([], a, b),
    asin: (a) => asin2([], a),
    atan: (a) => atan2([], a),
    atannn: (a, b) => atan_22([], a, b),
    ceil: (a) => ceil2([], a),
    clamp: (x, a, b) => clamp2([], x, a, b),
    cos: (a) => cos2([], a),
    dec: (a) => subN2([], a, 1),
    degrees: (a) => degrees2([], a),
    dFdx: () => ZERO2,
    dFdy: () => ZERO2,
    distance: dist,
    div: (a, b) => div2([], a, b),
    divnv: (a, b) => div2(null, [a, a], b),
    divvn: (a, b) => divN2([], a, b),
    dot: (a, b) => dot2(a, b),
    exp: (a) => exp2([], a),
    exp2: (a) => exp_22([], a),
    faceForward: (a, b, c) => faceForward([], a, b, c),
    floor: (a) => floor2([], a),
    fract: (a) => fract2([], a),
    fwidth: () => ZERO2,
    inc: (a) => addN2([], a, 1),
    inversesqrt: (a) => invSqrt2([], a),
    length: mag,
    log: (a) => log2([], a),
    log2: (a) => log_22([], a),
    max: (a, b) => max2([], a, b),
    min: (a, b) => min2([], a, b),
    mix: (a, b, t) => mix2([], a, b, t),
    mixn: (a, b, t) => mixN2([], a, b, t),
    mod: (a, b) => fmod2([], a, b),
    modn: (a, b) => fmodN2([], a, b),
    mul: (a, b) => mul2([], a, b),
    mulnv: (a, b) => mulN2([], b, a),
    mulvn: (a, b) => mulN2([], a, b),
    normalize: (a) => normalize([], a),
    pow: (a, b) => pow2([], a, b),
    radians: (a) => radians2([], a),
    reflect: (a, b) => reflect([], a, b),
    refract: (a, b, c) => refract([], a, b, c),
    sign: (a) => sign2([], a),
    sin: (a) => sin2([], a),
    smoothstep: (a, b, t) => smoothStep2([], a, b, t),
    sqrt: (a) => sqrt2([], a),
    step: (a, b) => step2([], a, b),
    sub: (a, b) => sub2([], a, b),
    sub1: (a) => neg([], a),
    subnv: (a, b) => sub2(null, [a, a], b),
    subvn: (a, b) => subN2([], a, b),
    tan: (a) => tan2([], a),
    equal: (a, b) => eq2([], a, b),
    notEqual: (a, b) => neq2([], a, b),
    greaterThan: (a, b) => gt2([], a, b),
    lessThan: (a, b) => lt2([], a, b),
    greaterThanEqual: (a, b) => gte2([], a, b),
    lessThanEqual: (a, b) => lte2([], a, b),
};

const IVEC2 = Object.assign(Object.assign({}, VEC2), { add: (a, b) => addI2([], a, b), addvn: (a, b) => addNI2([], a, b), addnv: (a, b) => addNI2([], b, a), div: (a, b) => divI2([], a, b), divvn: (a, b) => divNI2([], a, b), divnv: (a, b) => divI2(null, [a, a], b), modi: (a, b) => mod2([], a, b), modivn: (a, b) => modN2([], a, b), modinv: (a, b) => mod2(null, [a, a], b), mul: (a, b) => mulI2([], a, b), mulvn: (a, b) => mulNI2([], a, b), mulnv: (a, b) => mulNI2([], b, a), sub: (a, b) => subI2([], a, b), subvn: (a, b) => subNI2([], a, b), subnv: (a, b) => subI2(null, [a, a], b), bitand: (a, b) => bitAndI2([], a, b), lshift: (a, b) => lshiftI2([], a, b), bitnot1: (a) => bitNotI2([], a), bitor: (a, b) => bitOrI2([], a, b), rshift: (a, b) => rshiftI2([], a, b), bitxor: (a, b) => bitXorI2([], a, b) });

const VEC3 = {
    abs: (a) => abs3([], a),
    acos: (a) => acos3([], a),
    add: (a, b) => add3([], a, b),
    addnv: (a, b) => addN3([], b, a),
    addvn: (a, b) => addN3([], a, b),
    asin: (a) => asin3([], a),
    atan: (a) => atan3([], a),
    atannn: (a, b) => atan_23([], a, b),
    ceil: (a) => ceil3([], a),
    clamp: (x, a, b) => clamp3([], x, a, b),
    cos: (a) => cos3([], a),
    cross: (a, b) => cross3([], a, b),
    dec: (a) => subN3([], a, 1),
    degrees: (a) => degrees3([], a),
    dFdx: () => ZERO3,
    dFdy: () => ZERO3,
    distance: dist,
    div: (a, b) => div3([], a, b),
    divnv: (a, b) => div3(null, [a, a, a], b),
    divvn: (a, b) => divN3([], a, b),
    dot: (a, b) => dot3(a, b),
    exp: (a) => exp3([], a),
    exp2: (a) => exp_23([], a),
    faceForward: (a, b, c) => faceForward([], a, b, c),
    floor: (a) => floor3([], a),
    fract: (a) => fract3([], a),
    fwidth: () => ZERO3,
    inc: (a) => addN3([], a, 1),
    inversesqrt: (a) => invSqrt3([], a),
    length: mag,
    log: (a) => log3([], a),
    log2: (a) => log_23([], a),
    max: (a, b) => max3([], a, b),
    min: (a, b) => min3([], a, b),
    mix: (a, b, t) => mix3([], a, b, t),
    mixn: (a, b, t) => mixN3([], a, b, t),
    mod: (a, b) => fmod3([], a, b),
    modn: (a, b) => fmodN3([], a, b),
    mul: (a, b) => mul3([], a, b),
    mulnv: (a, b) => mulN3([], b, a),
    mulvn: (a, b) => mulN3([], a, b),
    normalize: (a) => normalize([], a),
    pow: (a, b) => pow3([], a, b),
    radians: (a) => radians3([], a),
    reflect: (a, b) => reflect([], a, b),
    refract: (a, b, c) => refract([], a, b, c),
    sign: (a) => sign3([], a),
    sin: (a) => sin3([], a),
    smoothstep: (a, b, t) => smoothStep3([], a, b, t),
    sqrt: (a) => sqrt3([], a),
    step: (a, b) => step3([], a, b),
    sub: (a, b) => sub3([], a, b),
    sub1: (a) => neg([], a),
    subnv: (a, b) => sub3(null, [a, a, a], b),
    subvn: (a, b) => subN3([], a, b),
    tan: (a) => tan3([], a),
    equal: (a, b) => eq3([], a, b),
    notEqual: (a, b) => neq3([], a, b),
    greaterThan: (a, b) => gt3([], a, b),
    lessThan: (a, b) => lt3([], a, b),
    greaterThanEqual: (a, b) => gte3([], a, b),
    lessThanEqual: (a, b) => lte3([], a, b),
};

const IVEC3 = Object.assign(Object.assign({}, VEC3), { add: (a, b) => addI3([], a, b), addvn: (a, b) => addNI3([], a, b), addnv: (a, b) => addNI3([], b, a), div: (a, b) => divI3([], a, b), divvn: (a, b) => divNI3([], a, b), divnv: (a, b) => divI3(null, [a, a, a], b), modi: (a, b) => mod3([], a, b), modivn: (a, b) => modN3([], a, b), modinv: (a, b) => mod3(null, [a, a, a], b), mul: (a, b) => mulI3([], a, b), mulvn: (a, b) => mulNI3([], a, b), mulnv: (a, b) => mulNI3([], b, a), sub: (a, b) => subI3([], a, b), subvn: (a, b) => subNI3([], a, b), subnv: (a, b) => subI3(null, [a, a, a], b), bitand: (a, b) => bitAndI3([], a, b), lshift: (a, b) => lshiftI3([], a, b), bitnot1: (a) => bitNotI3([], a), bitor: (a, b) => bitOrI3([], a, b), rshift: (a, b) => rshiftI3([], a, b), bitxor: (a, b) => bitXorI3([], a, b) });

const VEC4 = {
    abs: (a) => abs4([], a),
    acos: (a) => acos4([], a),
    add: (a, b) => add4([], a, b),
    addnv: (a, b) => addN4([], b, a),
    addvn: (a, b) => addN4([], a, b),
    asin: (a) => asin4([], a),
    atan: (a) => atan4([], a),
    atannn: (a, b) => atan_24([], a, b),
    ceil: (a) => ceil4([], a),
    clamp: (x, a, b) => clamp4([], x, a, b),
    cos: (a) => cos4([], a),
    dec: (a) => subN4([], a, 1),
    degrees: (a) => degrees4([], a),
    dFdx: () => ZERO4,
    dFdy: () => ZERO4,
    distance: dist,
    div: (a, b) => div4([], a, b),
    divnv: (a, b) => div4(null, [a, a, a, a], b),
    divvn: (a, b) => divN4([], a, b),
    dot: (a, b) => dot4(a, b),
    exp: (a) => exp4([], a),
    exp2: (a) => exp_24([], a),
    faceForward: (a, b, c) => faceForward([], a, b, c),
    floor: (a) => floor4([], a),
    fract: (a) => fract4([], a),
    fwidth: () => ZERO4,
    inc: (a) => addN4([], a, 1),
    inversesqrt: (a) => invSqrt4([], a),
    length: mag,
    log: (a) => log4([], a),
    log2: (a) => log_24([], a),
    max: (a, b) => max4([], a, b),
    min: (a, b) => min4([], a, b),
    mix: (a, b, t) => mix4([], a, b, t),
    mixn: (a, b, t) => mixN4([], a, b, t),
    mod: (a, b) => fmod4([], a, b),
    modn: (a, b) => fmodN4([], a, b),
    mul: (a, b) => mul4([], a, b),
    mulnv: (a, b) => mulN4([], b, a),
    mulvn: (a, b) => mulN4([], a, b),
    normalize: (a) => normalize([], a),
    pow: (a, b) => pow4([], a, b),
    radians: (a) => radians4([], a),
    reflect: (a, b) => reflect([], a, b),
    refract: (a, b, c) => refract([], a, b, c),
    sign: (a) => sign4([], a),
    sin: (a) => sin4([], a),
    smoothstep: (a, b, t) => smoothStep4([], a, b, t),
    sqrt: (a) => sqrt4([], a),
    step: (a, b) => step4([], a, b),
    sub: (a, b) => sub4([], a, b),
    sub1: (a) => neg([], a),
    subnv: (a, b) => sub4(null, [a, a, a, a], b),
    subvn: (a, b) => subN4([], a, b),
    tan: (a) => tan4([], a),
    equal: (a, b) => eq4([], a, b),
    notEqual: (a, b) => neq4([], a, b),
    greaterThan: (a, b) => gt4([], a, b),
    lessThan: (a, b) => lt4([], a, b),
    greaterThanEqual: (a, b) => gte4([], a, b),
    lessThanEqual: (a, b) => lte4([], a, b),
};

const IVEC4 = Object.assign(Object.assign({}, VEC4), { add: (a, b) => addI4([], a, b), addvn: (a, b) => addNI4([], a, b), addnv: (a, b) => addNI4([], b, a), div: (a, b) => divI4([], a, b), divvn: (a, b) => divNI4([], a, b), divnv: (a, b) => divI4(null, [a, a, a, a], b), modi: (a, b) => mod4([], a, b), modivn: (a, b) => modN4([], a, b), modinv: (a, b) => mod4(null, [a, a, a, a], b), mul: (a, b) => mulI4([], a, b), mulvn: (a, b) => mulNI4([], a, b), mulnv: (a, b) => mulNI4([], b, a), sub: (a, b) => subI4([], a, b), subvn: (a, b) => subNI4([], a, b), subnv: (a, b) => subI4(null, [a, a, a, a], b), bitand: (a, b) => bitAndI4([], a, b), lshift: (a, b) => lshiftI4([], a, b), bitnot1: (a) => bitNotI4([], a), bitor: (a, b) => bitOrI4([], a, b), rshift: (a, b) => rshiftI4([], a, b), bitxor: (a, b) => bitXorI4([], a, b) });

const MAT2 = {
    add: (a, b) => add22([], a, b),
    addnv: (a, b) => addN22([], b, a),
    addvn: (a, b) => addN22([], a, b),
    dec: (a) => subN22([], a, 1),
    div: (a, b) => div22([], a, b),
    divnv: (a, b) => div22(null, [a, a, a, a], b),
    divvn: (a, b) => divN22([], a, b),
    inc: (a) => addN22([], a, 1),
    mul: (a, b) => mul22([], a, b),
    mulm: (a, b) => mulM22([], a, b),
    mulmv: (a, b) => mulV22([], a, b),
    mulnv: (a, b) => mulN22([], b, a),
    mulvm: (a, b) => mulVM22([], a, b),
    mulvn: (a, b) => mulN22([], a, b),
    sub: (a, b) => sub22([], a, b),
    sub1: (a) => neg([], a),
    subnv: (a, b) => sub22(null, [a, a, a, a], b),
    subvn: (a, b) => subN22([], a, b),
};

const MAT3 = {
    add: (a, b) => add33([], a, b),
    addnv: (a, b) => addN33([], b, a),
    addvn: (a, b) => addN33([], a, b),
    dec: (a) => subN33([], a, 1),
    div: (a, b) => div33([], a, b),
    divnv: (a, b) => div33(null, vecOf(9, a), b),
    divvn: (a, b) => divN33([], a, b),
    inc: (a) => addN33([], a, 1),
    mul: (a, b) => mul33([], a, b),
    mulm: (a, b) => mulM33([], a, b),
    mulmv: (a, b) => mulV33([], a, b),
    mulnv: (a, b) => mulN33([], b, a),
    mulvm: (a, b) => mulVM33([], a, b),
    mulvn: (a, b) => mulN33([], a, b),
    sub: (a, b) => sub33([], a, b),
    sub1: (a) => neg([], a),
    subnv: (a, b) => sub33(null, vecOf(9, a), b),
    subvn: (a, b) => subN33([], a, b),
};

const MAT4 = {
    add: (a, b) => add44([], a, b),
    addnv: (a, b) => addN44([], b, a),
    addvn: (a, b) => addN44([], a, b),
    dec: (a) => subN44([], a, 1),
    div: (a, b) => div44([], a, b),
    divnv: (a, b) => div44(null, vecOf(16, a), b),
    divvn: (a, b) => divN44([], a, b),
    inc: (a) => addN44([], a, 1),
    mul: (a, b) => mul44([], a, b),
    mulm: (a, b) => mulM44([], a, b),
    mulmv: (a, b) => mulV44([], a, b),
    mulnv: (a, b) => mulN44([], b, a),
    mulvm: (a, b) => mulVM44([], a, b),
    mulvn: (a, b) => mulN44([], a, b),
    sub: (a, b) => sub44([], a, b),
    sub1: (a) => neg([], a),
    subnv: (a, b) => sub44(null, vecOf(16, a), b),
    subvn: (a, b) => subN44([], a, b),
};

const UINT = {
    abs: Math.abs,
    add: (a, b) => (a + b) >>> 0,
    bitand: (a, b) => (a & b) >>> 0,
    bitnot1: (a) => ~a >>> 0,
    bitor: (a, b) => (a | b) >>> 0,
    bitxor: (a, b) => (a ^ b) >>> 0,
    clamp,
    dec: (a) => (a - 1) >>> 0,
    div: (a, b) => (a / b) >>> 0,
    inc: (a) => (a + 1) >>> 0,
    lshift: (a, b) => (a << b) >>> 0,
    max: Math.max,
    min: Math.min,
    modi: (a, b) => a % b,
    mul: (a, b) => (a * b) >>> 0,
    rshift: (a, b) => a >>> b,
    sign: Math.sign,
    sub: (a, b) => (a - b) >>> 0,
    sub1: (a) => -a >>> 0,
};

const UVEC2 = Object.assign(Object.assign({}, VEC2), { add: (a, b) => addU2([], a, b), addvn: (a, b) => addNU2([], a, b), addnv: (a, b) => addNU2([], b, a), div: (a, b) => divU2([], a, b), divvn: (a, b) => divNU2([], a, b), divnv: (a, b) => divU2(null, [a, a], b), modi: (a, b) => mod2([], a, b), modivn: (a, b) => modN2([], a, b), modinv: (a, b) => mod2(null, [a, a], b), mul: (a, b) => mulU2([], a, b), mulvn: (a, b) => mulNU2([], a, b), mulnv: (a, b) => mulNU2([], b, a), sub: (a, b) => subU2([], a, b), subvn: (a, b) => subNU2([], a, b), subnv: (a, b) => subU2(null, [a, a], b), bitand: (a, b) => bitAndU2([], a, b), lshift: (a, b) => lshiftU2([], a, b), bitnot1: (a) => bitNotU2([], a), bitor: (a, b) => bitOrU2([], a, b), rshift: (a, b) => rshiftU2([], a, b), bitxor: (a, b) => bitXorU2([], a, b) });

const UVEC3 = Object.assign(Object.assign({}, VEC3), { add: (a, b) => addU3([], a, b), addvn: (a, b) => addNU3([], a, b), addnv: (a, b) => addNU3([], b, a), div: (a, b) => divU3([], a, b), divvn: (a, b) => divNU3([], a, b), divnv: (a, b) => divU3(null, [a, a, a], b), modi: (a, b) => mod3([], a, b), modivn: (a, b) => modN3([], a, b), modinv: (a, b) => mod3(null, [a, a, a], b), mul: (a, b) => mulU3([], a, b), mulvn: (a, b) => mulNU3([], a, b), mulnv: (a, b) => mulNU3([], b, a), sub: (a, b) => subU3([], a, b), subvn: (a, b) => subNU3([], a, b), subnv: (a, b) => subU3(null, [a, a, a], b), bitand: (a, b) => bitAndU3([], a, b), lshift: (a, b) => lshiftU3([], a, b), bitnot1: (a) => bitNotU3([], a), bitor: (a, b) => bitOrU3([], a, b), rshift: (a, b) => rshiftU3([], a, b), bitxor: (a, b) => bitXorU3([], a, b) });

const UVEC4 = Object.assign(Object.assign({}, VEC4), { add: (a, b) => addU4([], a, b), addvn: (a, b) => addNU4([], a, b), addnv: (a, b) => addNU4([], b, a), div: (a, b) => divU4([], a, b), divvn: (a, b) => divNU4([], a, b), divnv: (a, b) => divU4(null, [a, a, a, a], b), modi: (a, b) => mod4([], a, b), modivn: (a, b) => modN4([], a, b), modinv: (a, b) => mod4(null, [a, a, a, a], b), mul: (a, b) => mulU4([], a, b), mulvn: (a, b) => mulNU4([], a, b), mulnv: (a, b) => mulNU4([], b, a), sub: (a, b) => subU4([], a, b), subvn: (a, b) => subNU4([], a, b), subnv: (a, b) => subU4(null, [a, a, a, a], b), bitand: (a, b) => bitAndU4([], a, b), lshift: (a, b) => lshiftU4([], a, b), bitnot1: (a) => bitNotU4([], a), bitor: (a, b) => bitOrU4([], a, b), rshift: (a, b) => rshiftU4([], a, b), bitxor: (a, b) => bitXorU4([], a, b) });

// TODO texture lookups
// all texture fns currently return [0,0,0,0] or 0
const SAMPLER_TODO = {
    texelFetch: () => ZERO4,
    texelFetchOffset: () => ZERO4,
    texture: () => ZERO4,
    texturen: () => 0,
    textureGrad: () => ZERO4,
    textureGradn: () => 0,
    textureLod: () => ZERO4,
    textureLodn: () => 0,
    textureOffset: () => ZERO4,
    textureOffsetn: () => 0,
    textureProj: () => ZERO4,
    textureProjn: () => 0,
    textureSize: () => ZERO3,
};
const ident = (x) => x;
const JS_DEFAULT_ENV = {
    vec2: VEC2,
    vec2b: (v) => fromBVec2([], v),
    vec2i: ident,
    vec2n: (n) => [n, n],
    vec2u: ident,
    vec3: VEC3,
    vec3b: (v) => fromBVec3([], v),
    vec3i: ident,
    vec3n: (n) => [n, n, n],
    vec3u: ident,
    vec3vn: (a, n) => setVN3([], a, n),
    vec4: VEC4,
    vec4b: (v) => fromBVec4([], v),
    vec4i: ident,
    vec4n: (n) => [n, n, n, n],
    vec4u: ident,
    vec4vn: (a, n) => setVN4([], a, n),
    vec4vnn: (a, z, w) => setVV4([], a, [z, w]),
    vec4vv: (a, b) => setVV4([], a, b),
    mat2n: (n) => mat22n([], n),
    mat2vv: (a, b) => mat22v([], a, b),
    mat3n: (n) => mat33n([], n),
    mat3vvv: (a, b, c) => mat33v([], a, b, c),
    mat4n: (n) => mat44n([], n),
    mat4vvvv: (a, b, c, d) => mat44v([], a, b, c, d),
    swizzle2: (a, b, c) => swizzle2([], a, b, c),
    swizzle3: (a, b, c, d) => swizzle3([], a, b, c, d),
    swizzle4: (a, b, c, d, e) => swizzle4([], a, b, c, d, e),
    set_swizzle2: setSwizzle2,
    set_swizzle3: setSwizzle3,
    set_swizzle4: setSwizzle4,
    float: FLOAT,
    int: INT,
    uint: UINT,
    bvec2: BVEC2,
    bvec2n: (n) => ((n = !!n), [n, n]),
    bvec3: BVEC3,
    bvec3n: (n) => ((n = !!n), [n, n, n]),
    bvec4: BVEC4,
    bvec4n: (n) => ((n = !!n), [n, n, n, n]),
    ivec2: IVEC2,
    ivec2b: (v) => fromBVec2([], v),
    ivec2n: (n) => [n, n],
    ivec3: IVEC3,
    ivec3b: (v) => fromBVec3([], v),
    ivec3n: (n) => [n, n, n],
    ivec4: IVEC4,
    ivec4b: (v) => fromBVec4([], v),
    ivec4n: (n) => [n, n, n, n],
    uvec2: UVEC2,
    uvec2b: (v) => fromBVec2([], v),
    uvec2n: (n) => [n, n],
    uvec3: UVEC3,
    uvec3b: (v) => fromBVec3([], v),
    uvec3n: (n) => [n, n, n],
    uvec4: UVEC4,
    uvec4b: (v) => fromBVec4([], v),
    uvec4n: (n) => [n, n, n, n],
    mat2: MAT2,
    mat3: MAT3,
    mat4: MAT4,
    sampler1D: SAMPLER_TODO,
    sampler2D: SAMPLER_TODO,
    sampler3D: SAMPLER_TODO,
    samplerCube: SAMPLER_TODO,
    sampler2DShadow: SAMPLER_TODO,
    samplerCubeShadow: SAMPLER_TODO,
};

const CMP_OPS = {
    "!": "not",
    "<": "lt",
    "<=": "lte",
    "==": "eq",
    "!=": "neq",
    ">=": "gte",
    ">": "gt",
};
const OP_IDS = Object.assign(Object.assign({}, CMP_OPS), { "+": "add", "-": "sub", "*": "mul", "/": "div", "%": "modi", "++": "inc", "--": "dec", "||": "or", "&&": "and", "|": "bitor", "&": "bitand", "^": "bitxor", "~": "bitnot", "<<": "lshift", ">>": "rshift" });
const PRELUDE = [
    "float",
    "int",
    "uint",
    "vec2",
    "vec3",
    "vec4",
    "bvec2",
    "bvec3",
    "bvec4",
    "ivec2",
    "ivec3",
    "ivec4",
    "uvec2",
    "uvec3",
    "uvec4",
    "mat2",
    "mat3",
    "mat4",
    "sampler2D",
    "sampler3D",
    "samplerCube",
    "sampler2DShadow",
    "samplerCubeShadow",
]
    .map((x) => `const ${x} = env.${x};`)
    .join("\n");
const COMPS = { x: 0, y: 1, z: 2, w: 3 };
const RE_SEMI = /[};]$/;
const isIntOrBool = (l) => isInt(l) || isUint(l) || isBool(l);
const isVecOrMat = (l) => isVec(l) || isMat(l);
const swizzle = (id) => [...id].map((x) => COMPS[x]).join(", ");
const buildComments = (t) => `/**\n${t.args.map((p) => ` * @param ${p.id} ${p.type}`).join("\n")}\n */`;
const buildExports = (tree) => tree.tag === "scope"
    ? tree.body
        .filter((x) => x.tag === "fn")
        .map((f) => `${f.id}: ${f.id}`)
        .join(",\n")
    : tree.tag === "fn"
        ? `${tree.id}: ${tree.id}`
        : "";
const targetJS = () => {
    const $list = (body, sep = ", ") => body.map(emit).join(sep);
    const $fn = (name, args) => `${name}(${$list(args)})`;
    const $vec = ({ val, info, type }) => !info ? `[${$list(val)}]` : `env.${type}${info}(${$list(val)})`;
    const $num = (v, f) => isNumber(v) ? String(v) : f(v);
    const emit = defTarget({
        arg: (t) => t.id,
        array_init: (t) => `[${$list(t.init)}]`,
        assign: (t) => {
            const rhs = emit(t.r);
            if (t.l.tag === "swizzle") {
                const s = t.l;
                const id = swizzle(s.id);
                const val = emit(s.val);
                return s.id.length > 1
                    ? `env.set_swizzle${s.id.length}(${val}, ${rhs}, ${id})`
                    : `(${val}[${id}] = ${rhs})`;
            }
            return `${emit(t.l)} = ${rhs}`;
        },
        ctrl: (t) => t.id,
        call: (t) => $fn(t.id, t.args),
        call_i: (t) => $fn(`${t.args[0].type}.${t.id}${t.info || ""}`, t.args),
        decl: ({ type, id }) => {
            const res = [];
            res.push(id.opts.const ? "const" : "let", `/*${type}*/`, id.id);
            id.init
                ? res.push(`= ${emit(id.init)}`)
                : id.opts.num !== undefined
                    ? res.push(`= new Array(${id.opts.num})`)
                    : undefined;
            return res.join(" ");
        },
        fn: (t) => `${buildComments(t)}\nfunction ${t.id}(${$list(t.args)}) ${emit(t.scope)}`,
        for: (t) => `for(${t.init ? emit(t.init) : ""}; ${emit(t.test)}; ${t.iter ? emit(t.iter) : ""}) ${emit(t.scope)}`,
        idx: (t) => `${emit(t.val)}[${emit(t.id)}]`,
        if: (t) => {
            const res = `if (${emit(t.test)}) ${emit(t.t)}`;
            return t.f ? `${res} else ${emit(t.f)}` : res;
        },
        lit: (t) => {
            const v = t.val;
            switch (t.type) {
                case "bool":
                    return isBoolean(v) ? String(v) : `!!(${emit(v)})`;
                case "float":
                    return $num(v, () => isBool(v) ? `(${emit(v)} & 1)` : emit(v));
                case "int":
                    return $num(v, () => `(${emit(v)} | 0)`);
                case "uint":
                    return $num(v, () => `(${emit(v)} >>> 0)`);
                case "vec2":
                case "vec3":
                case "vec4":
                case "bvec2":
                case "bvec3":
                case "bvec4":
                case "ivec2":
                case "ivec3":
                case "ivec4":
                case "uvec2":
                case "uvec3":
                case "uvec4":
                case "bvec2":
                case "bvec3":
                case "bvec4":
                case "mat2":
                case "mat3":
                case "mat4":
                    return $vec(t);
                default:
                    return unsupported(`unknown type: ${t.type}`);
            }
        },
        op1: (t) => {
            const complex = isVecOrMat(t) || isInt(t);
            const op = t.op;
            const val = emit(t.val);
            return complex && t.post
                ? `${t.val.id} = ${t.type}.${OP_IDS[op]}(${val})`
                : complex
                    ? `${t.type}.${OP_IDS[op]}1(${val})`
                    : t.post
                        ? `(${val}${op})`
                        : `${op}${val}`;
        },
        op2: (t) => {
            const { l, r } = t;
            const vec = isVecOrMat(l)
                ? l.type
                : isVecOrMat(r)
                    ? r.type
                    : undefined;
            const int = !vec
                ? isIntOrBool(l)
                    ? l.type
                    : isIntOrBool(r)
                        ? r.type
                        : undefined
                : undefined;
            const el = emit(l);
            const er = emit(r);
            return vec || (int && !CMP_OPS[t.op])
                ? `${vec || int}.${OP_IDS[t.op]}${t.info || ""}(${el}, ${er})`
                : `(${el} ${t.op} ${er})`;
        },
        ret: (t) => "return" + (t.val ? " " + emit(t.val) : ""),
        scope: (t) => {
            let res = $list(t.body, ";\n");
            res += t.body.length && !RE_SEMI.test(res) ? ";" : "";
            return !t.global ? `{\n${res}\n}` : res;
        },
        swizzle: (t) => t.id.length > 1
            ? `env.swizzle${t.id.length}(${emit(t.val)}, ${swizzle(t.id)})`
            : `${emit(t.val)}[${swizzle(t.id)}]`,
        sym: (t) => t.id,
        ternary: (t) => `(${emit(t.test)} ? ${emit(t.t)} : ${emit(t.f)})`,
        while: (t) => `while (${emit(t.test)}) ${emit(t.scope)}`,
    });
    Object.assign(emit, {
        compile: (tree, env = JS_DEFAULT_ENV) => {
            const exports = buildExports(tree);
            return new Function("env", [PRELUDE, emit(tree), "return {", exports, "};"].join("\n"))(env);
        },
    });
    return emit;
};

export { targetJS };
