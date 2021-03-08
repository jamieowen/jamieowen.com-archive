import { s as setC4, a as setC3 } from './clamp-bf64be6a.js';
import { i as isString } from './is-string-40d6c094.js';
import { p as process } from './_node-resolve:empty-5550de3c.js';
import { N as NO_OP } from './map-ab3a157d.js';
import { u as unsupported } from './unsupported-d467609e.js';
import { a as clamp01 } from './interval-eabb0a00.js';
import { f as fract, d as dot3 } from './dot-bdae3efe.js';
import { T as TAU, E as EPS$1 } from './api-37d17bdb.js';
import { i as illegalArgs } from './illegal-arguments-f9331715.js';

/**
 * Takes a `test` result or predicate function without args and throws
 * error with given `msg` if test failed (i.e. is falsy).
 *
 * @remarks
 * The function is only enabled if `"production" != "production"`
 * or if the `UMBRELLA_ASSERTS` env var is set to 1.
 */
const assert = (() => {
    try {
        return ("production" !== "production" ||
            process.env.UMBRELLA_ASSERTS === "1");
    }
    catch (e) { }
    return false;
})()
    ? (test, msg = "assertion failed") => {
        if ((typeof test === "function" && !test()) || !test) {
            throw new Error(typeof msg === "function" ? msg() : msg);
        }
    }
    : NO_OP;

/**
 * Repeats lowest nibble of `x` as 24 bit uint.
 *
 * @param x -
 */
/**
 * Expands 3x4bit value like `0xabc` to 24bits: `0xaabbcc`
 *
 * @param x
 */
const interleave4_12_24 = (x) => ((x & 0xf00) * 0x1100) | ((x & 0xf0) * 0x110) | ((x & 0xf) * 0x11);
/**
 * Expands 4x4bit value like `0xabcd` to 32bits: `0xaabbccdd`
 *
 * @param x
 */
const interleave4_16_32 = (x) => (((x & 0xf000) * 0x11000) |
    ((x & 0xf00) * 0x1100) |
    ((x & 0xf0) * 0x110) |
    ((x & 0xf) * 0x11)) >>>
    0;

/**
 * Hue names in radial order, e.g. used by {@link namedHueRgb}.
 */
var Hue;
(function (Hue) {
    Hue[Hue["RED"] = 0] = "RED";
    Hue[Hue["ORANGE"] = 1] = "ORANGE";
    Hue[Hue["YELLOW"] = 2] = "YELLOW";
    Hue[Hue["CHARTREUSE"] = 3] = "CHARTREUSE";
    Hue[Hue["GREEN"] = 4] = "GREEN";
    Hue[Hue["SPRING_GREEN"] = 5] = "SPRING_GREEN";
    Hue[Hue["CYAN"] = 6] = "CYAN";
    Hue[Hue["AZURE"] = 7] = "AZURE";
    Hue[Hue["BLUE"] = 8] = "BLUE";
    Hue[Hue["VIOLET"] = 9] = "VIOLET";
    Hue[Hue["MAGENTA"] = 10] = "MAGENTA";
    Hue[Hue["ROSE"] = 11] = "ROSE";
})(Hue || (Hue = {}));
/**
 * Result type returned by {@link parseCss}, a simple wrapper for a raw color
 * array and color mode.
 */
class ParsedColor {
    constructor(mode, value) {
        this.mode = mode;
        this.value = value;
    }
    deref() {
        return this.value;
    }
}

function memoizeJ(fn, cache) {
    !cache && (cache = {});
    return (...args) => {
        const key = JSON.stringify(args);
        if (key !== undefined) {
            return key in cache
                ? cache[key]
                : (cache[key] = fn.apply(null, args));
        }
        return fn.apply(null, args);
    };
}

/**
 * @param ch - character
 * @param n - repeat count
 */
const repeat = memoizeJ((ch, n) => ch.repeat(n));

/**
 * @param n - target length
 * @param ch - pad character(s)
 */
