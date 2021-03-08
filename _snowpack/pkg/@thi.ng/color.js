import { m as memoizeJ, c as repeat, d as assert, e as ensureAlpha, i as intArgb32Srgb, f as intAbgr32Srgb, p as parseCss, g as hueRgb, l as luminanceRgb, j as clampH, k as clamp, R as RGB_XYZ_D50, D as D50, B as BRADFORD_D65_D50, n as D65, X as XYZ_RGB_D50, o as XYZ_RGB_D65, q as RGB_LUMINANCE_REC709, b as hslRgb, h as hsvRgb, F as FF, E as EPS$1, s as luminanceArgb32, t as luminanceAbgr32, u as luminanceSrgb } from '../common/hsv-rgb-82fd963f.js';
export { C as CSS_NAMES, b as hslRgb, h as hsvRgb, v as namedHueRgb, p as parseCss, a as rgbHsv } from '../common/hsv-rgb-82fd963f.js';
import { s as setC4, c as clamp4, a as setC3 } from '../common/clamp-bf64be6a.js';
import { a as clamp01 } from '../common/interval-eabb0a00.js';
import { d as dotS3 } from '../common/dots-43396d16.js';
import { f as fract } from '../common/dot-bdae3efe.js';
import { u as unsupported } from '../common/unsupported-d467609e.js';
import { i as isArray } from '../common/is-array-a7fa88fb.js';
import { i as isString } from '../common/is-string-40d6c094.js';
import { k as isArrayLike } from '../common/map-ab3a157d.js';
import { i as implementsFunction } from '../common/implements-function-c507affc.js';
import { i as isNumber } from '../common/is-number-dd4646bb.js';
import { i as illegalArgs } from '../common/illegal-arguments-f9331715.js';
import { a as set4 } from '../common/set-260c7c36.js';
import { E as EPS, I as INV_TAU, T as TAU } from '../common/api-37d17bdb.js';
import { v as vop, h as compileHOF } from '../common/codegen-6bdfa5cb.js';
import { r as randMinMax } from '../common/random-75d43ebd.js';
import { a as atan2Abs } from '../common/angle-c4aa0791.js';
import { N as NULL_LOGGER } from '../common/logger-b9e6479b.js';
import { S as SYSTEM } from '../common/system-2f58b569.js';
import '../common/_node-resolve:empty-5550de3c.js';
import '../common/deferror-480a42fb.js';
import '../common/comp-b69ffdf6.js';
import '../common/range-90bff8dc.js';
import '../common/normalize-a82f17ef.js';
import '../common/muln-5d44e24a.js';

const abs = Math.abs;
/**
 * Similar to {@link eqDelta}, but used given `eps` as is.
 *
 * @param a - left value
 * @param b - right value
 * @param eps - epsilon / tolerance, default `1e-6`
 */
const eqDelta = (a, b, eps = EPS) => abs(a - b) <= eps;

/**
 * Returns `a` divided by `b` or zero if `b = 0`.
 *
 * @param a
 * @param b
 */
const safeDiv = (a, b) => (b !== 0 ? a / b : 0);

/**
 * Returns true w/ a (theoretical) probability of 50% (obviously depending on
 * quality of given {@link IRandom}) PRNG.
 *
 * @remarks
 * Also see {@link fairCoin}.
 *
 * @param rnd
 */
const coin = (rnd = SYSTEM) => rnd.float() < 0.5;

/**
 * Hex digits
 */
const HEX = "0123456789abcdef";
/**
 * Returns 8bit uint as hex string
 *
 * @param x
 */
const U8 = (x) => HEX[(x >>> 4) & 0xf] + HEX[x & 0xf];
/**
 * Returns 16bit uint as hex string
 *
 * @param x
 */
const U16 = (x) => U8(x >>> 8) + U8(x & 0xff);
/**
 * Returns 24bit uint as hex string
 *
 * @param x
 */
const U24 = (x) => U8(x >>> 16) + U16(x);

/**
 * Returns a {@link Stringer} which formats given numbers to `radix`, `len` and
 * with optional prefix (not included in `len`).
 *
 * @remarks
 * Only bases 2 - 36 are supported, due to native `Number.toString()`
 * limitations.
 *
 * @param radix -
 * @param len -
 * @param prefix -
 */
