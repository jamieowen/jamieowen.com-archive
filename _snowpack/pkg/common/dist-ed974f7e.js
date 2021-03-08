import { d as defMathOp } from './codegen-6bdfa5cb.js';
import { d as distSq, a as distSq3 } from './distsq-6316f3e1.js';

const [sub, sub2, sub3, sub4] = defMathOp("-");

const dist = (a, b) => Math.sqrt(distSq(a, b));
const dist3 = (a, b) => Math.sqrt(distSq3(a, b));

export { sub4 as a, sub as b, dist as c, dist3 as d, sub2 as e, sub3 as s };