const padLeft = memoizeJ((n, ch = " ") => {
    const buf = repeat(String(ch), n);
    return (x, len) => {
        if (x == null)
            return buf;
        x = x.toString();
        len = len !== undefined ? len : x.length;
        return len < n ? buf.substr(len) + x : x;
    };
});
/**
 * Zero-padded 2 digit formatter.
 */
padLeft(2, "0");
/**
 * Zero-padded 3 digit formatter.
 */
padLeft(3, "0");
/**
 * Zero-padded 4 digit formatter.
 */
padLeft(4, "0");

/**
 * Returns {@link Stringer} which formats numbers to given precision. If
 * `special` is true, then exceptional handling for:
 *
 * - NaN => "NaN"
 * - Infinity => "+/-∞"
 *
 * @param len - number of fractional digits
 * @param special - true, if special handling for NaN/Infinity values
 */
const float = memoizeJ((prec, special = false) => special
    ? (x) => nanOrInf(x) || x.toFixed(prec)
    : (x) => x.toFixed(prec));
/**
 * Similar to `float`, returns {@link Stringer} which formats numbers to given
 * character width & precision. Uses scientific notation if needed.
 *
 * Default precision: 3 fractional digits
 */
memoizeJ((width, prec = 3) => {
    const l = width - prec - 1;
    const pl = Math.pow(10, l);
    const pln = -Math.pow(10, l - 1);
    const pr = Math.pow(10, -(prec - 1));
    const pad = padLeft(width);
    return (x) => {
        const ax = Math.abs(x);
        return pad(nanOrInf(x) ||
            (x === 0
                ? "0"
                : ax < pr || ax >= pl
                    ? exp(x, width)
                    : x.toFixed(prec - (x < pln ? 1 : 0))));
    };
});
const exp = (x, w) => x.toExponential(Math.max(w -
    4 -
    (Math.log(Math.abs(x)) / Math.LN10 >= 10 ? 2 : 1) -
    (x < 0 ? 1 : 0), 0));
const nanOrInf = (x) => isNaN(x)
    ? "NaN"
    : x === Infinity
        ? "+∞"
        : x === -Infinity
            ? "-∞"
            : undefined;

/**
 * RGB black
 */
Object.freeze([0, 0, 0, 1]);
/**
 * RGB white
 */
Object.freeze([1, 1, 1, 1]);
/**
 * RGB red
 */
Object.freeze([1, 0, 0, 1]);
/**
 * RGB green
 */
Object.freeze([0, 1, 0, 1]);
/**
 * RGB blue
 */
Object.freeze([0, 0, 1, 1]);
/**
 * RGB cyan
 */
Object.freeze([0, 1, 1, 1]);
/**
 * RGB magenta
 */
Object.freeze([1, 0, 1, 1]);
/**
 * RGB yellow
 */
Object.freeze([1, 1, 0, 1]);
/**
 * ITU-R BT.601 RGB luminance coeffs
 *
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.601_conversion
 */
const RGB_LUMINANCE_REC601 = [0.299, 0.587, 0.114];
/**
 * ITU-R BT.709 RGB luminance coeffs
 *
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.709_conversion
 */
const RGB_LUMINANCE_REC709 = [0.2126, 0.7152, 0.0722];
/**
 * sRGB to XYZ D65 conversion matrix
 *
 * @remarks
 * Reference:
 * http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */
const RGB_XYZ_D50 = [
    0.4360747,
    0.2225045,
    0.0139322,
    0.3850649,
    0.7168786,
    0.0971045,
    0.1430804,
    0.0606169,
    0.7141733,
];
/**
 * XYZ D50 to sRGB conversion matrix
 *
 * @remarks
 * Reference:
 * http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */
const XYZ_RGB_D50 = [
    3.1338561,
    -0.9787684,
    0.0719453,
    -1.6168667,
    1.9161415,
    -0.2289914,
    -0.4906146,
    0.033454,
    1.4052427,
];
/**
 * XYZ D65 to sRGB conversion matrix
 *
 * @remarks
 * Reference:
 * http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */
