import {
  createRandomPoints
} from "./lib/geom-streams/index.js";
import {subscription} from "../_snowpack/pkg/@thi.ng/rstream.js";
const render = subscription({
  next: (s) => {
    console.log("Render", s);
    switch (s.type) {
      case "point":
        console.log("Render", s.data);
    }
  }
});
const [points, pointsInputs] = createRandomPoints("id");
points.subscribe(render);
points.subscribe({
  next: () => {
    console.log("okok");
  }
});
pointsInputs.next({
  count: 5,
  seed: 0
});
