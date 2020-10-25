import { MutableRefObject, useRef } from "react";

export type BoundsInfo = {
  // entry:
};

export type SchedulerItemOwner = any;

export type SchedulerItem = {
  // The component that requested/created the item.
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
