import { useRef, useEffect } from "react";
import { ObserverObject, createObject } from "./___observer-manager";
import { useObserverContext } from "./observer";
import { useSchedulerItem } from "./scheduler-item";
import { useSchedulerContext } from "./scheduler";

export const useObserver = (
  // State change handler will be called when the intersection object is manipulated.
  // The component implementing the hook can choose to trigger a re-render or not.
  onStateChange: (obj: ObserverObject) => void
) => {
  const observer = useObserverContext();
  const domRef = useRef<Element>(null!);
  const item = useSchedulerItem(this, domRef);
  const scheduler = useSchedulerContext();

  // Register item with both the scheduler & observer context.
  useEffect(() => {
    console.log("useObserver() Register", domRef.current);
    if (!domRef.current || !(domRef.current! instanceof Element)) {
      throw new Error("Assign the supplied ref to a dom element.");
    }
    scheduler.add(item);
    observer.add(item);
    return () => {
      scheduler.remove(item);
      observer.add(item);
    };
  }, []);

  return { domRef, item };
};
