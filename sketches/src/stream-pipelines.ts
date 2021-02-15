import { sketch } from "@jamieowen/three";
import { Group } from "three";
import { trace } from "@thi.ng/rstream";
import {
  fromPoissonPoints,
  renderPoints,
  mergeAttributes,
  fromColorGradient,
  fromRandomAttribute,
  renderLines,
} from "./lib/stream-pipelines";

sketch(({ configure, render, renderer, scene }) => {
  configure({
    width: "1024px",
    height: "768px",
  });

  const group = new Group();
  group.position.set(-25, -25, 0);
  scene.add(group);

  const count = 2500;
  mergeAttributes(
    fromColorGradient(count),
    fromPoissonPoints(count),
    fromRandomAttribute({
      count,
      name: "velocity",
    })
  )
    .subscribe(renderPoints(group))
    .subscribe(renderLines(group))
    .subscribe(trace("Merged:"));

  render(() => {});
});