const XYZ_RGB_D65 = [
    3.2404542,
    -0.969266,
    0.0556434,
    -1.5371385,
    1.8760108,
    -0.2040259,
    -0.4985314,
    0.041556,
    1.0572252,
];
/**
 * D65 -> D50 chromatic adaptation matrix. Inverse of {@link BRADFORD_D50_D65}.
 *
 * @remarks
 * Reference:
 * http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html
 */
const BRADFORD_D65_D50 = [
    1.0478112,
    0.0295424,
    -0.0092345,
    0.0228866,
    0.9904844,
    0.0150436,
    -0.050127,
    -0.0170491,
    0.7521316,
];
/**
 * CIE Standard Illuminant D50
 */
const D50 = [0.96422, 1, 0.82521];
/**
 * CIE Standard Illuminant D65
 *
 * Reference:
 * https://en.wikipedia.org/wiki/Illuminant_D65
 */
const D65 = [0.95047, 1, 1.08883];
/**
 * Float value formatter
 *
 * @internal
 */
let FF = float(3);
const INV8BIT = 1 / 0xff;
const EPS = 1 / 256;

const CSS_NAMES = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    grey: "808080",
    green: "008000",
    greenyellow: "adff2f",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32",
    // additions
    transparent: "0000",
    rebeccapurple: "639",
};

/**
 * Default CSS system colors used by {@link parseCss}. Use
 * {@link setSystemColors} to provide custom defaults.
 */
let CSS_SYSTEM_COLORS = {
    canvas: "fff",
    canvastext: "000",
    linktext: "001ee4",
    visitedtext: "4e2386",
    activetext: "eb3323",
    buttonface: "ddd",
    buttontext: "000",
    buttonborder: "000",
    field: "fff",
    fieldtext: "000",
    highlight: "bbd5fb",
    highlighttext: "000",
    mark: "000",
    marktext: "fff",
    graytext: "808080",
};

const intArgb32Srgb = (out, src) => setC4(out || [], ((src >>> 16) & 0xff) * INV8BIT, ((src >>> 8) & 0xff) * INV8BIT, (src & 0xff) * INV8BIT, (src >>> 24) * INV8BIT);
const intAbgr32Srgb = (out, src) => setC4(out || [], (src & 0xff) * INV8BIT, ((src >>> 8) & 0xff) * INV8BIT, ((src >>> 16) & 0xff) * INV8BIT, (src >>> 24) * INV8BIT);

/**
 * Attempts to parse given CSS color into an interim {@link ParsedColor} type
 * with {@link srgb}, {@link hsl}, {@link labD50} or {@link lch} color modes.
 * Throws an error if any of the validations during parsing failed.
 *
 * @remarks
 * The following syntax versions are supported:
 *
 * - CSS named colors
 * - CSS system colors @see {@link CSS_SYSTEM_COLORS}
 * - hex3/4/6/8
 * - `rgb(r% g% b% / a%?)`
 * - `rgb(r g b / a?)`
 * - `rgb(r,g,b)`
 * - `rgba(r,g,b,a)`
 * - `hsl(h s% l% / a%?)`
 * - `hsl(h,s%,l%)`
 * - `hsla(h,s%,l%,a)`
 * - `lab(l a b / alpha?)`
 * - `lch(l c h / alpha?)`
 *
 * Hue values can be given according to CSS Color L4 spec (raw, deg, rad, grad,
 * turn): https://www.w3.org/TR/css-color-4/#typedef-hue
 *
 * If no alpha channel is given, it will default to 1.0 (fully opaque).
 *
 * Note that any named or system CSS colors, hex colors and any RGB colors will
 * be returned as sRGB instance. In former versions of this library (pre 3.0.0),
 * there was only a single RGB type with undefined behaviour re: linear or
 * gamma-encoded versions. Since v3.0.0, {@link rgb} is only used for _linear_
 * and {@link srgb} for non-linear (gamma encoded) RGB colors (CSS uses sRGB by
 * default).
 *
 * @param src
 */
