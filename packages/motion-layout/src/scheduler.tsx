import React, {
  FC,
  createContext,
  useContext,
  useReducer,
  useMemo,
  Reducer,
  Dispatch,
  useEffect,
} from "react";
import { SchedulerItem } from "./scheduler-item";

/**
 * Types
 */
type SchedulerState = {
  items: SchedulerItem[];
};

type SchedulerApi = {
  state: SchedulerState;
  add: (item: SchedulerItem) => void;
  remove: (item: SchedulerItem) => void;
  updateItems: (items: SchedulerItem[]) => void;
};

enum SchedulerActionType {
  Add = "add",
  Remove = "remove",
  UpdateItems = "update-items",
}

interface ISchedulerAddAction {
  type: SchedulerActionType.Add;
  item: SchedulerItem;
}

interface ISchedulerRemoveAction {
  type: SchedulerActionType.Remove;
  item: SchedulerItem;
}

interface ISchedulerUpdateItemsAction {
  type: SchedulerActionType.UpdateItems;
  items: SchedulerItem[];
}

type SchedulerAction =
  | ISchedulerAddAction
  | ISchedulerRemoveAction
  | ISchedulerUpdateItemsAction;

type SchedulerProviderProps = {};

// Context
const SchedulerContext = createContext<SchedulerApi>(null!);
export const useSchedulerContext = () => useContext(SchedulerContext);

/**
 * Scheduler Provider
 */
export const SchedulerProvider: FC<SchedulerProviderProps> = ({ children }) => {
  // Setup
  const initialState = useMemo(() => initialSchedulerState(), []);
  const [state, dispatch] = useReducer(schedulerReducer, initialState);
  const api = useMemo(() => schedulerApi(state, dispatch), [state, dispatch]);

  // Run Scheduler.
  useEffect(() => {
    console.log("Run Scheduler...", state);
    // state.items[0].

    // Scheduler running..
    // Some item changes need evaluting at the reducer.
    // items are only added & removed, then changed when either the bounds intersection changes.
    // or.. internal state changes, delay props change, etc.

    // instead of using timer functions. we'll keep a scheudler loop,
    // and save timestamps on items when they come into view or
    // delays can be applied based on those values??

    // ALL state changes ( inc adding delays ) should happen in the reducer.
    //
    // here... is only a 'tick' function that checks delays and
    // update

    // check which items are visible, and within view.
    // if none visible, they are automatically set to hidden state.
    // no delay is used.
    // for visible objects, they need to be queued
    //
    for (let item of state.items) {
      item.state = "scheduled";
    }

    // Updating items will ( via api )
  }, [state]);

  // Render
  return (
    <SchedulerContext.Provider value={api}>
      {children}
    </SchedulerContext.Provider>
  );
};

/**
 * Initial Scheduler State
 */
const initialSchedulerState = (): SchedulerState => {
  return {
    items: [],
  };
};

/**
 * Scheduler Reducer
 */
const schedulerReducer: Reducer<SchedulerState, SchedulerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case SchedulerActionType.Add:
      state.items.push(action.item);
      return {
        ...state,
      };
    case SchedulerActionType.Remove:
      const idx = state.items.indexOf(action.item);
      state.items.splice(idx, 1);
      return {
        ...state,
      };
    case SchedulerActionType.UpdateItems:
      console.log("Scheduler update item bounds", action.items.length);
      return {
        ...state,
      };
  }
};

/**
 * Scheduler API.
 * Observer Contexts create scheduler items and add to the scheduler via this API.
 */
const schedulerApi = (
  state: SchedulerState,
  dispatch: Dispatch<SchedulerAction>
): SchedulerApi => {
  return {
    state,
    add: (item: SchedulerItem) => {
      item.onBoundsChanged = () => {
        console.log("on bounds changed");
      };
      dispatch({
        type: SchedulerActionType.Add,
        item,
      });
    },
    remove: (item: SchedulerItem) => {
      dispatch({
        type: SchedulerActionType.Remove,
        item,
      });
    },
    updateItems: (items: SchedulerItem[]) => {
      dispatch({
        type: SchedulerActionType.UpdateItems,
        items,
      });
    },
  };
};
