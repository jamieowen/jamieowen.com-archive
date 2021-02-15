import React, {
  createContext,
  useRef,
  FC,
  useEffect,
  useContext,
  useMemo,
  useState,
} from "react";
import { ObserverProviderProps } from "./observer";
import {
  createObservableComponent,
  createObserverComponent,
  ObservableComponent,
  ObserverComponent,
} from "./scheduler-api";
import { useSchedulerContext } from "./scheduler-context";

const ObserverContext2 = createContext<ObserverComponent>(null!);
const useObserverContext2 = () => useContext(ObserverContext2);

export const ObserverProvider2: FC<ObserverProviderProps> = ({ children }) => {
  // get scheduler. & api

  console.log("<ObserverProvider> Render");
  const [state, setState] = useState({ count: 0 });
  // useIntersectionObserver
  const { component } = useIntersectionObserver();
  // how to pass in a root ref to intersection observer?

  return (
    <ObserverContext2.Provider value={component}>
      {children}
    </ObserverContext2.Provider>
  );
};

/**
 *
 * @param callback
 * @param params
 */
export const useIntersectionObserver = (
  params?: Pick<IntersectionObserverInit, "rootMargin" | "threshold">
) => {
  const { observerRef, domRef, component } = useObserver();
  // Creating Observer during the effect stage is used instead of
  // useMemo for a couple of reasons.
  // 1. For SSR, is using memo, we'd need an isomorphic version of IntersectionObserver.
  // 2. When specifying a root element to the IO, we need to wait for the dom ref to be populated.
  // 3. Downsides mean that child Observable components cannot call observe immediately.
  // 4. So.. the reducer handles observe

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        // testScheduler.updateItems([]);
        component.changeStream.next([entries, observer]);
      },
      {
        ...params,
        root: domRef.current,
      }
    );
    observerRef.current = observer;
  }, []);

  registerObserver(component);

  return { observerRef, rootRef: domRef, component };
};

/**
 * Creates an ObserverComponent and registers it
 */
export const useObserver = () => {
  const observerRef = useRef<IntersectionObserver>(null!);
  const domRef = useRef<Element>(null!); // root ref is optional

  const component = useMemo(
    () => createObserverComponent(observerRef, domRef),
    []
  );
  return {
    observerRef,
    domRef,
    component,
  };
};

export const registerObserver = (component: ObserverComponent) => {
  const scheduler = useSchedulerContext();
  useEffect(() => {
    if (!component.observerRef.current) {
      throw new Error(
        "A valid observer ref needs assigning to the Observers observerRef."
      );
    }
    scheduler.addObserver(component);
    return () => {
      scheduler.removeObserver(component);
    };
  }, []);
};

export const useObservable = () => {
  // Fetch nearest parent observer
  const owner = useObserverContext2();
  if (!owner) {
    throw new Error("Could not determine nearest Observer component");
  }

  // Prep refs and persistent storage
  const domRef = useRef<Element>(null!);
  const component = useMemo(() => createObservableComponent(owner, domRef), []);

  // Register the observable with the nearest Observer if possible.
  useEffect(() => {
    const observer = owner.observerRef.current;
    if (observer) {
      observer.observe(domRef.current);
    } else {
      // Pending observables are registered in the reducer.
      owner.pendingObservables.push(component);
    }
    return () => {
      if (owner.observerRef.current && domRef.current) {
        owner.observerRef.current.unobserve(domRef.current);
      }
    };
  }, []);

  // Register the Observable with the Scheduler.
  registerObservable(component);

  return {
    component,
    domRef,
  };
};

export const registerObservable = (component: ObservableComponent) => {
  const scheduler = useSchedulerContext();

  useEffect(() => {
    if (!(component.domRef.current instanceof Element)) {
      throw new Error(
        "A valid element needs assigning to the Observables domRef."
      );
    }
    scheduler.addObservable(component);
    return () => {
      scheduler.removeObservable(component);
    };
  }, []);
};