const radix = memoizeJ((radix, n, prefix = "") => {
    const buf = repeat("0", n);
    return (x) => {
        x = (x >>> 0).toString(radix);
        return prefix + (x.length < n ? buf.substr(x.length) + x : x);
    };
});
/**
 * 8bit binary conversion preset.
 */
radix(2, 8);
/**
 * 16bit binary conversion preset.
 */
radix(2, 16);
/**
 * 32bit binary conversion preset.
 */
radix(2, 32);
/**
 * 24bit hex conversion preset.
 * Assumes unsigned inputs.
 */
const U24$1 = U24;

/** @internal */
const declareIndex = (proto, id, idx, strided = true, defNumeric = true) => {
    const get = idx > 0
        ? strided
            ? function () {
                return this.buf[this.offset + idx * this.stride];
            }
            : function () {
                return this.buf[this.offset + idx];
            }
        : function () {
            return this.buf[this.offset];
        };
    const set = idx > 0
        ? strided
            ? function (n) {
                this.buf[this.offset + idx * this.stride] = n;
            }
            : function (n) {
                this.buf[this.offset + idx] = n;
            }
        : function (n) {
            this.buf[this.offset] = n;
        };
    defNumeric &&
        Object.defineProperty(proto, idx, {
            get,
            set,
            enumerable: true,
        });
    Object.defineProperty(proto, id, {
        get,
        set,
        enumerable: true,
    });
};
/** @internal */
const declareIndices = (proto, props, strided, defNumeric) => props.forEach((id, i) => declareIndex(proto, id, i, strided, defNumeric));

function* stridedValues(buf, num, start, stride) {
    while (num-- > 0) {
        yield buf[start];
        start += stride;
    }
}

const mapStridedBuffer = (ctor, buf, num, start, cstride, estride) => {
    const res = [];
    while (--num >= 0) {
        res.push(new ctor(buf, start, cstride));
        start += estride;
    }
    return res;
};

const $ = (dim) => eqDelta$1.add(dim, compileHOF(dim, [eqDelta, EPS], ([a, b]) => `eq(${a},${b},eps)`, "eq,_eps", "a,b,eps=_eps", "a,b", "", "&&", "return a.length === b.length && ", ";"));
/**
 * Checks given vectors for componentwise equality, taking tolerance
 * `eps` (default: {@link @thi.ng/math#EPS}) into account.
 *
 * @param a
 * @param b
 * @param eps
 */
const eqDelta$1 = vop();
eqDelta$1.default((v1, v2, eps = EPS) => {
    if (implementsFunction(v1, "eqDelta")) {
        return v1.eqDelta(v2, eps);
    }
    if (implementsFunction(v2, "eqDelta")) {
        return v2.eqDelta(v1, eps);
    }
    return eqDeltaS(v1, v2, v1.length, eps);
});
$(2);
$(3);
const eqDelta4 = $(4);
/**
 * Checks given strided vectors for componentwise equality, taking
 * tolerance `eps` (default: {@link @thi.ng/math#EPS}) into account.
 *
 * @param a - first vector
 * @param b - second vector
 * @param n - number of elements
 * @param eps - tolerance
 * @param ia - start index a
 * @param ib - start index b
 * @param sa - stride a
 * @param sb - stride b
 */
const eqDeltaS = (a, b, n, eps = EPS, ia = 0, ib = 0, sa = 1, sb = 1) => {
    for (; n > 0; n--, ia += sa, ib += sb) {
        if (!eqDelta(a[ia], b[ib], eps)) {
            return false;
        }
    }
    return true;
};

const CONVERSIONS = {};
/**
 * Registers conversions for given {@link ColorSpec}. Called by
 * {@link defColor}.
 *
 * @param spec
 *
 * @internal
 */
const defConversions = (mode, spec) => {
    for (let id in spec) {
        const val = spec[id];
        if (isArray(val)) {
            const [a, b, c, d] = val;
            spec[id] =
                val.length === 2
                    ? (out, src) => b(out, a(out, src))
                    : val.length === 3
                        ? (out, src) => c(out, b(out, a(out, src)))
                        : (out, src) => d(out, c(out, b(out, a(out, src))));
        }
    }
    CONVERSIONS[mode] = spec;
};
const convert = (res, src, destMode, srcMode) => {
    const spec = CONVERSIONS[destMode];
    assert(!!spec, `no conversions available for ${destMode}`);
    let $convert = spec[srcMode];
    return $convert
        ? $convert(res, src)
        : CONVERSIONS.rgb[srcMode]
            ? spec.rgb(res, CONVERSIONS.rgb[srcMode]([], src))
            : unsupported(`can't convert: ${srcMode} -> ${destMode}`);
};

