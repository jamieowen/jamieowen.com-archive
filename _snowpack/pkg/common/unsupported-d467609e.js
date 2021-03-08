import { d as defError } from './deferror-480a42fb.js';

const UnsupportedOperationError = defError(() => "unsupported operation");
const unsupported = (msg) => {
    throw new UnsupportedOperationError(msg);
};

export { unsupported as u };
