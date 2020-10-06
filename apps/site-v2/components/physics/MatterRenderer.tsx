import React, { FC, useRef, useEffect } from "react";
import { useMatter } from "./MatterContext";
import { Render } from "matter-js";
type MatterRendererProps = {};

export const MatterRenderer: FC<MatterRendererProps> = () => {
  const ref = useRef<HTMLDivElement>();
  const matter = useMatter();

  useEffect(() => {
    console.log("Create Renderer");
    const renderer = Render.create({
      element: ref.current,
      engine: matter.engine,
      options: {
        width: 800,
        height: 600,
      },
    });
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      renderer.canvas.width = width;
    });
    observer.observe(ref.current);

    Render.run(renderer);
  }, []);
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        top: "0px",
        left: "0px",
        position: "fixed",
        zIndex: -1,
        // backgroundColor: "rgba(255,0,255,0.1)",
      }}
    ></div>
  );
};
