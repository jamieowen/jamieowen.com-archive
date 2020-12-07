import { renderSvg } from "../src/renderers/renderSvg";
import { BoundsNode, RectNode, Node } from "../src/nodes";
import { grid, gridOffset } from "../src/__old2/layouts/grid";
import { BoundsInfo } from "../src/__old2/layouts/subdivide";
import { herringbone } from "../src/__old2/layouts/herringbone";
import { basketweave } from "../src/__old2/layouts/basketweave";
import { windmill } from "../src/__old2/layouts/windmill";
import { hopscotch } from "../src/__old2/layouts/hopscotch";

import * as geo from "@thi.ng/geom";

/**
 * Layouts Preview
 */
const layoutDims = [250, 250];
const gridOpts = {
  w: 3,
  h: 3,
  sx: layoutDims[0] / 3,
  sy: layoutDims[1] / 3,
};

function container() {
  const bounds: BoundsNode = new BoundsNode("");
  bounds.translate = [0, 0];
  bounds.bounds = layoutDims.slice(0);
  return bounds;
}

function rectFactory(i: number, x: BoundsInfo, p: Node) {
  const r: RectNode = new RectNode("", p);
  // r.attributes['fill'] = i % 5 ? 'crimson' : '#222';
  r.attributes["fill"] = "#222";
  r.attributes["stroke"] = "white";
  r.attributes["weight"] = 1;
  r.size = [x.w, x.h];
  r.translate = [x.x, x.y];
  return r;
}

function renderSvgToDom(container, text = "") {
  const ele: SVGElement = renderSvg(container);
  ele.style.margin = "10px";
  document.body.appendChild(ele);
  const label = document.createElement("span");
  label.innerText = text;
  document.body.appendChild(label);
  // console.log( root );
  return ele;
}

function renderLayout(layoutFunc, text = "Info") {
  const root = container();
  const iterator = layoutFunc(root, gridOpts, rectFactory);
  for (let node of iterator) {
    // console.log( node );
  }
  root.update();
  renderSvgToDom(root, text);
}

renderLayout(grid, "Grid");
renderLayout(gridOffset, "Grid Offset");
renderLayout(herringbone, "Herringbone ( Make Square Grid ) ");
renderLayout(basketweave, "Basketweave");
renderLayout(windmill, "Windmill");
renderLayout(hopscotch, "Hopscotch");

/**
 * Shapes Preview
 */

function renderShape(shapeBody, text = "") {}

console.log(geo.circle(), geo.rect());
console.log(geo.asPolygon(geo.circle(), 10));
// console.log( geo.poin );
// geo.roundedRect([])
console.log(geo.asSvg(geo.asPolyline(geo.circle()), 3));
