import { MutableRefObject, Reducer, useRef } from "react";
import {
  SchedulerAction,
  SchedulerActionType,
  SchedulerItem,
  SchedulerItemOwner,
  SchedulerState,
} from "./scheduler-api";

/**
 * Initial Scheduler State
 */
export const initialSchedulerState = (): SchedulerState => {
  return {
    items: [],
    observables: [],
    observers: [],
    pendingUpdates: [],
  };
};

/**
 * Scheduler Reducer
 */
export const schedulerReducer: Reducer<SchedulerState, SchedulerAction> = (
  state,
  action
) => {
  console.log("Scheduler Reducer : ", action.type);

  const { observers, observables } = state;

  switch (action.type) {
    // case SchedulerActionType.Add:
    //   state.items.push(action.item);
    //   return {
    //     ...state,
    //   };
    // case SchedulerActionType.Remove:
    //   const idx = state.items.indexOf(action.item);
    //   state.items.splice(idx, 1);
    //   return {
    //     ...state,
    //   };
    case SchedulerActionType.UpdateItems:
      console.log("Update Items");
      return {
        ...state,
      };

    // Possibilities for new actions.
    // Initialise ( called after one useEffect dispatch if a pending array is )

    case SchedulerActionType.AddObserver:
      if (observers.indexOf(action.item) > -1) {
        throw new Error("Observer already exists.");
      }
      observers.push(action.item);
      // Observe pending observables ( those added during observer component )
      action.item.pendingObservables.forEach((obs) => {
        const observer = action.item.observerRef.current;
        observer.observe(obs.domRef.current);
      });
      action.item.pendingObservables = [];
      return {
        ...state,
      };
    case SchedulerActionType.RemoveObserver:
      observers.splice(observers.indexOf(action.item), 1);
      return {
        ...state,
      };
    case SchedulerActionType.AddObservable:
      console.log("Add Observable");
      action.item.state = "initialise";
      observables.push(action.item);
      return {
        ...state,
      };
    case SchedulerActionType.RemoveObservable:
      observables.splice(observables.indexOf(action.item), 1);
      return {
        ...state,
      };
    // Update Observables
    // Changes from IntersectionObservers.
    default:
      throw new Error(`Unhandled action type :${action.type}`);
  }
};

export const createSchedulerItem = (
  owner: SchedulerItemOwner,
  domRef: MutableRefObject<Element>
): SchedulerItem => {
  return {
    owner,
    domRef,
    bounds: {},
    state: "initialise",
    onBoundsChanged: {},
    onStateChanged: {},
  };
};

// Create a scheduler item scoped to a component.
export const useSchedulerItem = (
  owner: SchedulerItemOwner,
  domRef: MutableRefObject<Element>
): SchedulerItem => {
  const itemRef = useRef<SchedulerItem>();
  if (!itemRef.current) {
    itemRef.current = createSchedulerItem(owner, domRef);
  }
  return itemRef.current;
};

/** Old Observer Object.
export type ObserverObject = {
  ref: MutableRefObject<ObserverObject>;
  domRef: MutableRefObject<Element>;
  state: "initialise" | "hidden" | "visible";
  sortOrder: number;
  onChange: (obj: ObserverObject) => void;
  entry: IntersectionObserverEntry;
  bottom: boolean;
  top: boolean;
  left: boolean;
  right: boolean;
  ratio: number;
};
 */

/** Observer interseciotn
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const item = this.observed.get(entry.target);
      const root = entry.rootBounds;
      const rect = entry.intersectionRect;

      if (item && root) {
        item.entry = entry;

        item.bottom = rect.bottom === root.bottom;
        item.top = rect.top === root.top;
        item.left = rect.left === root.left;
        item.right = rect.right === root.right;

        item.ratio = entry.intersectionRatio;

        this.changed.push(item);
      }
    }
  */
