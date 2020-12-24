export type GridOpts = {
  // Dimensions of each grid cell
  dimensions: [number, number];
  // Size of viewport
  viewport: [number, number];
};

export type SubGridOpts = GridOpts & {
  maxDepth: number;
  subdivide: (depth: number) => boolean;
};

export type GridCell = {
  id: number;
  world: [number, number];
  cell: [number, number];
  local: [number, number];
};

export type SubGridCell = GridCell & {
  depth: number;
};
