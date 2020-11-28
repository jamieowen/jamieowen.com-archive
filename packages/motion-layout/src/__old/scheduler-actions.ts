import { Dispatch, MutableRefObject } from "react";
import { SchedulerItem } from "./scheduler-item";
import {
  SchedulerAction,
  SchedulerActionType,
  SchedulerApi,
  SchedulerState,
  ObserverComponent,
  ObservableComponent,
} from "./scheduler-api";

/**
 * Scheduler API.
 * Observer Contexts create scheduler items and add to the scheduler via this API.
 */
export const schedulerApi = (
  state: MutableRefObject<SchedulerState>,
  dispatch: MutableRefObject<Dispatch<SchedulerAction>>
): SchedulerApi => {
  const addObserver = (item: ObserverComponent) => {
    dispatch.current({
      type: SchedulerActionType.AddObserver,
      item,
    });
  };

  const removeObserver = (item: ObserverComponent) => {
    dispatch.current({
      type: SchedulerActionType.RemoveObserver,
      item,
    });
  };

  const addObservable = (item: ObservableComponent) => {
    dispatch.current({
      type: SchedulerActionType.AddObservable,
      item,
    });
  };

  const removeObservable = (item: ObservableComponent) => {
    dispatch.current({
      type: SchedulerActionType.RemoveObservable,
      item,
    });
  };

  return {
    state: state.current,
    // Old Scheduler Add...
    add: (item: SchedulerItem) => {
      item.onBoundsChanged = () => {
        console.log("on bounds changed");
      };
      dispatch.current({
        type: SchedulerActionType.Add,
        item,
      });
    },
    remove: (item: SchedulerItem) => {
      dispatch.current({
        type: SchedulerActionType.Remove,
        item,
      });
    },
    updateItems: (items: SchedulerItem[]) => {
      dispatch.current({
        type: SchedulerActionType.UpdateItems,
        items,
      });
    },
    // New...
    addObserver,
    removeObserver,
    addObservable,
    removeObservable,
  };
};
