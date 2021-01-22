import { FC, Fragment, useMemo, useLayoutEffect, useEffect } from "react";
import { useThree } from "react-three-fiber";
import { createGrid, createGestures } from "./createGrid";
import { LoadState } from "./SpriteAssetLoader";
import { createMeshFactory } from "./SpriteMeshFactory";

/**
 * Notes for grid implementation.
 *
 * Grid is supplied an array of spritesheet locations ( multiple images and json )
 * Sprites are loaded and textures created accordingly.
 * Sprites are sorted by name, and duplicated infinitely in the veritcal direction.
 * Sprite groups are formed ( and duplicated horizontally ) by the difference between names. ( or supplying a groups list )
 */

export interface InfiniteGridProps {
  loadState: LoadState;
}

export const InfiniteGrid: FC<InfiniteGridProps> = ({ loadState }) => {
  const { gl, camera, invalidate, scene } = useThree();

  const { domElement } = gl;
  const { resize, drag, pointer } = useMemo(
    () => createGestures(domElement, camera),
    []
  );
  const factory = useMemo(() => createMeshFactory(), []);
  useMemo(() => factory.updateAssets(loadState.currentAssets), [
    loadState.currentAssets,
  ]);

  const { position, opts, group } = useMemo(() => createGrid(factory), []);

  group.rotation.z = Math.PI * 0.01;
  group.rotation.x = Math.PI * -0.1;

  useLayoutEffect(() => {
    scene.add(group);

    pointer.subscribe({
      next: ({ type }) => {
        // console.log("Ges", type);
      },
    });

    drag.subscribe({
      next: ({ particle }) => {
        position.next([-particle.position[0], -particle.position[1]]);
        invalidate();
      },
    });

    resize.subscribe({
      next: () => {
        console.log("New resize...");
        // update view port..

        const op = opts.deref();
        // set group center

        group.position.set(-op.dimensions[0] / 2, -op.dimensions[1] / 2, 0);
        // update grid opts
        // dimensions: [4, 3],
        // viewport: [10, 10],
      },
    });
  }, []);

  return <group></group>;
};
