import { d as defTarget } from './target-6ab9d31f.js';
import { s as sym, b as itemType } from './item-0dc2ff74.js';
import { u as unsupported } from './unsupported-d467609e.js';
import { i as isVec, a as isMat } from './deferror-f4141613.js';
import { i as isNumber } from './is-number-dd4646bb.js';
import { i as isBoolean } from './is-boolean-6acf0f42.js';

var GLSLVersion;
(function (GLSLVersion) {
    GLSLVersion["GLES_100"] = "100";
    GLSLVersion["GLES_300"] = "300 es";
})(GLSLVersion || (GLSLVersion = {}));

const RE_SEMI = /[};]$/;
/**
 * GLSL code gen, targets GLSL ES 3.00 (WebGL2) by default.
 *
 * Use options object to configure shader type and GLSL version: `100`
 * for WebGL, 300 for WebGL2. Currently, the only differences in terms
 * of code generation, not correctness, are:
 *
 * - attribute, varying, uniform declarations
 * - texture lookup function naming
 *
 * Unsupported features in GLSL 100:
 *
 * - Fragment shader output vars
 *
 * @param opts -
 */
const targetGLSL = (opts) => {
    const _opts = Object.assign({ type: "fs", version: GLSLVersion.GLES_300, versionPragma: true, prelude: "" }, opts);
    const isVS = _opts.type === "vs";
    // TODO update once we have struct support
    const $type = (t) => t;
    const $list = (body, sep = ", ") => body.map(emit).join(sep);
    const $fn = (t) => `${t.id}(${$list(t.args)})`;
    const $decl = (sym, arg = false) => {
        const { id, type, opts, init } = sym;
        const res = [];
        if (opts.type) {
            let type;
            if (_opts.version < GLSLVersion.GLES_300) {
                if (isVS) {
                    type = {
                        in: "attribute",
                        out: "varying",
                        uni: "uniform",
                    }[opts.type];
                }
                else {
                    type = {
                        in: "varying",
                        out: null,
                        uni: "uniform",
                    }[opts.type];
                    !type &&
                        unsupported("GLSL 100 doesn't support fragment shader output variables");
                }
            }
            else {
                opts.loc != null && res.push(`layout(location=${opts.loc}) `);
                opts.smooth != null && res.push(opts.smooth + " ");
                type = opts.type === "uni" ? "uniform" : opts.type;
            }
            res.push(type + " ");
        }
        else {
            opts.const && res.push("const ");
            arg && opts.q && res.push(opts.q + " ");
        }
        opts.prec && res.push(opts.prec + " ");
        res.push($type(itemType(type)), " ", id);
        opts.num && res.push(`[${opts.num}]`);
        init && res.push(" = ", emit(init));
        return res.join("");
    };
    const emit = defTarget({
        arg: (t) => $decl(t, true),
        array_init: (t) => _opts.version >= GLSLVersion.GLES_300
            ? `${t.type}(${$list(t.init)})`
            : unsupported(`array initializers not available in GLSL ${_opts.version}`),
        assign: (t) => emit(t.l) + " = " + emit(t.r),
        ctrl: (t) => t.id,
        call: $fn,
        call_i: (t) => t.id === "texture" && _opts.version < GLSLVersion.GLES_300
            ? `${t.id}${t.args[0].type.substr(7)}(${$list(t.args)})`
            : $fn(t),
        decl: (t) => $decl(t.id),
        fn: (t) => `${$type(t.type)} ${t.id}(${$list(t.args)}) ${emit(t.scope)}`,
        for: (t) => `for(${t.init ? emit(t.init) : ""}; ${emit(t.test)}; ${t.iter ? emit(t.iter) : ""}) ${emit(t.scope)}`,
        idx: (t) => `${emit(t.val)}[${emit(t.id)}]`,
        if: (t) => {
            const res = `if (${emit(t.test)}) ` + emit(t.t);
            return t.f ? res + " else " + emit(t.f) : res;
        },
        lit: (t) => {
            const v = t.val;
            switch (t.type) {
                case "bool":
                    return isBoolean(v) ? String(v) : `bool(${emit(v)})`;
                case "float":
                    return isNumber(v)
                        ? v === Math.trunc(v)
                            ? v + ".0"
                            : String(v)
                        : `float(${emit(v)})`;
                case "int":
                case "uint":
                    return isNumber(v) ? String(v) : `${t.type}(${emit(v)})`;
                default: {
                    if (isVec(t) || isMat(t)) {
                        return `${t.type}(${$list(v)})`;
                    }
                    return unsupported(`unknown type: ${t.type}`);
                }
            }
        },
        op1: (t) => t.post ? `(${emit(t.val)}${t.op})` : `(${t.op}${emit(t.val)})`,
        op2: (t) => `(${emit(t.l)} ${t.op} ${emit(t.r)})`,
        ret: (t) => "return" + (t.val ? " " + emit(t.val) : ""),
        scope: (t) => {
            let res = t.body
                .map(emit)
                .reduce((acc, x) => (acc.push(RE_SEMI.test(x) ? x : x + ";"), acc), [])
                .join("\n");
            res += t.body.length && !RE_SEMI.test(res) ? ";" : "";
            if (!t.global) {
                return `{\n${res}\n}`;
            }
            if (_opts.prelude) {
                res = _opts.prelude + "\n" + res;
            }
            if (_opts.versionPragma) {
                res = `#version ${_opts.version}\n` + res;
            }
            return res;
        },
        swizzle: (t) => `${emit(t.val)}.${t.id}`,
        sym: (t) => t.id,
        ternary: (t) => `(${emit(t.test)} ? ${emit(t.t)} : ${emit(t.f)})`,
        while: (t) => `while (${emit(t.test)}) ${emit(t.scope)}`,
    });
    Object.assign(emit, {
        gl_FragColor: sym("vec4", "gl_FragColor"),
        gl_FragCoord: sym("vec4", "gl_FragCoord", { const: true }),
        gl_FragData: sym("vec4[]", "gl_FragData", { num: 1 }),
        gl_FrontFacing: sym("bool", "gl_FrontFacing", { const: true }),
        gl_PointCoord: sym("vec2", "gl_PointCoord", { const: true }),
        gl_PointSize: sym("float", "gl_PointSize"),
        gl_Position: sym("vec4", "gl_Position"),
    });
    return emit;
};

export { GLSLVersion as G, targetGLSL as t };
