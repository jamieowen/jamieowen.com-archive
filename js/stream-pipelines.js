import {sketch} from "../_snowpack/pkg/@jamieowen/three.js";
import {Group} from "../_snowpack/pkg/three.js";
import {trace} from "../_snowpack/pkg/@thi.ng/rstream.js";
import {
  fromPoissonPoints,
  renderPoints,
  mergeAttributes,
  fromColorGradient,
  fromRandomAttribute,
  renderLines
} from "./lib/stream-pipelines/index.js";
sketch(({configure, render, renderer, scene}) => {
  configure({
    width: "1024px",
    height: "768px"
  });
  const group = new Group();
  group.position.set(-25, -25, 0);
  scene.add(group);
  const count = 2500;
  mergeAttributes(fromColorGradient(count), fromPoissonPoints(count), fromRandomAttribute({
    count,
    name: "velocity"
  })).subscribe(renderPoints(group)).subscribe(renderLines(group)).subscribe(trace("Merged:"));
  render(() => {
  });
});
