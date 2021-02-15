import { subscription, stream, trace } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";

// Subscriptions are the base class for everything within rstream
// They can receive an input and dispatch an output and
// be chained together

const sub1 = () =>
  subscription<number, number>(null, {
    xform: map((x) => x * 2),
  });

const sub2 = () =>
  subscription<number, number>(null, {
    xform: map((x) => x + 1),
  });

test("chaining together subscriptions.", () => {
  const s1 = sub1();
  const s11 = sub1();
  const s2 = sub2();

  const cb = jest.fn();
  s1.subscribe(s11).subscribe(s2).subscribe({
    next: cb,
  });

  s1.next(10);
  expect(cb).toHaveBeenCalledWith(41);
});

// Stream sources.
// fromAttribute('name',size,count); // an array of values.
// fromTransformObj() // a positoin, scale, rotaiotn transform object. ( 3 attributes )
// fromImageColors

// Processing
// Particles

// Render ( End Destination? )
// renderPoints({attribute:''})
// renderLines()
// renderInstancedTransform()
// renderInstancedParticles()
