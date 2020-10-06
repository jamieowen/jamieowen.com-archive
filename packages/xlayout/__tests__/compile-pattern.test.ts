import { compilePattern, Pattern, X } from "../src/core/compile-pattern";

const mat: Pattern = [
  [X, X, 1, X],
  [2, 2, 1, 3],
  [4, 4, 1, 3],
  [5, 5, X, 6],
];

const mat2: Pattern = [
  [2, 2, 1, 3],
  [4, 4, 1, 3],
];

test("test pattern 2x2", () => {
  const pattern = [
    [0, 0],
    [1, 1],
  ];
  const res = compilePattern(pattern);
  expect(res).toEqual({
    width: 2,
    height: 2,
    tiles: [
      { id: 0, w: 2, h: 1, x: 0, y: 0 },
      { id: 1, w: 2, h: 1, x: 0, y: 1 },
    ],
  });
});

test("test pattern 3x3", () => {
  const pattern = [
    [0, 0, 2],
    [1, 1, 2],
    [4, 3, 3],
  ];
  const res = compilePattern(pattern);
  expect(res).toEqual({
    width: 3,
    height: 3,
    tiles: [
      { id: 0, w: 2, h: 1, x: 0, y: 0 },
      { id: 1, w: 2, h: 1, x: 0, y: 1 },
      { id: 2, w: 1, h: 2, x: 2, y: 0 },
      { id: 3, w: 2, h: 1, x: 1, y: 2 },
      { id: 4, w: 1, h: 1, x: 0, y: 2 },
    ],
  });
});

test("test pattern 4x2", () => {
  const pattern = [
    [0, 0, 3, 4],
    [1, 1, 2, 2],
  ];
  const res = compilePattern(pattern);
  expect(res).toEqual({
    width: 4,
    height: 2,
    tiles: [
      { id: 0, w: 2, h: 1, x: 0, y: 0 },
      { id: 1, w: 2, h: 1, x: 0, y: 1 },
      { id: 2, w: 2, h: 1, x: 2, y: 1 },
      { id: 3, w: 1, h: 1, x: 2, y: 0 },
      { id: 4, w: 1, h: 1, x: 3, y: 0 },
    ],
  });
});

test("test error non-aligned axis", () => {
  const pattern = [
    [0, 0, 2, 2],
    [0, 1, 1, 1],
  ];
  expect(() => compilePattern(pattern)).toThrow();
});

test("test 2x2 island", () => {
  const pattern = [
    [0, 0, 2],
    [0, 0, 2],
    [1, 1, 1],
  ];
  const res = compilePattern(pattern);
  expect(res).toEqual({
    width: 3,
    height: 3,
    tiles: [
      { id: 0, w: 2, h: 2, x: 0, y: 0 },
      { id: 1, w: 3, h: 1, x: 0, y: 2 },
      { id: 2, w: 1, h: 2, x: 2, y: 0 },
    ],
  });
});

test("test 4x2 island", () => {
  const pattern = [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const res = compilePattern(pattern);
  expect(res).toEqual({
    width: 4,
    height: 3,
    tiles: [
      { id: 0, w: 4, h: 2, x: 0, y: 1 },
      { id: 1, w: 4, h: 1, x: 0, y: 0 },
    ],
  });
});