const parseCss = (src) => {
    src = (isString(src) ? src : src.deref()).toLowerCase();
    const named = CSS_NAMES[src] || CSS_SYSTEM_COLORS[src];
    if (named || src[0] === "#")
        return new ParsedColor("srgb", intArgb32Srgb([], parseHex(named || src)));
    const parts = src.split(/[(),/ ]+/);
    const [mode, a, b, c, d] = parts;
    assert(parts.length === 5 || parts.length === 6, `invalid ${mode} color: ${src}`);
    switch (mode) {
        case "rgb":
        case "rgba":
            return new ParsedColor("srgb", [
                parseNumOrPercent(a),
                parseNumOrPercent(b),
                parseNumOrPercent(c),
                parseAlpha(d),
            ]);
        case "hsl":
        case "hsla":
            return new ParsedColor("hsl", [
                parseHue(a),
                parsePercent(b),
                parsePercent(c),
                parseAlpha(d),
            ]);
        case "lab":
            return new ParsedColor("lab50", [
                parsePercent(a, false),
                parseNumber(b) * 0.01,
                parseNumber(c) * 0.01,
                parseAlpha(d),
            ]);
        case "lch":
            return new ParsedColor("lch", [
                parsePercent(a, false),
                parseNumber(b) * 0.01,
                parseHue(c),
                parseAlpha(d),
            ]);
        default:
            unsupported(`color mode: ${mode}`);
    }
};
const HUE_NORMS = {
    rad: TAU,
    grad: 400,
    turn: 1,
    deg: 360,
    undefined: 360,
};
const parseHue = (x) => {
    const match = /^(-?[0-9.]+)(deg|rad|grad|turn)?$/.exec(x);
    assert(!!match, `expected hue, got: ${x}`);
    return fract(parseFloat(match[1]) / HUE_NORMS[match[2]]);
};
const parseAlpha = (x) => (x ? parseNumOrPercent(x, 1) : 1);
const parsePercent = (x, clamp = true) => {
    assert(/^([0-9.]+)%$/.test(x), `expected percentage, got: ${x}`);
    const res = parseFloat(x) / 100;
    return clamp ? clamp01(res) : res;
};
const parseNumber = (x) => {
    assert(/^-?[0-9.]+$/.test(x), `expected number, got: ${x}`);
    return parseFloat(x);
};
const parseNumOrPercent = (x, norm = 255, clamp = true) => {
    assert(/^-?[0-9.]+%?$/.test(x), `expected number or percentage, got: ${x}`);
    const res = parseFloat(x) / (x.endsWith("%") ? 100 : norm);
    return clamp ? clamp01(res) : res;
};
const parseHex = (src) => {
    const match = /^#?([0-9a-f]{3,8})$/i.exec(src);
    if (match) {
        const hex = match[1];
        switch (hex.length) {
            case 3:
                return ((interleave4_12_24(parseInt(hex, 16)) | 0xff000000) >>> 0);
            case 4:
                return interleave4_16_32(parseInt(hex, 16)) >>> 0;
            case 6:
                return (parseInt(hex, 16) | 0xff000000) >>> 0;
            case 8:
                return parseInt(hex, 16) >>> 0;
        }
    }
    return illegalArgs(`invalid hex color: "${src}"`);
};

const ensureAlpha = (x, def = 1) => x != undefined ? clamp01(x) : def;

/**
 * Converts a normalized hue to RGBA with given optional `alpha`
 * value (default: 1).
 *
 * @param out - result
 * @param hue - normalized hue
 */
const hueRgb = (out, hue, alpha = 1) => {
    hue = fract(hue) * 6;
    return setC4(out || [], clamp01(Math.abs(hue - 3) - 1), clamp01(2 - Math.abs(hue - 2)), clamp01(2 - Math.abs(hue - 4)), alpha);
};
const namedHueRgb = (out, hue, alpha = 1) => hueRgb(out, hue / 12, alpha);

/**
 * Computes RGB luminance, optionally using provided weights (by default:
 * {@link RGB_LUMINANCE_REC709}).
 *
 * @param rgb
 * @param weights
 */
const luminanceRgb = (rgb, weights = RGB_LUMINANCE_REC709) => dot3(rgb, weights);
/**
 * Similar to {@link luminanceRgb}, but uses {@link RGB_LUMINANCE_REC601} coeffs
 */