/**
 * Maps a single linear RGB channel value to sRGB.
 *
 * {@link https://en.wikipedia.org/wiki/SRGB}
 *
 * @param x - channel value
 */
const linearSrgb = (x) => x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
/**
 * Maps a single linear sRGB channel value to linear RGB.
 *
 * {@link https://en.wikipedia.org/wiki/SRGB}
 *
 * @param x - channel value
 */
const srgbLinear = (x) => x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);

/**
 * Converts sRGB to linear RGB.
 *
 * @param out - result
 * @param src - source color
 */
const srgbRgb = (out, src) => setC4(out || src, srgbLinear(src[0]), srgbLinear(src[1]), srgbLinear(src[2]), ensureAlpha(src[3]));

const intArgb32Rgb = (out, src) => srgbRgb(null, intArgb32Srgb(out, src));
const intAbgr32Rgb = (out, src) => srgbRgb(null, intAbgr32Srgb(out, src));

/** @internal */
const ensureArgs = (args) => {
    if (typeof args[0] === "number") {
        switch (args.length) {
            case 1:
                return args.push(0, 0, 1), [args];
            case 2:
                return args.push(0, 1), [args];
            case 3:
                return args.push(1), [args];
            default:
                return [args];
        }
    }
    return args;
};

const defColor = (spec) => {
    const channels = spec.channels || {};
    const order = spec.order;
    const numChannels = order.length;
    order.reduce((acc, id) => {
        acc[id] = Object.assign({ range: [0, 1] }, channels[id]);
        return acc;
    }, channels);
    const min = order.map((id) => channels[id].range[0]);
    const max = order.map((id) => channels[id].range[1]);
    // fix alpha channel for randomize()
    const minR = set4([], min);
    const maxR = set4([], max);
    minR[numChannels - 1] = 1;
    const $Color = class {
        constructor(buf, offset = 0, stride = 1) {
            this.offset = offset;
            this.stride = stride;
            this.buf = buf || [0, 0, 0, 0];
            this.offset = offset;
            this.stride = stride;
        }
        get mode() {
            return spec.mode;
        }
        get length() {
            return numChannels;
        }
        get range() {
            return [min, max];
        }
        get [Symbol.toStringTag]() {
            return spec.mode;
        }
        [Symbol.iterator]() {
            return stridedValues(this.buf, this.length, this.offset, this.stride);
        }
        copy() {
            return new $Color(this.deref());
        }
        copyView() {
            return new $Color(this.buf, this.offset, this.stride);
        }
        empty() {
            return new $Color();
        }
        deref() {
            return [this[0], this[1], this[2], this[3]];
        }
        set(src) {
            return set4(this, src);
        }
        clamp() {
            return clamp4(null, this, min, max);
        }
        eqDelta(o, eps = EPS) {
            return eqDelta4(this, o, eps);
        }
        toJSON() {
            return this.deref();
        }
        randomize(rnd) {
            return randMinMax(this, minR, maxR, rnd);
        }
    };
    declareIndices($Color.prototype, order);
    defConversions(spec.mode, spec.from);
    const fromColor = (src, mode, xs) => {
        const res = new $Color(...xs);
        return mode !== spec.mode
            ? convert(res, src, spec.mode, mode)
            : res.set(src);
    };
    const factory = (src, ...xs) => src == null
        ? new $Color()
        : isString(src)
            ? factory(parseCss(src), ...xs)
            : isArrayLike(src)
                ? isString(src.mode)
                    ? fromColor(src, src.mode, xs)
                    : new $Color(src, ...xs)
                : implementsFunction(src, "deref")
                    ? fromColor(src.deref(), src.mode, xs)
                    : isNumber(src)
                        ? xs.length && xs.every(isNumber)
                            ? new $Color(...ensureArgs([src, ...xs]))
                            : fromColor(intArgb32Rgb([], src), "rgb", xs)
                        : illegalArgs(`can't create a ${spec.mode} color from: ${src}`);
    factory.class = $Color;
    factory.range = [min, max];
    factory.random = (rnd, buf, idx, stride) => new $Color(buf, idx, stride).randomize(rnd);
    factory.mapBuffer = (buf, num = (buf.length / numChannels) | 0, start = 0, cstride = 1, estride = numChannels) => mapStridedBuffer($Color, buf, num, start, cstride, estride);
    return factory;
};

