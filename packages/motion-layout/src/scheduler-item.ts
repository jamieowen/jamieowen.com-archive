import { MutableRefObject, useRef } from "react";

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
