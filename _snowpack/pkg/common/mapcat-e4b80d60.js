import { c as comp } from './comp-b69ffdf6.js';
import { d as isIterable, f as iterator, m as map } from './map-ab3a157d.js';
import { c as cat } from './cat-e7588608.js';

function mapcat(fn, src) {
    return isIterable(src) ? iterator(mapcat(fn), src) : comp(map(fn), cat());
}

export { mapcat as m };