const hcyRgb = (out, src) => {
    const h = src[0];
    let c = src[1];
    const y = src[2];
    const rgb = hueRgb(out || src, h, ensureAlpha(src[3]));
    const lum = luminanceRgb(rgb);
    if (y < lum) {
        c *= y / lum;
    }
    else if (lum < 1) {
        c *= (1 - y) / (1 - lum);
    }
    return setC3(rgb, clamp01((rgb[0] - lum) * c + y), clamp01((rgb[1] - lum) * c + y), clamp01((rgb[2] - lum) * c + y));
};

// https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSI
const hsiRgb = (out, src) => {
    out = clampH(out || src, src);
    const s = out[1];
    const i = out[2];
    if (s < 1e-6) {
        return setC3(out, i, i, i);
    }
    const h = (out[0] * 6) % 6;
    const m = i * (1 - s);
    const z = 1 - Math.abs((h % 2) - 1);
    let c = (3 * i * s) / (1 + z);
    const x = c * z + m;
    c += m;
    switch (h | 0) {
        case 0:
            return setC3(out, c, x, m);
        case 1:
            return setC3(out, x, c, m);
        case 2:
            return setC3(out, m, c, x);
        case 3:
            return setC3(out, m, x, c);
        case 4:
            return setC3(out, x, m, c);
        case 5:
            return setC3(out, c, m, x);
        default:
            return setC3(out, m, m, m);
    }
};

/**
 * Converts linear RGB to sRGB.
 *
 * @param out - result
 * @param src - source color
 */
const rgbSrgb = (out, src) => setC4(out || src, linearSrgb(src[0]), linearSrgb(src[1]), linearSrgb(src[2]), ensureAlpha(src[3]));

const mulV33 = (out, mat, src, clampOut = false) => {
    const x = dotS3(mat, src, 0, 0, 3);
    const y = dotS3(mat, src, 1, 0, 3);
    const z = dotS3(mat, src, 2, 0, 3);
    const a = ensureAlpha(src[3]);
    return clampOut
        ? setC4(out || src, clamp01(x), clamp01(y), clamp01(z), a)
        : setC4(out || src, x, y, z, a);
};

/**
 * Converts RGB to XYZ using provided transformation matrix (default:
 * {@link RGB_XYZ_D50}).
 *
 * {@link https://en.wikipedia.org/wiki/CIE_1931_color_space}
 *
 * @param out - result
 * @param src - source color
 * @param mat - transform matrix
 */
const rgbXyz = (out, src, mat = RGB_XYZ_D50) => mulV33(null, mat, clamp(out, src));

const transform = (x) => x > 0.00885645 ? Math.cbrt(x) : 7.787037 * x + 16 / 116;
/**
 * Converts XYZ to Lab, using provided reference white point (default:
 * {@link D50}). Also see {@link xyzLabD65}.
 *
 * @remarks
 * Important: We're using a normalized Lab space w/ all three coordinates
 * divided by 100 (normalized to 100% luminance).
 *
 * @param out
 * @param src
 * @param white
 */
const xyzLab = (out, src, white = D50) => {
    const x = transform(src[0] / white[0]);
    const y = transform(src[1] / white[1]);
    const z = transform(src[2] / white[2]);
    return setC4(out || src, 1.16 * y - 0.16, 5.0 * (x - y), 2.0 * (y - z), ensureAlpha(src[3]));
};

/**
 * Converts linear RGB to Lab (via XYZ) using {@link D50} white point.
 *
 * @remarks
 * Important: We're using a normalized Lab space w/ all three coordinates
 * divided by 100 (normalized to 100% luminance).
 *
 * @param out
 * @param src
 */
const rgbLab = (out, src) => xyzLab(null, rgbXyz(out, src));

const xyzXyzD65_50 = (out, src) => mulV33(out, BRADFORD_D65_D50, src);

const transform$1 = (x) => {
    const y = x ** 3;
    return y > 0.008856 ? y : (x - 16 / 116) / 7.787;
};
/**
 * Converts Lab to XYZ using provided white point (default: {@link D50}). Also
 * see {@link labXyzD65}.
 *
 * @param out
 * @param src
 * @param white
 */
