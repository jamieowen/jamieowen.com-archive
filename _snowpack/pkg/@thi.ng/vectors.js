export { b as add3 } from '../common/add-24a0ae37.js';
export { c as cross3, a as modN3 } from '../common/modn-8daddc6c.js';
export { c as dist, d as dist3, s as sub3 } from '../common/dist-ed974f7e.js';
import { b as set } from '../common/set-260c7c36.js';
export { s as set3 } from '../common/set-260c7c36.js';
import { i as implementsFunction } from '../common/implements-function-c507affc.js';
import { d as dotS3 } from '../common/dots-43396d16.js';
import { I as defOpS, N as NEW_OUT, i as SARGS_V, S as SET, u as ARGS_V, y as ARGS_VN, H as MATH_N } from '../common/codegen-6bdfa5cb.js';
import { E as EPS } from '../common/api-37d17bdb.js';
import { a as setC3 } from '../common/clamp-bf64be6a.js';
export { g as clamp3 } from '../common/clamp-bf64be6a.js';
export { n as normalize } from '../common/normalize-a82f17ef.js';
import '../common/distsq-6316f3e1.js';
import '../common/unsupported-d467609e.js';
import '../common/deferror-480a42fb.js';
import '../common/map-ab3a157d.js';
import '../common/comp-b69ffdf6.js';
import '../common/range-90bff8dc.js';
import '../common/interval-eabb0a00.js';
import '../common/muln-5d44e24a.js';

const [setS2, setS3, setS4] = defOpS(SET, `o,a,${SARGS_V}`, "o,a", "o", NEW_OUT);

const copy = (v) => implementsFunction(v, "copy") ? v.copy() : set([], v);

const magS3 = (a, ia, sa) => Math.sqrt(dotS3(a, a, ia, ia, sa, sa));

const [mulNS2, mulNS3, mulNS4] = defOpS(MATH_N("*"), `${ARGS_VN},${SARGS_V}`, ARGS_V);

/**
 * Normalizes vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param n -
 */
const normalizeS3 = (out, v, n = 1, io = 0, ia = 0, so = 1, sa = 1) => {
    !out && (out = v);
    const m = magS3(v, ia, sa);
    return m >= EPS
        ? mulNS3(out, v, n / m, io, ia, so, sa)
        : out !== v
            ? setS3(out, v, io, ia, so, sa)
            : out;
};

const rotateAroundAxis3 = (out, v, axis, theta) => {
    const x = v[0];
    const y = v[1];
    const z = v[2];
    const ax = axis[0];
    const ay = axis[1];
    const az = axis[2];
    const ux = ax * x;
    const uy = ax * y;
    const uz = ax * z;
    const vx = ay * x;
    const vy = ay * y;
    const vz = ay * z;
    const wx = az * x;
    const wy = az * y;
    const wz = az * z;
    const uvw = ux + vy + wz;
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return setC3(out || v, ax * uvw +
        (x * (ay * ay + az * az) - ax * (vy + wz)) * c +
        (-wy + vz) * s, ay * uvw +
        (y * (ax * ax + az * az) - ay * (ux + wz)) * c +
        (wx - uz) * s, az * uvw +
        (z * (ax * ax + ay * ay) - az * (ux + vy)) * c +
        (-vx + uy) * s);
};

export { copy, normalizeS3, rotateAroundAxis3 };
