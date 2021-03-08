import { G as GUI$1 } from '../common/dat.gui.module-6e4ed730.js';
import { k as keyboardStream } from '../common/keyboard-stream-b55f7ffd.js';
import { S as Stream } from '../common/stream-6698d67f.js';
import '../common/event-358f6fc3.js';
import '../common/subscription-a6e19b11.js';
import '../common/logger-b9e6479b.js';
import '../common/map-ab3a157d.js';
import '../common/implements-function-c507affc.js';
import '../common/deferror-480a42fb.js';
import '../common/is-plain-object-24968a48.js';
import '../common/comp-b69ffdf6.js';

const guiListen = (gui, callback) => {
    gui.__controllers.forEach((c) => c.onChange(callback));
    Object.values(gui.__folders).forEach((g) => guiListen(g, callback));
};
// type Value = string | number |
function createGui(controls) {
    // Create dat.gui
    const gui = new GUI$1({
        width: 350,
        closed: true,
    });
    keyboardStream({
        toggle: ["k"],
    }).subscribe({
        next: (ev) => {
            console.log(ev);
            if (ev.isKeyToggled && ev.keysToggled.indexOf("k") > -1) {
                gui.hide();
            }
            else {
                gui.show();
            }
        },
    });
    gui.domElement.parentElement.style.zIndex = "100";
    // Convert controls object to gui compatible
    const values = {};
    Object.entries(controls).forEach(([key, value]) => {
        // Add item array
        if (value instanceof Array) {
            // number, min/max shorthand.
            if (value.length === 4 && typeof value[0] === "number") {
                values[key] = value[0];
                gui.add(values, key, value[1], value[2], value[3]);
            }
            else {
                values[key] = value[0];
                gui.add(values, key, value);
            }
        }
        else if (typeof value === "function") {
            // add function ref directly
            gui.add(controls, key);
        }
        else {
            // copy values to new object
            values[key] = value;
            gui.add(values, key);
        }
        // control.name(key.toUpperCase());
    });
    const stream = new Stream(($) => {
        guiListen(gui, () => {
            $.next({
                values,
                gui,
            });
        });
    });
    stream.next({
        values,
        gui,
    });
    return stream;
}

export { createGui };
