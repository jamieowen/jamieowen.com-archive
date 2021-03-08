import { d as isIterable, j as iterator1, c as compR } from './map-ab3a157d.js';

function filter(pred, src) {
    return isIterable(src)
        ? iterator1(filter(pred), src)
        : (rfn) => {
            const r = rfn[2];
            return compR(rfn, (acc, x) => (pred(x) ? r(acc, x) : acc));
        };
}

export { filter as f };