const labXyz = (out, src, white = D50) => {
    const y = (src[0] + 0.16) / 1.16;
    return setC4(out || src, transform$1(src[1] / 5.0 + y) * white[0], transform$1(y) * white[1], transform$1(y - src[2] / 2.0) * white[2], ensureAlpha(src[3]));
};
/**
 * Same as {@link labXyz}, but using hardcoded {@link D65} white point.
 *
 * @param out
 * @param src
 */
const labXyzD65 = (out, src) => labXyz(out, src, D65);

const labLabD65_50 = (out, src) => xyzLab(out, xyzXyzD65_50(out, labXyzD65(out, src)));

const labLch = (out, src) => {
    const { 1: a, 2: b } = src;
    return setC4(out || src, src[0], Math.hypot(a, b), a === 0 && b === 0 ? 0 : atan2Abs(b, a) * INV_TAU, ensureAlpha(src[3]));
};
const lchLab = (out, src) => {
    let { 1: c, 2: h } = src;
    h *= TAU;
    const a = ensureAlpha(src[3]);
    return c > 0
        ? setC4(out || src, src[0], Math.cos(h) * c, Math.sin(h) * c, a)
        : setC4(out || src, src[0], 0, 0, a);
};

/**
 * Luminance Chroma Hue (conversions assume {@link D50} white point, as per CSS
 * spec).
 */
const lch = defColor({
    mode: "lch",
    channels: {
        c: { range: [0, 1.312] },
    },
    order: ["l", "c", "h", "alpha"],
    from: {
        rgb: (out, src) => labLch(null, rgbLab(out, src)),
        lab50: labLch,
        lab65: [labLabD65_50, labLch],
        xyz50: [xyzLab, labLch],
        xyz65: [xyzXyzD65_50, xyzLab, labLch],
    },
});

/**
 * Converts CIE XYZ to RGB using provided transformation/whitepoint matrix
 * (default: {@link XYZ_RGB_D50}).
 *
 * {@link https://en.wikipedia.org/wiki/CIE_1931_color_space}
 *
 * @param out - result
 * @param src - source color
 */
const xyzRgb = (out, src, mat = XYZ_RGB_D50) => mulV33(out, mat, src);
/**
 * Same as {@link xyzRgb}, but hard coded to use {@link D65} white point (via
 * {@link XYZ_RGB_D65} matrix).
 *
 * @param out
 * @param src
 */
const xyzRgbD65 = (out, src) => xyzRgb(out, src, XYZ_RGB_D65);

/**
 * Converts Lab to linear RGB (via XYZ) using {@link D50} white point.
 *
 * @param out
 * @param src
 */
const labRgb = (out, src) => xyzRgb(null, labXyz(out, src));
/**
 * Same as {@link labRgb}, but using {@link D65} white point.
 *
 * @param out
 * @param src
 */
const labRgbD65 = (out, src) => xyzRgbD65(null, labXyzD65(out, src));

const LMS_CONE = [
    4.0767245293,
    -1.2681437731,
    -0.0041119885,
    -3.3072168827,
    2.6093323231,
    -0.7034763098,
    0.2307590544,
    -0.341134429,
    1.7068625689,
];
/**
 * @remarks
 * Reference: https://bottosson.github.io/posts/oklab/
 *
 * @param out
 * @param src
 */
const oklabRgb = (out, { 0: l, 1: a, 2: b, 3: alpha }) => mulV33(out, LMS_CONE, [
    (l + 0.3963377774 * a + 0.2158037573 * b) ** 3,
    (l - 0.1055613458 * a - 0.0638541728 * b) ** 3,
    (l - 0.0894841775 * a - 1.291485548 * b) ** 3,
    alpha,
]);

/**
 * @remarks
 * https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_xy_chromaticity_diagram_and_the_CIE_xyY_color_space
 * https://gamedev.stackexchange.com/a/70049
 *
 * @param out
 * @param src
 */
const xyyXyz = (out, src) => {
    const { 0: x, 1: y, 2: Y } = src;
    return setC4(out || src, safeDiv(Y * x, y), Y, safeDiv(Y * (1 - x - y), y), ensureAlpha(src[3]));
};

/**
 * @remarks
 * https://en.wikipedia.org/wiki/YCbCr#YCbCr
 *
 * By default uses luminance weights as per BT.709 (aka
 * {@link RGB_LUMINANCE_REC709}):
 *
 * - https://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.709_conversion
 * - https://en.wikipedia.org/wiki/Rec._709
 *
 * @param out
 * @param src
 * @param luma
 */
