export { S as Stream, r as reactive, s as stream } from '../common/stream-6698d67f.js';
export { s as sync } from '../common/stream-sync-5cd19a97.js';
export { s as subscription } from '../common/subscription-a6e19b11.js';
export { f as fromRAF } from '../common/raf-2533ce82.js';
import '../common/map-ab3a157d.js';
import '../common/implements-function-c507affc.js';
import '../common/deferror-480a42fb.js';
import '../common/is-array-a7fa88fb.js';
import '../common/comp-b69ffdf6.js';
import '../common/logger-b9e6479b.js';
import '../common/is-plain-object-24968a48.js';
import '../common/is-node-e2ac186a.js';
import '../common/_node-resolve:empty-5550de3c.js';

/**
 * Helper {@link ISubscriber} for inspection / debugging purposes.
 * Simply logs received values to console, optionally with given
 * `prefix`.
 *
 * @param prefix -
 */
const trace = (prefix) => ({
    next(x) {
        prefix ? console.log(prefix, x) : console.log(x);
    },
    done() {
        prefix ? console.log(prefix, "done") : console.log("done");
    },
    error(e) {
        prefix ? console.log(prefix, "error", e) : console.log("error", e);
    },
});

export { trace };
