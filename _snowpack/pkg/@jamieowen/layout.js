import { s as sync } from '../common/stream-sync-5cd19a97.js';
import { m as map, f as iterator } from '../common/map-ab3a157d.js';
import { r as range2d } from '../common/range2d-1c91cf24.js';
import { c as comp } from '../common/comp-b69ffdf6.js';
export { r as reactive } from '../common/stream-6698d67f.js';
import '../common/subscription-a6e19b11.js';
import '../common/logger-b9e6479b.js';
import '../common/is-plain-object-24968a48.js';
import '../common/implements-function-c507affc.js';
import '../common/deferror-480a42fb.js';
import '../common/is-array-a7fa88fb.js';
import '../common/range-90bff8dc.js';

class ChangeMap {
    constructor() {
        this.previous = new Map();
        this.current = new Map();
    }
    set(key, add) {
        let value = this.previous.get(key);
        if (!value) {
            value = add(key);
        }
        this.previous.delete(key);
        this.current.set(key, value);
        return value;
    }
    next(removed) {
        for (let [key, handler] of this.previous.entries()) {
            removed(key, handler);
        }
        this.previous.clear();
        const swap = this.previous;
        this.previous = this.current;
        this.current = swap;
    }
}

/**
 * https://www.vertexfragment.com/ramblings/cantor-szudzik-pairing-functions
 */
function szudzikPair(x, y) {
    return x >= y ? x * x + x + y : y * y + x;
}
function szudzikPairSigned(x, y) {
    const a = x >= 0.0 ? 2.0 * x : -2.0 * x - 1.0;
    const b = y >= 0.0 ? 2.0 * y : -2.0 * y - 1.0;
    return szudzikPair(a, b) * 0.5;
}

/**
 *
 * Return an infinite grid iterator given a start position,
 * grid cell and viewport dimensions.
 *
 * @param position
 * @param opts
 */
const infiniteGridIterator = (position, opts) => {
    const [gw, gh] = opts.dimensions;
    const [vw, vh] = opts.viewport;
    const px = -position[0];
    const py = -position[1];
    // start cell x/y
    const fromX = Math.floor(px / gw);
    const fromY = Math.floor(py / gh);
    // cell row / cols
    const xCount = Math.ceil(vw / gw) + 1;
    const yCount = Math.ceil(vh / gh) + 1;
    const toX = fromX + xCount;
    const toY = fromY + yCount;
    return iterator(comp(map(([x, y]) => {
        const wx = x * gw;
        const wy = y * gh;
        const id = szudzikPairSigned(x, y);
        return {
            id,
            cell: [x, y],
            world: [wx, wy],
            local: [wx - px, wy - py],
        };
    })), range2d(fromX, toX, fromY, toY));
};
/**
 * Creates a reactive infinite grid with
 * @param position
 * @param opts
 */
function infiniteGrid(position, opts, handle) {
    const changeMap = new ChangeMap();
    if (!handle) {
        handle = {
            add: () => null,
            remove: () => { },
            update: () => { },
        };
    }
    let res = [];
    return sync({
        src: {
            position,
            opts,
        },
        xform: map(({ opts, position }) => {
            const gridIterator = infiniteGridIterator(position, opts);
            res.splice(0);
            for (let cell of gridIterator) {
                const handler = changeMap.set(cell.id, () => handle.add(cell));
                handle.update(cell, handler);
                res.push(cell);
            }
            changeMap.next((id, val) => handle.remove(id, val));
            return res;
        }),
    });
}

export { infiniteGrid };