const yccRgb = (out, src, luma = RGB_LUMINANCE_REC709) => {
    const y = src[0];
    const bb = (2 - 2 * luma[2]) * src[1];
    const rr = (2 - 2 * luma[0]) * src[2];
    return setC4(out || src, y + rr, y - (luma[2] / luma[1]) * bb - (luma[0] / luma[1]) * rr, y + bb, ensureAlpha(src[3]));
};

const rgb = defColor({
    mode: "rgb",
    order: ["r", "g", "b", "alpha"],
    from: {
        abgr32: (out, src) => intAbgr32Rgb(out, src[0]),
        argb32: (out, src) => intArgb32Rgb(out, src[0]),
        hcy: hcyRgb,
        hsi: hsiRgb,
        hsl: hslRgb,
        hsv: hsvRgb,
        lab50: labRgb,
        lab65: labRgbD65,
        lch: [lchLab, labRgb],
        oklab: oklabRgb,
        rgb: set4,
        srgb: srgbRgb,
        xyy: [xyyXyz, xyzRgbD65],
        xyz50: xyzRgb,
        xyz65: xyzRgbD65,
        ycc: yccRgb,
    },
});

const srgbCss = (src) => {
    const r = (clamp01(src[0]) * 0xff + 0.5) | 0;
    const g = (clamp01(src[1]) * 0xff + 0.5) | 0;
    const b = (clamp01(src[2]) * 0xff + 0.5) | 0;
    const a = ensureAlpha(src[3]);
    // TODO update to `rgb(${r} ${g} ${b}/${FF(a)})` (CSS L4 syntax)
    return a < 1
        ? `rgba(${r},${g},${b},${FF(a)})`
        : `#${U24$1((r << 16) | (g << 8) | b)}`;
};

const rgbCss = (src) => srgbCss(rgbSrgb([], src));

/**
 * Unique symbol used for registering a default / fallback
 * implementation.
 */
const DEFAULT = Symbol();
let LOGGER = NULL_LOGGER;

function defmulti(f, ancestors) {
    const impls = {};
    const rels = ancestors
        ? makeRels(ancestors)
        : {};
    const fn = (...args) => {
        const id = f(...args);
        const g = impls[id] || findImpl(impls, rels, id) || impls[DEFAULT];
        return g
            ? g(...args)
            : unsupported(`missing implementation for: "${id.toString()}"`);
    };
    fn.add = (id, g) => {
        if (impls[id]) {
            LOGGER.warn(`overwriting '${id.toString()}' impl`);
        }
        impls[id] = g;
        return true;
    };
    fn.addAll = (_impls) => {
        let ok = true;
        for (let id in _impls) {
            ok = fn.add(id, _impls[id]) && ok;
        }
        return ok;
    };
    fn.remove = (id) => {
        if (!impls[id])
            return false;
        delete impls[id];
        return true;
    };
    fn.callable = (...args) => {
        const id = f(...args);
        return !!(impls[id] ||
            findImpl(impls, rels, id) ||
            impls[DEFAULT]);
    };
    fn.isa = (id, parent) => {
        let val = rels[id];
        !val && (rels[id] = val = new Set());
        val.add(parent);
    };
    fn.impls = () => {
        const res = new Set(Object.keys(impls));
        for (let id in rels) {
            findImpl(impls, rels, id) && res.add(id);
        }
        impls[DEFAULT] && res.add(DEFAULT);
        return res;
    };
    fn.rels = () => rels;
    fn.parents = (id) => rels[id];
    fn.ancestors = (id) => new Set(findAncestors([], rels, id));
    fn.dependencies = function* () {
        for (let a in rels) {
            for (let b of rels[a])
                yield [a, b];
        }
        for (let id in impls) {
            !rels[id] && (yield [id, undefined]);
        }
    };
    return fn;
}
const findImpl = (impls, rels, id) => {
    const parents = rels[id];
    if (!parents)
        return;
    for (let p of parents) {
        let impl = impls[p] || findImpl(impls, rels, p);
        if (impl)
            return impl;
    }
};
const findAncestors = (acc, rels, id) => {
    const parents = rels[id];
    if (parents) {
        for (let p of parents) {
            acc.push(p);
            findAncestors(acc, rels, p);
        }
    }
    return acc;
};
const makeRels = (spec) => {
    const rels = {};
    for (let k in spec) {
        const val = spec[k];
        rels[k] = val instanceof Set ? val : new Set(val);
    }
    return rels;
};

