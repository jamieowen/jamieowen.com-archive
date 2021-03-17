import {
  // fromRandomPoints,
  GeometryEvent,
  createRandomPoints,
} from "./lib/geom-streams";
// import { map } from "@thi.ng/transducers";
import { subscription } from "@thi.ng/rstream";

// const randomPoints = fromRandomPoints("rnd", {
//   count: 20,
// });

// const s = randomPoints.stream.transform(map((a) => a[0]));
// console.log(randomPoints);
// console.log(randomPoints.stream.deref());
// console.log(s.deref());

const render = subscription<any, GeometryEvent>({
  next: (s) => {
    console.log("Render", s);
    switch (s.type) {
      case "point":
        console.log("Render", s.data);
    }
  },
});

const [points, pointsInputs] = createRandomPoints("id");

points.subscribe(render);
points.subscribe({
  next: () => {
    console.log("okok");
  },
});

pointsInputs.next({
  count: 5,
  seed: 0,
});
