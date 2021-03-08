import { v as vop, c as compileG, b as compile } from './codegen-6bdfa5cb.js';

const tpl = ([a, b]) => `t=${a}-${b};s+=t*t;`;
const pre = "let t,s=0;";
const $ = (dim) => distSq.add(dim, compile(dim, tpl, "a,b", undefined, "s", "", pre));
const distSq = vop();
distSq.default(compileG(tpl, "a,b", undefined, "s", pre));
$(2);
const distSq3 = $(3);
$(4);

export { distSq3 as a, distSq as d };
