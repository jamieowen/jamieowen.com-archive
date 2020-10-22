import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useMemo,
} from "react";
import {
  IIntersectionContextState,
  IntersectionManager,
  IntersectionObject,
} from "./IntersectionManager";

export const MotionContext = createContext<IIntersectionContextState>(null);

export const IntersectionProvider = ({ children }) => {
  const state = useMemo(() => {
    return typeof window === "undefined" ? {} : new IntersectionManager();
  }, []);
  return (
    <MotionContext.Provider value={state}>{children}</MotionContext.Provider>
  );
};

export const useMotionContext = () => {
  return useContext(MotionContext);
};

export const useIntersectionRef = (
  // State change handler will be called when the intersection object is manipulated.
  // The component implementing the hook can choose to trigger a re-render or not.
  onStateChange: (obj: IntersectionObject) => void
) => {
  const state = useMotionContext();
  const ref = useRef<IntersectionObject>(null);
  const domRef = useRef(null);

  // Create the intersection object
  const object: IntersectionObject = ref.current
    ? ref.current
    : (ref.current = createObject(ref, domRef, onStateChange));

  // need a better way to update callback
  // perhaps event listener on item object?
  object.onChange = onStateChange;

  // Register the intersection requests on startup.
  useEffect(() => {
    state.add(object);
    return () => {
      state.remove(object);
    };
  }, [state, object]);

  // Register the dom ref when a change is detected to the dom ref.
  useEffect(() => {
    state.updateDomRef(object);
  }, [domRef.current]);

  return { ref, domRef };
};

const createObject = (ref, domRef, onStateChange): IntersectionObject => {
  console.log("Create Object");
  return {
    ref,
    domRef,
    state: "hidden",
    sortOrder: 0,
    onChange: onStateChange,
    entry: undefined,
    bottom: false,
    top: false,
    left: false,
    right: false,
    ratio: 0,
  };
};
