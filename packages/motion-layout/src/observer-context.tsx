import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useMemo,
} from "react";
import {
  IObserverContextState,
  ObserverManager,
  ObserverObject,
  createObject,
} from "./observer-manager";

export const ObserverContext = createContext<IObserverContextState>(null);

export const ObserverProvider = ({ children }) => {
  const state = useMemo(() => {
    return typeof window === "undefined" ? {} : new ObserverManager();
  }, []);
  return (
    <ObserverContext.Provider value={state}>
      {children}
    </ObserverContext.Provider>
  );
};

export const useObserverContext = () => {
  return useContext(ObserverContext);
};

export const useObserverRef = (
  // State change handler will be called when the intersection object is manipulated.
  // The component implementing the hook can choose to trigger a re-render or not.
  onStateChange: (obj: ObserverObject) => void
) => {
  const state = useObserverContext();
  const ref = useRef<ObserverObject>(null);
  const domRef = useRef(null);

  // Create the intersection object
  const object: ObserverObject = ref.current
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
