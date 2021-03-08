import { T as TAU, R as RAD2DEG, D as DEG2RAD } from './api-37d17bdb.js';

/**
 * Projects `theta` into [0 .. 2π] interval.
 *
 * @param theta -
 */
const absTheta = (theta) => ((theta %= TAU), theta < 0 ? TAU + theta : theta);
/**
 * Like `Math.atan2`, but always returns angle in [0 .. TAU) interval.
 *
 * @param y -
 * @param x -
 */
const atan2Abs = (y, x) => absTheta(Math.atan2(y, x));
/**
 * Converts angle to degrees.
 *
 * @param theta - angle in radians
 */
const deg = (theta) => theta * RAD2DEG;
/**
 * Converts angle to radians.
 *
 * @param theta - angle in degrees
 */
const rad = (theta) => theta * DEG2RAD;

export { atan2Abs as a, deg as d, rad as r };