/**
 * Returns the {@link Hue} constant of the closest of 12 defined hues.
 *
 * @param h - normalized hue
 */
const closestHue = (h) => Math.round(fract(h) * 12) % 12;
/**
 * Returns the {@link Hue} constant of the closest primary or secondary hue.
 *
 * @param h - normalized hue
 */
const closestPrimaryHue = (h) => closestHue(h) & 0xe;

const isBlackHsv = (x, eps = EPS$1) => x[2] <= eps;
const isBlackRgb = (x, eps = EPS$1) => x[0] <= eps && x[1] <= eps && x[2] <= eps;
const isBlackLch = (x, eps = EPS$1) => x[0] <= eps;
const isBlack = defmulti((x) => x.mode);
isBlack.addAll({
    hcy: isBlackHsv,
    hsi: isBlackHsv,
    hsl: isBlackHsv,
    hsv: isBlackHsv,
    labD50: isBlackLch,
    labD65: isBlackLch,
    lch: isBlackLch,
    rgb: isBlackRgb,
    ycc: isBlackRgb,
});
isBlack.add(DEFAULT, (x) => isBlackRgb(rgb(x)));

const isGrayHsv = (x, eps = EPS$1) => x[1] <= eps;
const isGrayRgb = (x, eps = EPS$1) => eqDelta(x[0], x[1], eps) && eqDelta(x[0], x[2], eps);
const isGrayLab = (x, eps = EPS$1) => eqDelta(x[1], 0, eps) && eqDelta(x[2], 0, eps);
const isGray = defmulti((x) => x.mode);
isGray.addAll({
    hcy: isGrayHsv,
    hsi: isGrayHsv,
    hsl: isGrayHsv,
    hsv: isGrayHsv,
    labD50: isGrayLab,
    labD65: isGrayLab,
    lch: isGrayHsv,
    rgb: isGrayRgb,
    srgb: isGrayRgb,
    ycc: isGrayLab,
});
isGray.add(DEFAULT, (x) => isGrayRgb(rgb(x)));

const isWhiteHsv = (x, eps = EPS$1) => x[1] <= eps && x[2] >= 1 - eps;
const isWhiteRgb = (x, eps = EPS$1) => {
    eps = 1 - eps;
    return x[0] >= eps && x[1] >= eps && x[2] >= eps;
};
const isWhiteLch = (x, eps = EPS$1) => x[1] <= eps && x[0] >= 1 - eps;
const isWhite = defmulti((x) => x.mode);
isWhite.addAll({
    hcy: (x, eps = EPS$1) => x[1] <= eps && x[2] >= 1 - eps,
    hsi: isWhiteHsv,
    hsl: isWhiteHsv,
    hsv: isWhiteHsv,
    labD50: isWhiteLch,
    labD65: isWhiteLch,
    lch: isWhiteLch,
    rgb: isWhiteRgb,
    ycc: isWhiteLch,
});
isWhite.add(DEFAULT, (x) => isWhiteRgb(rgb(x)));

/**
 * Preset {@link ColorRange}s for use with {@link colorsFromRange},
 * {@link colorsFromTheme} etc.
 */
