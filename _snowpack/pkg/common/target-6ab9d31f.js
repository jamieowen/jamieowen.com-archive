import { d as defError } from './deferror-f4141613.js';

var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["FINE"] = 0] = "FINE";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["SEVERE"] = 4] = "SEVERE";
    LogLevel[LogLevel["NONE"] = 5] = "NONE";
})(LogLevel || (LogLevel = {}));

const NULL_LOGGER = Object.freeze({
    level: LogLevel.NONE,
    fine() { },
    debug() { },
    info() { },
    warn() { },
    severe() { },
});

const UnsupportedOperationError = defError(() => "unsupported operation");
const unsupported = (msg) => {
    throw new UnsupportedOperationError(msg);
};

/**
 * Unique symbol used for registering a default / fallback
 * implementation.
 */
const DEFAULT = Symbol();
let LOGGER = NULL_LOGGER;

function defmulti(f, ancestors) {
    const impls = {};
    const rels = ancestors
        ? makeRels(ancestors)
        : {};
    const fn = (...args) => {
        const id = f(...args);
        const g = impls[id] || findImpl(impls, rels, id) || impls[DEFAULT];
        return g
            ? g(...args)
            : unsupported(`missing implementation for: "${id.toString()}"`);
    };
    fn.add = (id, g) => {
        if (impls[id]) {
            LOGGER.warn(`overwriting '${id.toString()}' impl`);
        }
        impls[id] = g;
        return true;
    };
    fn.addAll = (_impls) => {
        let ok = true;
        for (let id in _impls) {
            ok = fn.add(id, _impls[id]) && ok;
        }
        return ok;
    };
    fn.remove = (id) => {
        if (!impls[id])
            return false;
        delete impls[id];
        return true;
    };
    fn.callable = (...args) => {
        const id = f(...args);
        return !!(impls[id] ||
            findImpl(impls, rels, id) ||
            impls[DEFAULT]);
    };
    fn.isa = (id, parent) => {
        let val = rels[id];
        !val && (rels[id] = val = new Set());
        val.add(parent);
    };
    fn.impls = () => {
        const res = new Set(Object.keys(impls));
        for (let id in rels) {
            findImpl(impls, rels, id) && res.add(id);
        }
        impls[DEFAULT] && res.add(DEFAULT);
        return res;
    };
    fn.rels = () => rels;
    fn.parents = (id) => rels[id];
    fn.ancestors = (id) => new Set(findAncestors([], rels, id));
    fn.dependencies = function* () {
        for (let a in rels) {
            for (let b of rels[a])
                yield [a, b];
        }
        for (let id in impls) {
            !rels[id] && (yield [id, undefined]);
        }
    };
    return fn;
}
const findImpl = (impls, rels, id) => {
    const parents = rels[id];
    if (!parents)
        return;
    for (let p of parents) {
        let impl = impls[p] || findImpl(impls, rels, p);
        if (impl)
            return impl;
    }
};
const findAncestors = (acc, rels, id) => {
    const parents = rels[id];
    if (parents) {
        for (let p of parents) {
            acc.push(p);
            findAncestors(acc, rels, p);
        }
    }
    return acc;
};
const makeRels = (spec) => {
    const rels = {};
    for (let k in spec) {
        const val = spec[k];
        rels[k] = val instanceof Set ? val : new Set(val);
    }
    return rels;
};

/**
 * Takes an object of code generator functions and returns a new code
 * generator / compile target function which serializes a given AST
 * using the provided node type implementations.
 *
 * {@link @thi.ng/shader-ast-glsl#targetGLSL}
 *
 * @param impls -
 */
const defTarget = (impls) => {
    const emit = defmulti((x) => x.tag);
    emit.add(DEFAULT, (t) => unsupported(`no impl for AST node type: '${t.tag}'`));
    emit.addAll(impls);
    return emit;
};

export { defTarget as d };
