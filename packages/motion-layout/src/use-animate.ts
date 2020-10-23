import { useIntersectionObserver } from "./use-intersection";
import { useMotionProps } from "./use-motion-props";

export type AnimatePropsFactory<T = any> = (ratio: number) => T;

export const useIntersectAnimate = (factory: AnimatePropsFactory) => {
  const { ref, intersection } = useIntersectionObserver();
  const props = useMotionProps(factory, intersection);
  return {
    ref,
    animate: props,
  };
};
