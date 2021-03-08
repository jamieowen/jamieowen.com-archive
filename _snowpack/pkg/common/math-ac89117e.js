import { i as builtinCall } from './swizzle-b9f66e93.js';

const primOp1 = (name) => (a) => builtinCall(name, a.type, a);
const primOp2 = (name) => (a, b) => builtinCall(name, a.type, a, b);
/**
 * Returns dot product of given vectors.
 *
 * @param a -
 * @param b -
 */
const dot = (a, b) => builtinCall("dot", "float", a, b);
const min = primOp2("min");
const max = primOp2("max");
const step = primOp2("step");
const abs = primOp1("abs");
const floor = primOp1("floor");
function mod(a, b) {
    const f = builtinCall("mod", a.type, a, b);
    b.type === "float" && (f.info = "n");
    return f;
}

export { min as a, max as b, abs as c, dot as d, floor as f, mod as m, step as s };
