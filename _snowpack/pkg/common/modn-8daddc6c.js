import { a as setC3 } from './clamp-bf64be6a.js';
import { g as defMathOpN } from './codegen-6bdfa5cb.js';

const cross3 = (out, a, b) => setC3(out || a, a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]);

const [modN, modN2, modN3, modN4] = defMathOpN("%");

export { modN3 as a, modN4 as b, cross3 as c, modN2 as m };