const COLOR_RANGES = {
    light: {
        c: [[0.3, 0.7]],
        l: [[0.9, 1]],
        b: [[0.35, 0.5]],
        w: [[0.6, 1]],
    },
    dark: {
        c: [[0.7, 1]],
        l: [[0.15, 0.4]],
        b: [[0, 0.4]],
        w: [[0.4, 0.6]],
    },
    bright: {
        c: [[0.75, 0.95]],
        l: [[0.8, 1]],
    },
    weak: {
        c: [[0.15, 0.3]],
        l: [[0.7, 1]],
        b: [[0.4, 0.6]],
        w: [[0.8, 1]],
    },
    neutral: {
        c: [[0.25, 0.35]],
        l: [[0.3, 0.7]],
        b: [[0.25, 0.4]],
        w: [[0.9, 1]],
    },
    fresh: {
        c: [[0.4, 0.8]],
        l: [[0.8, 1]],
        b: [[0.05, 0.3]],
        w: [[0.8, 1]],
    },
    soft: {
        c: [[0.2, 0.3]],
        l: [[0.6, 0.9]],
        b: [[0.05, 0.15]],
        w: [[0.6, 0.9]],
    },
    hard: {
        c: [[0.85, 0.95]],
        l: [[0.4, 1]],
    },
    warm: {
        c: [[0.6, 0.9]],
        l: [[0.4, 0.9]],
        b: [[0.2, 0.3]],
        w: [[0.8, 1]],
    },
    cool: {
        c: [[0.05, 0.2]],
        l: [[0.9, 1]],
        b: [[0, 0.95]],
        w: [[0.95, 1]],
    },
    intense: {
        c: [[0.9, 1]],
        l: [
            [0.2, 0.35],
            [0.8, 1],
        ],
    },
};
const FULL = [[0, 1]];
const DEFAULT_RANGE = {
    h: FULL,
    c: FULL,
    l: FULL,
    b: FULL,
    w: FULL,
    a: [[1, 1]],
};
const DEFAULT_OPTS = {
    num: Infinity,
    variance: 0.025,
    eps: 1e-3,
    rnd: SYSTEM,
};
const $rnd = (ranges, rnd) => rnd.minmax(...ranges[rnd.int() % ranges.length]);
/**
 * Takes a {@link ColorRange} and options to produce a single new result color.
 * This color is randomized within the channel limits of the given `range`
 * descriptor. If a `base` color is provided (via {@link ColorRangeOpts}), its
 * hue is used as bias and the `variance` option defines the max. -/+ normalized
 * hue shift of the result color.
 *
 * @remarks
 * If the base color is a shade of gray (incl. black & white), the result will
 * be another gray and is based on the range's black and white point sub-ranges.
 *
 * The alpha channel of the result color will only be randomized (based on
 * `range.a` settings) iff no `base` color was provided. If `base` is given, the
 * result will used the same alpha.
 *
 * A custom PRNG can be defined via the `rnd` option (default: `Math.random`).
 *
 * @param range
 * @param opts
 */
const colorFromRange = (range, opts) => {
    range = Object.assign(Object.assign({}, DEFAULT_RANGE), (isString(range) ? COLOR_RANGES[range] : range));
    const { base, variance, rnd, eps } = Object.assign(Object.assign({}, DEFAULT_OPTS), opts);
    let h;
    let c;
    let l;
    let a;
    if (base) {
        const col = lch(base);
        h = col[2];
        a = ensureAlpha(col[3]);
        if (isBlack(col, eps)) {
            c = 0;
            l = $rnd(range.b, rnd);
        }
        else if (isWhite(col, eps)) {
            c = 0;
            l = $rnd(range.w, rnd);
        }
        else if (isGray(col, eps)) {
            c = 0;
            l = $rnd(coin(rnd) ? range.b : range.w, rnd);
        }
        else {
            h = fract(h + rnd.norm(variance));
        }
    }
    else {
        h = $rnd(range.h, rnd);
        a = $rnd(range.a, rnd);
    }
    return lch([
        l != undefined ? l : $rnd(range.l, rnd),
        c !== undefined ? c : $rnd(range.c, rnd),
        h,
        a,
    ]);
};
/**
 * Generator version of {@link colorFromRange}, by default yielding an infinite
 * sequence of random colors based on given range, base color (optional) and
 * other opts. Use `num` option to limit number of results.
 *
 * @param range
 * @param opts
 */
function* colorsFromRange(range, opts = {}) {
    let num = opts.num != undefined ? opts.num : Infinity;
    while (--num >= 0)
        yield colorFromRange(range, opts);
}

/**
 * Multi-method to compute relative luminance from any supported input color
 * format.
 *
 * @remarks
 * For many color spaces, the luminance information is readily available and
 * will simply result in looking up the relevant channel value. For others,
 * unless a direct implementation is available, colors will first be converted
 * to linear RGB.
 */
const luminance = defmulti((col) => col.mode);
luminance.addAll({
    argb32: luminanceArgb32,
    abgr32: luminanceAbgr32,
    hcy: (x) => x[2],
    lab: (x) => x[0],
    rgb: luminanceRgb,
    srgb: luminanceSrgb,
    xyz: (x) => x[1],
});
luminance.isa("lch", "lab");
luminance.isa("oklab", "lab");
luminance.isa("ycc", "lab");
luminance.isa("xyy", "hcy");
luminance.add(DEFAULT, (x) => luminanceRgb(rgb(x)));

export { COLOR_RANGES, closestHue, closestPrimaryHue, colorsFromRange, labRgb, luminance, oklabRgb, rgbCss };
