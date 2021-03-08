import { a as defHofOp } from './codegen-6bdfa5cb.js';
import { n as normalize } from './normalize-a82f17ef.js';
import { S as SYSTEM } from './system-2f58b569.js';

/**
 * Sets `v` to random vector, with each component in interval `[n..m)`.
 * If no `rnd` instance is given, uses {@link @thi.ng/random#SYSTEM},
 * i.e. `Math.random`.
 * Creates new vector if `v` is null.
 *
 * @param v -
 * @param n - default -1
 * @param m - default 1
 * @param rnd -
 */
const [random, random2, random3, random4] = defHofOp(SYSTEM, ([a]) => `${a}=rnd.minmax(n,m);`, "a,n=-1,m=1,rnd=op", "a", "a", 0, "!a && (a=[]);");
/**
 * Sets `v` to random vector, normalized to length `n` (default: 1). If
 * no `rnd` instance is given, uses {@link @thi.ng/random#SYSTEM}, i.e.
 * `Math.random`.
 *
 * @param v -
 * @param n -
 * @param rnd -
 */
const randNorm = (v, n = 1, rnd = SYSTEM) => normalize((v = random(v, -1, 1, rnd)), v, n);
/**
 * Sets `out` to random vector with each component in the semi-open
 * interval defined by [min,max).
 *
 * @param out -
 * @param min -
 * @param max -
 * @param rnd -
 */
const [randMinMax, randMinMax2, randMinMax3, randMinMax4] = defHofOp(SYSTEM, ([o, a, b]) => `${o}=rnd.minmax(${a},${b});`, "o,a,b,rnd=op", "o,a,b");

export { randNorm as a, random as b, randMinMax as r };
