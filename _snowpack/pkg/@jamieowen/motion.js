import { c as createParticle, f as forceStream, p as particleStream, a as forceFriction } from '../common/particle-376379e6.js';
export { D as DEFAULT_CLOCK, P as Particle, T as Transform, e as clock, c as createParticle, b as createTransform, a as forceFriction, g as forceGravity, f as forceStream, l as limitVelocityN, d as motionParticle, m as motionTransform, p as particleStream, u as updateParticle } from '../common/particle-376379e6.js';
import { f as filter } from '../common/filter-75019789.js';
import { s as set3 } from '../common/set-260c7c36.js';
import { e as ensureTransducer, p as push, a as isReduced, m as map } from '../common/map-ab3a157d.js';
import { s as subscription } from '../common/subscription-a6e19b11.js';
import { s as sideEffect } from '../common/side-effect-4102843c.js';
import { r as reactive } from '../common/stream-6698d67f.js';
import { s as sync } from '../common/stream-sync-5cd19a97.js';
import { c as comp } from '../common/comp-b69ffdf6.js';
import { s as sub3 } from '../common/dist-ed974f7e.js';
import { b as add3 } from '../common/add-24a0ae37.js';
import '../common/raf-2533ce82.js';
import '../common/is-node-e2ac186a.js';
import '../common/_node-resolve:empty-5550de3c.js';
import '../common/muln-5d44e24a.js';
import '../common/codegen-6bdfa5cb.js';
import '../common/unsupported-d467609e.js';
import '../common/deferror-480a42fb.js';
import '../common/range-90bff8dc.js';
import '../common/interval-eabb0a00.js';
import '../common/implements-function-c507affc.js';
import '../common/logger-b9e6479b.js';
import '../common/is-plain-object-24968a48.js';
import '../common/is-array-a7fa88fb.js';
import '../common/distsq-6316f3e1.js';

/**
 * Single-step transducer execution wrapper.
 * Returns array if transducer produces multiple results
 * and undefined if there was no output. Else returns single
 * result value.
 *
 * @remarks
 * Likewise, once a transducer has produced a final / reduced
 * value, all further invocations of the stepper function will
 * return undefined.
 *
 * @example
 * ```ts
 * // single result
 * step(map(x => x * 10))(1);
 * // 10
 *
 * // multiple results
 * step(mapcat(x => [x, x + 1, x + 2]))(1)
 * // [ 1, 2, 3 ]
 *
 * // no result
 * f = step(filter((x) => !(x & 1)))
 * f(1); // undefined
 * f(2); // 2
 *
 * // reduced value termination
 * f = step(take(2));
 * f(1); // 1
 * f(1); // 1
 * f(1); // undefined
 * f(1); // undefined
 * ```
 *
 * @param tx -
 */
const step = (tx) => {
    const { 1: complete, 2: reduce } = ensureTransducer(tx)(push());
    let done = false;
    return (x) => {
        if (!done) {
            let acc = reduce([], x);
            done = isReduced(acc);
            if (done) {
                acc = complete(acc.deref());
            }
            return acc.length === 1 ? acc[0] : acc.length > 0 ? acc : undefined;
        }
    };
};

/**
 *
 * Invalidate against a single value,
 * Returning a simple true/false.
 *
 * @param isInvalid
 * @param init
 */
const invalidate = (isInvalid, init // not sure if an init value is needed?
) => {
    let last = init;
    return filter((x) => {
        if (isInvalid(last, x) || last === undefined) {
            last = x;
            return false;
        }
        else {
            last = x;
            return true;
        }
    });
};
const invalidatePosition = () => {
    let prev = [];
    return filter((x) => {
        const changed = x.data.position[0] !== prev[0] ||
            x.data.position[1] !== prev[1] ||
            x.data.position[2] !== prev[2];
        if (changed) {
            set3(prev, x.data.position);
        }
        return changed;
    });
};
const invalidatePositionThreshold = (threshold = 0.01) => {
    let prev = [];
    return filter((x) => {
        const curr = x.data.position;
        const changed = (curr[0] > prev[0] + threshold && curr[0] < prev[0] - threshold) ||
            (curr[1] > prev[1] + threshold && curr[1] < prev[1] - threshold) ||
            (curr[2] > prev[2] + threshold && curr[2] < prev[2] - threshold);
        if (changed) {
            set3(prev, x.data.position);
        }
        return changed;
    });
};

const mapPosition = (fn) => map((ev) => (fn(ev.clock.time, ev.data.position), ev));

