import { a as clamp01 } from '../common/interval-eabb0a00.js';

const fit01 = (x, a, b) => a + (b - a) * clamp01(x);

export { fit01 };
