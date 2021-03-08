import {GUI} from "../../../_snowpack/pkg/dat.gui.js";
import {Stream} from "../../../_snowpack/pkg/@thi.ng/rstream.js";
const guiListen = (gui, callback) => {
  gui.__controllers.forEach((c) => c.onChange(callback));
  Object.values(gui.__folders).forEach((g) => guiListen(g, callback));
};
export function createGui(controls) {
  const gui = new GUI({
    width: 350
  });
  gui.domElement.parentElement.style.zIndex = "100";
  const values = {};
  Object.entries(controls).forEach(([key, value]) => {
    let control;
    if (value instanceof Array) {
      if (value.length === 4 && typeof value[0] === "number") {
        values[key] = value[0];
        control = gui.add(values, key, value[1], value[2], value[3]);
      } else {
        values[key] = value[0];
        control = gui.add(values, key, value);
      }
    } else if (typeof value === "function") {
      control = gui.add(controls, key);
    } else {
      values[key] = value;
      control = gui.add(values, key);
    }
  });
  const stream = new Stream(($) => {
    guiListen(gui, () => {
      $.next({
        values,
        gui
      });
    });
  });
  stream.next({
    values,
    gui
  });
  return stream;
}
