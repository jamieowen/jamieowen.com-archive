import { a as defHofOp, A as ARGS_VVV, F as FN3 } from './codegen-6bdfa5cb.js';
import { c as clamp$1, a as clamp01, b as clamp11 } from './interval-eabb0a00.js';

const setC2 = (out, x, y) => (!out && (out = []), (out[0] = x), (out[1] = y), out);
const setC3 = (out, x, y, z) => (!out && (out = []), (out[0] = x), (out[1] = y), (out[2] = z), out);
const setC4 = (out, x, y, z, w) => (!out && (out = []),
    (out[0] = x),
    (out[1] = y),
    (out[2] = z),
    (out[3] = w),
    out);
const setC6 = (out, a, b, c, d, e, f) => (!out && (out = []),
    (out[0] = a),
    (out[1] = b),
    (out[2] = c),
    (out[3] = d),
    (out[4] = e),
    (out[5] = f),
    out);
const setC = (out, ...xs) => {
    !out && (out = []);
    for (let i = 0, n = xs.length; i < n; i++) {
        out[i] = xs[i];
    }
    return out;
};

const [clamp, clamp2, clamp3, clamp4] = defHofOp(clamp$1, FN3(), ARGS_VVV);
defHofOp(clamp01, FN3(), ARGS_VVV);
defHofOp(clamp11, FN3(), ARGS_VVV);

export { setC3 as a, setC as b, clamp4 as c, setC2 as d, setC6 as e, clamp2 as f, clamp3 as g, setC4 as s };
