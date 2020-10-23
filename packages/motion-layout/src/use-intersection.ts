import { useRef, useEffect, useState } from "react";

export type Intersection = {
  entry: IntersectionObserverEntry;
  ratio: number;
  bottom: boolean;
  top: boolean;
  left: boolean;
  right: boolean;
};

export const useIntersectionObserver = () => {
  const ref = useRef<HTMLElement>(null);
  const [intersection, setIntersection] = useState<Intersection>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new IntersectionObserver(
      (cb) => {
        const entry = cb[0];
        const bottom =
          entry.intersectionRect.bottom === entry.rootBounds.bottom;
        const top = entry.intersectionRect.top === entry.rootBounds.top;
        const left = entry.intersectionRect.left === entry.rootBounds.left;
        const right = entry.intersectionRect.right === entry.rootBounds.right;
        setIntersection({
          entry,
          ratio: entry.intersectionRatio,
          left,
          right,
          bottom,
          top,
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    observer.observe(ref.current);
    return () => {
      observer.unobserve(ref.current);
    };
  }, []);

  return {
    ref,
    intersection,
  };
};
