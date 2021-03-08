import { r as rgbHcv, a as rgbHsv, h as hsvRgb, l as luminanceRgb, C as CSS_NAMES, p as parseCss, b as hslRgb } from '../common/hsv-rgb-82fd963f.js';
import { E as EPS } from '../common/api-37d17bdb.js';
import { m as mul4 } from '../common/mul-ed648689.js';
import { c as clamp4 } from '../common/clamp-bf64be6a.js';
import { a as add4 } from '../common/add-24a0ae37.js';
import '../common/is-string-40d6c094.js';
import '../common/_node-resolve:empty-5550de3c.js';
import '../common/map-ab3a157d.js';
import '../common/implements-function-c507affc.js';
import '../common/deferror-480a42fb.js';
import '../common/unsupported-d467609e.js';
import '../common/interval-eabb0a00.js';
import '../common/dot-bdae3efe.js';
import '../common/codegen-6bdfa5cb.js';
import '../common/comp-b69ffdf6.js';
import '../common/range-90bff8dc.js';
import '../common/illegal-arguments-f9331715.js';

const rgbHsl = (out, src) => {
    out = rgbHcv(out, src);
    out[2] -= out[1] * 0.5;
    out[1] /= 1 + EPS - Math.abs(out[2] * 2 - 1);
    return out;
};

/**
 * Calculate the complementary color using RGB space ( rather than RYB )
 * @param out
 * @param rgba
 */
const complement = (rgba) => {
    const hsva = rgbHsv([], rgba);
    hsva[0] = hsva[0] + (0.5 % 1);
    return hsvRgb([], hsva);
};
// https://openaccess.thecvf.com/content_cvpr_2017/papers/Nguyen_Why_You_Should_CVPR_2017_paper.pdf
// https://www.accessibility-developer-guide.com/knowledge/colours-and-contrast/how-to-calculate/
// Using different luminance coefficients
// Except seems to adjust for gamma correction
// As : https://contrast-ratio.com
const RGB_LUMINANCE_2 = [0.2126, 0.7152, 0.0722];
/**
 * Calculate the contrast ratio between colors.
 * version 2 with alternative coefficients ( 0.2126, 0.7152, 0.0722 )
 * @param col1
 * @param col2
 * @param colorMode
 */
const contrastRatio2 = (col1, col2) => {
    const lum1 = luminanceRgb(col1, RGB_LUMINANCE_2);
    const lum2 = luminanceRgb(col2, RGB_LUMINANCE_2);
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};
/**
 * Attempt to find the closest colors to the supplied min and max ranges.
 * @param min
 * @param max
 * @param color
 */
// export const findLuminanceRange = (
//   min: number,
//   max: number,
//   color: Color
// ) => {};
/**
 * Return the nearest color with the given luminance to the supplied color.
 * @param targetLum
 * @param color
 */
// export const findNearestColorLuminance = (
//   targetLum: number,
//   color: Color
// ): Color => {
//   // supplied color t V ( hsva ) & luminance
//   // THIS KIND OF WORKS -
//   const hsv = rgbaHsva([], color);
//   const lumC = luminanceRGB(color, RGB_LUMINANCE_2);
//   const ratio = targetLum / lumC;
//   return hsvaRgba([], [hsv[0], hsv[1], hsv[2] * ratio, hsv[3]]);
//   // return
//   // const resLum = luminanceRGB(res, RGB_LUMINANCE_2);
//   // console.log("NEAREST LUM :RES ", res, resLum, targetLum);
// };
// const near = (val: number, min: number, max: number) => {
//   if (val > min && val < max) {
//     return true;
//   } else {
//     return false;
//   }
// };
// take a color.
// create a complement rotation... with an optional min max offset.
// Luminance balance.
// Normalise/Limit 2 colours ( or number of colours? ) to an overall sum luminance
// Can the same be done to reduce or increase a contrast ratio?
// distribution. create a numner of additional colours as tints/adjustments of provided base colours.
// supply a 'percentage split' i.e. 60, 30,10 rule

const filterContrastRatio2 = (colors, min, max) => colors.filter(([color1, color2]) => {
    const contrast = contrastRatio2(color1, color2);
    return contrast > min && contrast < max;
});

/**
 * Css named colors as rgba. Losing name info.
 */
const paletteCssNames = () => Object.keys(CSS_NAMES).map((name) => parseCss(name).deref());
/**
 * Generate the complementary colors for all colors
 * @param colors
 */
const paletteComplement = (colors) => colors.map((color) => [color, complement(color)]);
/**
 * Generate a decent foreground and background base color from a given color.
 * @param color
 */
const paletteForegroundBackground = (color, opts) => {
    const { saturation = [1, 1], invert = false, clamp = [0.1, 0.9] } = opts || {};
    const hsl = rgbHsl([], color);
    const bg = [hsl[0], hsl[1] * saturation[0], clamp[0], hsl[3]];
    const fg = [hsl[0], hsl[1] * saturation[1], clamp[1], hsl[3]];
    const res = [hslRgb(null, bg), hslRgb(null, fg)];
    if (invert) {
        return [res[1], res[0]];
    }
    else {
        return res;
    }
};
/**
 * Generate a range of shadows for the given color.
 * The input color's lightness is scaled by a given amount and then a
 * gradient is generated given + / - the specified range from the scaled lightness.
 *
 * TODO: Modularise / resue the step function and;
 * TODO: Potentially use a different method than scale. Which works for colors closer to the upper/lower lightness threshold
 * TODO: Add some noise factor to introduce variation between gradient or introduce saturation shifts.
 */
/**
 * @param color
 * @param opts
 */
const paletteColorRangeHSL = (color, opts = {}) => {
    const { steps = 5, scale = 1, range = 0.5, saturation = 1, clamp = [0, 1], } = opts;
    const hsl1 = rgbHsl([], color);
    const mid = mul4([], hsl1, [1, saturation, scale, 1]);
    const min = clamp4(null, add4([], mid, [0, 0, -range, 0]), [0, 0, clamp[0], 0], [1, 1, clamp[1], 1]);
    const max = clamp4(null, add4([], mid, [0, 0, +range, 0]), [0, 0, clamp[0], 0], [1, 1, clamp[1], 1]);
    const res = [];
    const step = (max[2] - min[2]) / (steps - 1);
    // Take only the lightness component and step.
    for (let i = 0; i < steps; i++) {
        const l = step * i;
        res.push(hslRgb([], [mid[0], mid[1], l + min[2], mid[3]]));
    }
    return res;
};

export { complement, contrastRatio2, filterContrastRatio2, paletteColorRangeHSL, paletteComplement, paletteCssNames, paletteForegroundBackground };
