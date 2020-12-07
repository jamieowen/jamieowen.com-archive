import { MutableRefObject } from "react";

export interface IIntersectionContextState {
  observer: IntersectionObserver;
  observed: WeakMap<Element, IntersectionObject>;
  objects: IntersectionObject[];
  add: (obj: IntersectionObject) => void;
  remove: (obj: IntersectionObject) => void;
  updateDomRef: (obj: IntersectionObject) => void;
}

export type IntersectionObject = {
  ref: MutableRefObject<IntersectionObject>;
  domRef: MutableRefObject<Element>;
  state: "hidden" | "visible";
  sortOrder: number;
  onChange: (obj: IntersectionObject) => void;
  entry: IntersectionObserverEntry;
  bottom: boolean;
  top: boolean;
  left: boolean;
  right: boolean;
  ratio: number;
};

export class IntersectionManager implements IIntersectionContextState {
  observer: IntersectionObserver;
  objects: IntersectionObject[] = [];
  observed: WeakMap<Element, IntersectionObject> = new WeakMap();

  constructor() {
    this.observer = new IntersectionObserver(this.onObserverCallback, {
      root: undefined,
      rootMargin: undefined,
      threshold: [0, 0.5, 1],
    });
  }
  private onObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const item = this.observed.get(entry.target);
      item.entry = entry;
      item.ratio = entry.intersectionRatio;
      item.bottom = entry.intersectionRect.bottom === entry.rootBounds.bottom;
      item.top = entry.intersectionRect.top === entry.rootBounds.top;
      item.left = entry.intersectionRect.left === entry.rootBounds.left;
      item.right = entry.intersectionRect.right === entry.rootBounds.right;
      item.onChange(item);
    }
  };
  add(obj: IntersectionObject) {
    this.objects.push(obj);
  }
  remove(obj: IntersectionObject) {
    const idx = this.objects.indexOf(obj);
    this.objects.splice(idx, 1);
    const domElement = obj.domRef.current;
    if (this.observed.has(domElement)) {
      this.observer.unobserve(domElement);
      this.observed.delete(domElement);
    }
  }
  updateDomRef(obj: IntersectionObject) {
    const domElement = obj.domRef.current;
    if (domElement && !this.observed.has(domElement)) {
      this.observed.set(domElement, obj);
      this.observer.observe(domElement);
    }
  }
}
