import { Intersection } from "./use-intersection";
import { AnimatePropsFactory } from "./use-animate";

export function useMotionProps<T = any>(
  factory: AnimatePropsFactory<T>,
  intersection?: Intersection
) {
  let props: any;
  if (intersection) {
    props = factory(intersection.ratio);
  } else {
    props = {
      opacity: 0,
    };
  }
  return props;
}

// Cached Props
// const variants = {
//   hidden: {},
//   intersect: (ratio, ratioV, ratioH) => {},
// };

// const useCachedVariants = (computeAnimationState: Intersection) => {
//   const variants = useMemo(() => {
//     if (!intersection) {
//       return {
//         hidden: {
//           opacity: 0,
//         },
//       };
//     } else {
//     }
//   }, [c]);
// };

// const v = {
//   intersect_top_00: {},
//   intersect_top_05: {},
//   intersect_top_10: {},
// };
