import { S as Stream } from '../common/stream-6698d67f.js';
import { S as SYSTEM } from '../common/system-2f58b569.js';
export { g as gestureStream } from '../common/gesture-stream-dcb76ce0.js';
import '../common/subscription-a6e19b11.js';
import '../common/logger-b9e6479b.js';
import '../common/map-ab3a157d.js';
import '../common/implements-function-c507affc.js';
import '../common/deferror-480a42fb.js';
import '../common/is-plain-object-24968a48.js';
import '../common/comp-b69ffdf6.js';
import '../common/interval-eabb0a00.js';
import '../common/event-358f6fc3.js';
import '../common/is-boolean-6acf0f42.js';

class TimerStream extends Stream {
    constructor(params) {
        super({});
        this.running = false;
        this.repeat = Infinity;
        this.count = 0;
        const { repeat = Infinity, frequency = 100, autoStart = true } = params;
        this.repeat = repeat;
        if (typeof frequency === "function") {
            this.getFrequency = frequency;
        }
        else {
            this.getFrequency = () => frequency;
        }
        if (autoStart) {
            this.start();
        }
    }
    start() {
        if (!this.running) {
            this.running = true;
            this.count = 0;
            this.currentTime = 0;
            this.tick(0, this.getFrequency(), false);
        }
    }
    stop() {
        if (this.running) {
            clearTimeout(this.intervalID);
            this.running = false;
        }
    }
    // TODO : Check repeat count, currently a couple more inc;iding start event.
    tick(delta, next, last) {
        this.next({
            time: this.currentTime,
            delta,
            next,
            last,
        });
        if (last) {
            this.stop();
        }
        else {
            this.intervalID = setTimeout(() => {
                this.count++;
                this.currentTime += next;
                const last = this.count > this.repeat;
                const nextTime = last ? 0 : this.getFrequency();
                this.tick(next, nextTime, last);
            }, next);
        }
    }
}
const timerStream = (params) => new TimerStream(params);
const timerStreamRandomFrequency = (params = {}) => {
    const { min = 100, max = 300, step = 50, rand = SYSTEM } = params;
    return () => {
        const time = rand.minmax(min, max);
        return Math.round(time / step) * step;
    };
};

export { timerStream, timerStreamRandomFrequency };
