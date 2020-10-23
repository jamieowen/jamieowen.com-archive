import { MutableRefObject } from "react";

export interface IObserverContextState {
  observer: IntersectionObserver;
  observed: WeakMap<Element, ObserverObject>;
  objects: ObserverObject[];
  add: (obj: ObserverObject) => void;
  remove: (obj: ObserverObject) => void;
  updateDomRef: (obj: ObserverObject) => void;
}

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

export const createObject = (ref, domRef, onStateChange): ObserverObject => {
  console.log("Create Object");
  return {
    ref,
    domRef,
    state: "initialise",
    sortOrder: 0,
    onChange: onStateChange,
    entry: undefined,
    bottom: false,
    top: false,
    left: false,
    right: false,
    ratio: 0,
  };
};

export class ObserverManager implements IObserverContextState {
  observer: IntersectionObserver;
  objects: ObserverObject[] = [];
  observed: WeakMap<Element, ObserverObject> = new WeakMap();

  constructor() {
    this.observer = new IntersectionObserver(this.onObserverCallback, {
      root: undefined,
      rootMargin: undefined,
      threshold: [0, 0.5, 1],
    });
  }
  private onObserverCallback = (entries: IntersectionObserverEntry[]) => {
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

        item.onChange(item);
      }
    }
  };
  add(obj: ObserverObject) {
    this.objects.push(obj);
  }
  remove(obj: ObserverObject) {
    const idx = this.objects.indexOf(obj);
    this.objects.splice(idx, 1);
    const domElement = obj.domRef.current;
    if (this.observed.has(domElement)) {
      this.observer.unobserve(domElement);
      this.observed.delete(domElement);
    }
  }
  updateDomRef(obj: ObserverObject) {
    const domElement = obj.domRef.current;
    if (domElement && !this.observed.has(domElement)) {
      this.observed.set(domElement, obj);
      this.observer.observe(domElement);
    }
  }
}
