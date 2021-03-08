import { o as scope } from './swizzle-b9f66e93.js';

const ifThen = (test, truthy, falsey) => ({
    tag: "if",
    type: "void",
    test,
    t: scope(truthy),
    f: falsey ? scope(falsey) : undefined,
});

export { ifThen as i };