// export class Trails extends Subscription<
//   IMotionEvent<"transform">,
//   IMotionEvent<"transform-array">
// > {
//   trails: ITransform[] = [];
//   emit: boolean = false;
//   constructor(public length: number, public emitWhenFull: boolean = true) {
//     super(undefined, {
//       xform: sideEffect(() => console.log("trail")),
//     });
//     this.trails = [];
//   }
//   next(ev: IMotionEvent<"transform">) {
//     if (this.trails.length < this.length) {
//       this.trails.unshift(createTransform());
//     } else {
//       const last = this.trails.pop();
//       this.trails.unshift(last);
//     }
//     const input = ev.data;
//     const transform = this.trails[0];
//     set3(transform.position, input.position);
//     if (this.emitWhenFull && this.trails.length >= this.length) {
//       this.dispatch({
//         type: "transform-array",
//         data: this.trails,
//         clock: ev.clock,
//       });
//     } else {
//     }
//   }
//   error(err: Error) {
//     console.log("Err", err);
//   }
// }
// export const trails = (length: number) => new Trails(length);
/**
 *
 * Trails 2
 *
 */
const pushHistory = (length) => {
    const history = [];
    return (ev) => {
        if (history.length < length) {
            history.unshift(createParticle());
        }
        else {
            const last = history.pop();
            history.unshift(last);
        }
        const input = ev.data;
        const transform = history[0];
        set3(transform.position, input.position);
        return Object.assign(Object.assign({}, ev), { type: "particle-array", data: history });
    };
};
const particleTrails = (length) => {
    const xform = map(pushHistory(length));
    return subscription({
        next: () => { },
        error: (err) => {
            throw err;
        },
    }, { xform });
};

function backInOut(t) {
    const s = 1.70158 * 1.525;
    if ((t *= 2) < 1)
        return 0.5 * (t * t * ((s + 1) * t - s));
    return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}

function backIn(t) {
    const s = 1.70158;
    return t * t * ((s + 1) * t - s);
}

function backOut(t) {
    const s = 1.70158;
    return --t * t * ((s + 1) * t + s) + 1;
}

function bounceOut(t) {
    const a = 4.0 / 11.0;
    const b = 8.0 / 11.0;
    const c = 9.0 / 10.0;
    const ca = 4356.0 / 361.0;
    const cb = 35442.0 / 1805.0;
    const cc = 16061.0 / 1805.0;
    const t2 = t * t;
    return t < a
        ? 7.5625 * t2
        : t < b
            ? 9.075 * t2 - 9.9 * t + 3.4
            : t < c
                ? ca * t2 - cb * t + cc
                : 10.8 * t * t - 20.52 * t + 10.72;
}

function bounceInOut(t) {
    return t < 0.5
        ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
        : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}

function bounceIn(t) {
    return 1.0 - bounceOut(1.0 - t);
}

function circInOut(t) {
    if ((t *= 2) < 1)
        return -0.5 * (Math.sqrt(1 - t * t) - 1);
    return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
}

function circIn(t) {
    return 1.0 - Math.sqrt(1.0 - t * t);
}

function circOut(t) {
    return Math.sqrt(1 - --t * t);
}

function cubicInOut(t) {
    return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
}

function cubicIn(t) {
    return t * t * t;
}

function cubicOut(t) {
    var f = t - 1.0;
    return f * f * f + 1.0;
}

function elasticInOut(t) {
    return t < 0.5
        ? 0.5 *
            Math.sin(((+13.0 * Math.PI) / 2) * 2.0 * t) *
            Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
        : 0.5 *
            Math.sin(((-13.0 * Math.PI) / 2) * (2.0 * t - 1.0 + 1.0)) *
            Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) +
            1.0;
}

function elasticIn(t) {
    return Math.sin((13.0 * t * Math.PI) / 2) * Math.pow(2.0, 10.0 * (t - 1.0));
}

function elasticOut(t) {
    return (Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -10.0 * t) + 1.0);
}

function expoInOut(t) {
    return t === 0.0 || t === 1.0
        ? t
        : t < 0.5
            ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0)
            : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
}

function expoIn(t) {
    return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
}

function expoOut(t) {
    return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
}

function linear(t) {
    return t;
}

function quadInOut(t) {
    t /= 0.5;
    if (t < 1)
        return 0.5 * t * t;
    t--;
    return -0.5 * (t * (t - 2) - 1);
}

function quadIn(t) {
    return t * t;
}