const luminanceSrgb = (rgb) => dot3(rgb, RGB_LUMINANCE_REC601);
const luminanceIntArgb32 = (rgb) => (((rgb >>> 16) & 0xff) * 76 +
    ((rgb >>> 8) & 0xff) * 150 +
    (rgb & 0xff) * 29) /
    0xfe01;
const luminanceIntAbgr32 = (rgb) => (((rgb >>> 16) & 0xff) * 29 +
    ((rgb >>> 8) & 0xff) * 150 +
    (rgb & 0xff) * 76) /
    0xfe01;
const luminanceArgb32 = (argb) => luminanceIntArgb32(argb[0]);
const luminanceAbgr32 = (argb) => luminanceIntAbgr32(argb[0]);

/**
 * Clamps all color channels to [0,1] interval and calls `ensureAlpha`
 * to ensure alpha channel is defined (if missing sets it to `alpha`,
 * default: 1).
 *
 * @param out - result
 * @param src - source color
 * @param alpha - alpha value
 */
const clamp = (out, src, alpha = 1) => setC4(out || src, clamp01(src[0]), clamp01(src[1]), clamp01(src[2]), ensureAlpha(src[3], alpha));
/**
 * Similar to {@link clamp}, but calls `ensureHue` to fold (instead of
 * clamping) the hue into [0,1] interval.
 *
 * @param out - result
 * @param src - source color
 * @param alpha - alpha value
 */
const clampH = (out, src, alpha = 1) => setC4(out || src, fract(src[0]), clamp01(src[1]), clamp01(src[2]), ensureAlpha(src[3], alpha));

/**
 * Based on:
 * {@link https://github.com/tobspr/GLSL-Color-Spaces/blob/develop/ColorSpaces.inc.glsl#L159}
 *
 * @param out - result
 * @param src - source color
 */
const rgbHcv = (out, src) => {
    out = clamp(out || src, src);
    const p = out[1] < out[2]
        ? [out[2], out[1], -1, 2 / 3]
        : [out[1], out[2], 0, -1 / 3];
    const q = out[0] < p[0] ? [p[0], p[1], p[3], out[0]] : [out[0], p[1], p[2], p[0]];
    const c = q[0] - Math.min(q[1], q[3]);
    return setC3(out, clamp01(Math.abs((q[3] - q[1]) / (6 * c + EPS$1) + q[2])), clamp01(c), clamp01(q[0]));
};

const rgbHsv = (out, src) => {
    out = rgbHcv(out, src);
    out[1] /= out[2] + EPS$1;
    return out;
};

const hslRgb = (out, src) => {
    const s = clamp01(src[1]);
    const l = clamp01(src[2]);
    out = hueRgb(out || src, src[0], ensureAlpha(src[3]));
    const c = (1 - Math.abs(2 * l - 1)) * s;
    return setC3(out, (out[0] - 0.5) * c + l, (out[1] - 0.5) * c + l, (out[2] - 0.5) * c + l);
};

const hsvRgb = (out, src) => {
    out = clampH(out || src, src);
    const s = out[1];
    const v = out[2];
    hueRgb(out, src[0], out[3]);
    return setC3(out, ((out[0] - 1) * s + 1) * v, ((out[1] - 1) * s + 1) * v, ((out[2] - 1) * s + 1) * v);
};

export { BRADFORD_D65_D50 as B, CSS_NAMES as C, D50 as D, EPS as E, FF as F, RGB_XYZ_D50 as R, XYZ_RGB_D50 as X, rgbHsv as a, hslRgb as b, repeat as c, assert as d, ensureAlpha as e, intAbgr32Srgb as f, hueRgb as g, hsvRgb as h, intArgb32Srgb as i, clampH as j, clamp as k, luminanceRgb as l, memoizeJ as m, D65 as n, XYZ_RGB_D65 as o, parseCss as p, RGB_LUMINANCE_REC709 as q, rgbHcv as r, luminanceArgb32 as s, luminanceAbgr32 as t, luminanceSrgb as u, namedHueRgb as v };
