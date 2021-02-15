import React, {
  FC,
  createContext,
  useContext,
  useReducer,
  useMemo,
  Reducer,
  Dispatch,
  useRef,
  MutableRefObject,
  useEffect,
} from "react";
import { useSchedulerContext } from "./scheduler-context";
import { SchedulerItem } from "./scheduler-api";

/**
 * Types
 */
type ObserverState = {
  items: SchedulerItem[];
  changedItems: SchedulerItem[];
  itemMap: WeakMap<Element, SchedulerItem>;
  observer: IntersectionObserver;
};

type ObserverApi = {
  state: ObserverState;
  add: (item: SchedulerItem) => any;
  remove: (item: SchedulerItem) => any;
};

enum ObserverActionType {
  Add = "add",
  Remove = "remove",
  Intersect = "intersect",
  SetObserver = "set-observer",
}

interface IObserverAddAction {
  type: ObserverActionType.Add;
  item: SchedulerItem;
}

interface IObserverRemoveAction {
  type: ObserverActionType.Remove;
  item: SchedulerItem;
}

interface IObserverIntersectAction {
  type: ObserverActionType.Intersect;
  entries: IntersectionObserverEntry[];
}

interface IObserverSetObserverAction {
  type: ObserverActionType.SetObserver;
  observer: IntersectionObserver;
}

type ObserverAction =
  | IObserverAddAction
  | IObserverRemoveAction
  | IObserverIntersectAction
  | IObserverSetObserverAction;

export type ObserverProviderProps = {
  threshold?: number[];
  rootMargin?: string;
  root?: Element;
};

/**
 * Context
 */
const ObserverContext = createContext<ObserverApi>(null!);
export const useObserverContext = () => useContext(ObserverContext);

/**
 * Observer Provider
 */
export const ObserverProvider: FC<ObserverProviderProps> = ({
  threshold = [0, 0.5, 1],
  rootMargin = undefined,
  root = undefined,
  children,
}) => {
  // Maintain a dispatch ref to accomodate IntersectionObserver's callback needs
  const dispatchRef = useRef<Dispatch<ObserverAction>>(null!);
  const observer = useIntersectionObserver(
    dispatchRef,
    threshold,
    rootMargin,
    root
  );

  // Setup
  const initialState = useMemo(() => initialObserverState(observer), []);
  const [state, dispatch] = useReducer(observerReducer, initialState);
  const api = useMemo(() => observerApi(state, dispatch), [state, dispatch]);

  // Update dispatch for IntesectionObserver
  dispatchRef.current = dispatch;

  // Notify scheduler of changedItems
  // This happens when any observed items trigger an
  // event on the IntersectionObserver.
  const scheduler = useSchedulerContext();
  useEffect(() => {
    console.log("notify scheduler..");
    if (state.changedItems.length > 0) {
      scheduler.updateItems(state.changedItems);
    }
  }, [state.changedItems]);

  console.log("Render Observer Provider ( old )");

  // Render
  return (
    <ObserverContext.Provider value={api}>{children}</ObserverContext.Provider>
  );
};

/**
 * Intersection Obsever
 *
 * Initialise / Maintain an IntersectionObserver 'ahead of time'
 * Interact with dispatch via a ref.
 */
const useIntersectionObserver = (
  dispatchRef: MutableRefObject<Dispatch<ObserverAction>>,
  threshold?: number[],
  rootMargin?: string,
  root?: Element
): IntersectionObserver => {
  // Memo needs to ensure threshold params are deep equals on memo
  // TODO: for now just remove conditions
  return useMemo(() => {
    const onCallback: IntersectionObserverCallback = (entries) => {
      dispatchRef.current({
        type: ObserverActionType.Intersect,
        entries,
      });
    };

    const observer =
      typeof window === "undefined"
        ? ({} as IntersectionObserver)
        : new IntersectionObserver(onCallback, {
            root,
            rootMargin,
            threshold,
          });

    // If the dispatch ref is populated we are likely
    // updating the observer.
    // TODO..
    // if (dispatchRef.current) {
    //   dispatchRef.current({
    //     type: ObserverActionType.SetObserver,
    //     observer,
    //   });
    // }
    return observer;
  }, []);
  // threshold, rootMargin, root
};

/**
 * Initial Observer State.
 */
const initialObserverState = (
  observer: IntersectionObserver
): ObserverState => {
  return {
    observer,
    items: [],
    changedItems: [],
    itemMap: new WeakMap<Element, SchedulerItem>(),
  };
};

/**
 * Observer Reducer
 */
const observerReducer: Reducer<ObserverState, ObserverAction> = (
  state,
  action
) => {
  const { items, itemMap } = state;
  const item = action.item!;
  const ele = action.item?.domRef.current!;

  switch (action.type) {
    case ObserverActionType.SetObserver:
      throw new Error("Todo...");
    case ObserverActionType.Add:
      items.push(item);
      if (ele) {
        // issue with react hot loading ( this should never be null )
        state.observer.observe(ele);
        itemMap.set(ele, item);
      } else {
        console.warn("Element is null. React hot loading???");
      }
      return {
        ...state,
      };

    case ObserverActionType.Remove:
      const idx = items.indexOf(item);
      items.splice(idx, 1);
      state.observer.unobserve(ele);
      return {
        ...state,
      };

    case ObserverActionType.Intersect:
      const entries = action.entries!;
      // Resolve entries to items, and update / dispatch changed
      const changedItems: SchedulerItem[] = [];
      for (let entry of entries) {
        const targ = entry.target;
        const item = itemMap.get(targ);
        // Update Item Bounds
        if (item) {
          changedItems.push(item);
        } else {
          console.warn(
            "No item found for intersection entry. Potentially a bug..."
          );
        }
      }

      return {
        ...state,
        changedItems,
      };
  }
};

/**
 * Observer API
 */
const observerApi = (
  state: ObserverState,
  dispatch: Dispatch<ObserverAction>
): ObserverApi => {
  return {
    state,
    add: (item: SchedulerItem) => {
      dispatch({
        type: ObserverActionType.Add,
        item,
      });
    },
    remove: (item: SchedulerItem) => {
      dispatch({
        type: ObserverActionType.Remove,
        item,
      });
    },
  };
};