function quadOut(t) {
    return -t * (t - 2.0);
}

function quartInOut(t) {
    return t < 0.5
        ? +8.0 * Math.pow(t, 4.0)
        : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
}

function quartIn(t) {
    return Math.pow(t, 4.0);
}

function quartOut(t) {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}

function quintInOut(t) {
    if ((t *= 2) < 1)
        return 0.5 * t * t * t * t * t;
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
}

function quintIn(t) {
    return t * t * t * t * t;
}

function quintOut(t) {
    return --t * t * t * t * t + 1;
}

function sineInOut(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
}

function sineIn(t) {
    var v = Math.cos(t * Math.PI * 0.5);
    if (Math.abs(v) < 1e-14)
        return 1;
    else
        return 1 - v;
}

function sineOut(t) {
    return Math.sin((t * Math.PI) / 2);
}

const EaseTypes = {
    backIn,
    backInOut,
    backOut,
    bounceIn,
    bounceInOut,
    bounceOut,
    circIn,
    circInOut,
    circOut,
    cubicIn,
    cubicInOut,
    cubicOut,
    elasticIn,
    elasticInOut,
    elasticOut,
    expoIn,
    expoInOut,
    expoOut,
    linear,
    quadIn,
    quadInOut,
    quadOut,
    quartIn,
    quartInOut,
    quartOut,
    quintIn,
    quintInOut,
    quintOut,
    sineIn,
    sineInOut,
    sineOut,
};

const particleIterator = (opts) => {
    let apply = step(opts.xform);
    let tmp = {
        type: "particle",
        data: null,
        clock: null,
    };
    return subscription({
        next: () => { },
        error: (err) => {
            throw err;
        },
    }, {
        // Apply given transducer to each particle in array.
        xform: sideEffect((ev) => {
            tmp.clock = ev.clock;
            for (let i = 0; i < ev.data.length; i++) {
                tmp.data = ev.data[i];
                apply(tmp);
            }
        }),
    });
};

const dragGesture2d = (gesture$, opts = {}) => {
    const { maxSpeed = 100, friction = 0.09, initialPosition = [0, 0, 0] } = opts;
    // gesture position
    let translate;
    let delta;
    let start;
    let previous;
    // particle position
    let particleStart;
    let isDragging = false;
    let time = 0;
    let threshold = 0.005;
    const [force$, setForces] = forceStream([], []);
    const particle$ = particleStream(force$, reactive({ maxSpeed, threshold }));
    const frictionF = forceFriction(friction);
    set3(particle$.deref().data.position, initialPosition);
    let lastp = null;
    return sync({
        src: {
            particle: particle$,
            gesture: gesture$,
        },
        xform: comp(filter(({ gesture, particle }) => {
            const pchanged = particle !== lastp;
            lastp = particle;
            return (gesture.type !== "move" && gesture.type !== "zoom") || pchanged;
        }), map(({ gesture, particle }) => {
            switch (gesture.type) {
                case "start":
                    start = [...gesture.pos, 0]; // adapt to 3d particle
                    previous = start;
                    translate = [0, 0, 0]; // difference between start and end
                    delta = [0, 0, 0]; // difference between frame
                    isDragging = true;
                    particleStart = [...particle.data.position]; // vec3 particle
                    time = Date.now();
                    break;
                case "end":
                    // gesture will remain in stream buffer until removed.
                    // so test event end
                    if (isDragging) {
                        isDragging = false;
                        setForces([frictionF], [() => delta]);
                    }
                    break;
                case "drag":
                    const pos = [...gesture.pos, 0];
                    translate = sub3([], pos, start);
                    const now = Date.now();
                    // calc delta with time offset since previous pos
                    if (now - time > 25) {
                        delta = sub3([], pos, previous);
                        previous = pos;
                        time = now;
                    }
                    set3(particle.data.position, add3([], particleStart, translate));
                    break;
            }
            return {
                gesture,
                particle,
            };
        })),
    });
};

export { EaseTypes, backIn, backInOut, backOut, bounceIn, bounceInOut, bounceOut, circIn, circInOut, circOut, cubicIn, cubicInOut, cubicOut, dragGesture2d, elasticIn, elasticInOut, elasticOut, expoIn, expoInOut, expoOut, invalidate, invalidatePosition, invalidatePositionThreshold, linear, mapPosition, particleIterator, particleTrails, quadIn, quadInOut, quadOut, quartIn, quartInOut, quartOut, quintIn, quintInOut, quintOut, sineIn, sineInOut, sineOut };
