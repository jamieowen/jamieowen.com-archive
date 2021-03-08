import { b as compile, i as SARGS_V, e as DOT } from './codegen-6bdfa5cb.js';

const $ = (dim) => compile(dim, DOT, `o,a,${SARGS_V}`, "o,a", "", "+", "return ", ";", true);
const dotS2 = $(2);
const dotS3 = $(3);
const dotS4 = $(4);

export { dotS2 as a, dotS4 as b, dotS3 as d };
