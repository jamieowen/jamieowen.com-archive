import { i as isVec } from './deferror-f4141613.js';
import { i as builtinCall } from './swizzle-b9f66e93.js';
import { c as illegalArgs } from './item-0dc2ff74.js';

const texRetType = (sampler) => {
    const t = sampler.type[0];
    const shadow = sampler.type.indexOf("Shadow") > 0;
    return t === "s"
        ? shadow
            ? "float"
            : "vec4"
        : t === "i"
            ? shadow
                ? "int"
                : "ivec4"
            : t === "u"
                ? shadow
                    ? "uint"
                    : "uvec4"
                : illegalArgs(`unknown sampler type ${sampler.type}`);
};
const $call = (name, sampler, args, bias) => {
    const f = bias
        ? builtinCall(name, texRetType(sampler), sampler, ...args, bias)
        : builtinCall(name, texRetType(sampler), sampler, ...args);
    !isVec(f) && (f.info = "n");
    return f;
};
// prettier-ignore
function texture(sampler, uv, bias) {
    return $call("texture", sampler, [uv], bias);
}

export { texture as t };
