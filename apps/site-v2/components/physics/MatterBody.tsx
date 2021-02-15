import React, {
  FC,
  useRef,
  useEffect,
  useMemo,
  cloneElement,
  ReactElement,
} from "react";
import { Bodies, Body, Vector, World } from "matter-js";
import { useMatter } from "./MatterContext";

type MatterBodyProps = {};

const setDivStyle = (div: HTMLDivElement) => {
  div.style.position = "absolute";
};

export const MatterBody: FC<MatterBodyProps> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement>();
  const matter = useMatter();
  const [body, position] = useMemo(() => {
    const body = Bodies.rectangle(0, 0, 1, 1, {
      isStatic: false,
    });
    const position = Vector.create();
    return [body, position];
  }, []);
  // const observer = useMemo(() => {}, []);

  useEffect(() => {
    const observer = new ResizeObserver((e) => {
      // const { width, height, x, y } = e[0].contentRect;
      const { width, height, x, y } = e[0].target.getBoundingClientRect();
      // console.log("Resize Body", width, height, x, y, rect);
      position.x = x + width / 2;
      position.y = y + height / 2;
      Body.scale(body, width, height);
      Body.setPosition(body, position);
      console.log("SET BODY:", position, width, height);
    });

    console.log("ADD BODY", matter, ref.current);

    World.add(matter.world, body);
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return cloneElement(children as ReactElement, {
    ref: ref,
    ...props,
  });
};
