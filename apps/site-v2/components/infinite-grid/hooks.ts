import { GridOpts, infiniteGrid, reactive } from "@jamieowen/layout";
import { useMemo } from "react";

export const useInfiniteGrid = (
  viewport: [number, number],
  dimensions: [number, number]
) => {
  // Create grid streams.
  const streams = useMemo(() => {
    const position = reactive([0, 0] as [number, number]);
    const opts = reactive<GridOpts>({
      dimensions: [400, 300],
      viewport,
    });
    const grid = infiniteGrid(position, opts, {
      add: () => {},
      remove: () => {},
      update: () => {},
    });
    return { position, grid, opts };
  }, []);

  // const [items,setItems] =
  // Update changes to dimensions or viewport
  useMemo(() => {
    streams.opts.next({
      viewport,
      dimensions,
    });
  }, [...dimensions, ...viewport]);

  return streams;
};
