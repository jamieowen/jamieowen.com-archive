import { Stream } from "@thi.ng/rstream";
import { MutableRefObject } from "react";
/**
 * Types
 */
export type SchedulerState = {
  items: SchedulerItem[];
  observables: ObservableComponent[];
  observers: ObserverComponent[];
  pendingUpdates: ObservableComponent[];
};

export type SchedulerApi = {
  state: SchedulerState;
  add: (item: SchedulerItem) => void;
  remove: (item: SchedulerItem) => void;
  updateItems: (items: SchedulerItem[]) => void;
  // New
  addObserver: (item: ObserverComponent) => void;
  removeObserver: (item: ObserverComponent) => void;
  addObservable: (item: ObservableComponent) => void;
  removeObservable: (item: ObservableComponent) => void;
};

export enum SchedulerActionType {
  Add = "add",
  Remove = "remove",
  UpdateItems = "update-items",
  // New
  AddObserver = "add-observer",
  RemoveObserver = "remove-observer",
  AddObservable = "add-observable",
  RemoveObservable = "remove-observable",
}

export interface ISchedulerAddAction {
  type: SchedulerActionType.Add;
  item: SchedulerItem;
}

export interface ISchedulerRemoveAction {
  type: SchedulerActionType.Remove;
  item: SchedulerItem;
}

export interface ISchedulerUpdateItemsAction {
  type: SchedulerActionType.UpdateItems;
  items: SchedulerItem[];
}

// New

export interface ISchedulerAddObserverAction {
  type: SchedulerActionType.AddObserver;
  item: ObserverComponent;
}
export interface ISchedulerRemoveObserverAction {
  type: SchedulerActionType.RemoveObserver;
  item: ObserverComponent;
}

export interface ISchedulerAddObservableAction {
  type: SchedulerActionType.AddObservable;
  item: ObservableComponent;
}
export interface ISchedulerRemoveObservableAction {
  type: SchedulerActionType.RemoveObservable;
  item: ObservableComponent;
}

export type SchedulerAction =
  // Legacy
  | ISchedulerAddAction
  | ISchedulerRemoveAction
  | ISchedulerUpdateItemsAction
  // New
  | ISchedulerAddObserverAction
  | ISchedulerRemoveObserverAction
  | ISchedulerAddObservableAction
  | ISchedulerRemoveObservableAction;

export type SchedulerProviderProps = {};

export type BoundsInfo = {
  // entry:
};

export type SchedulerItemOwner = any;

export type SchedulerItem = {
  // The component that requested/created the item. ( an observer context )
  owner: SchedulerItemOwner;
  // Target dom element.
  domRef: MutableRefObject<Element>;
  // Bounds of the element
  bounds: BoundsInfo;
  // State
  state: string;
  // Event Handlers.
  // Bounds updated by observer context.
  onBoundsChanged: any;
  // State updated by scheduler context
  onStateChanged: any;
};

// New..
export type ObserverComponent = {
  observerRef: MutableRefObject<IntersectionObserver>;
  // Dom objects are not always needed for Observers.
  // In the case of IntersectionObserver, a 'root' target is optional, otherwise it uses document.window
  domRef?: MutableRefObject<Element>;
  // During startup an Observer may not be ready, an Observable appends to this..
  pendingObservables: ObservableComponent[];
  // Still
  changeStream: Stream<Parameters<IntersectionObserverCallback>>;
};

export type ObservableComponent = {
  owner: ObserverComponent;
  domRef: MutableRefObject<Element>;
  state: "pending" | "initialise" | "ready";
};

// Factory Methods
export const createObserverComponent = (
  observerRef: MutableRefObject<IntersectionObserver>,
  domRef?: MutableRefObject<Element>
): ObserverComponent => {
  return {
    observerRef,
    domRef,
    changeStream: new Stream(),
    pendingObservables: [],
  };
};

export const createObservableComponent = (
  owner: ObserverComponent,
  domRef: MutableRefObject<Element>
): ObservableComponent => {
  return {
    owner,
    domRef,
    state: "pending",
  };
};
