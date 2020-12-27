import React, {
  Component,
  createContext,
  createRef,
  MutableRefObject,
  ReactNode,
  RefObject,
  useContext,
} from "react";

export interface LayoutObserverProps {
  children?: ReactNode | ((ref: MutableRefObject<Element>) => ReactNode);
  rootMargin?: string;
  threshold?: number[];
  thresholdSteps?: number;
}

type CallbackEntryFn = (entry: IntersectionObserverEntry) => void;
export type LayoutObserverApi = {
  observe: (element: Element, handler: CallbackEntryFn) => void;
  unobserve: (element: Element) => void;
  observing: (elmeent: Element) => boolean;
};

export const LayoutObserverContext = createContext<LayoutObserverApi>(null!);
export const useLayoutObserver = () => useContext(LayoutObserverContext);

export class LayoutObserver extends Component<LayoutObserverProps, {}> {
  domRef: RefObject<Element> = createRef();
  observer!: IntersectionObserver;
  observed: Map<Element, CallbackEntryFn> = new Map();

  componentDidMount() {
    this.createIntersectionObserver();
  }

  componentWillUnmount() {
    this.observer.disconnect();
    for (let key of this.observed.keys()) {
      this.observed.delete(key);
    }
  }

  contextApiValue: LayoutObserverApi = {
    observe: (ele, handler) => {
      this.observed.set(ele, handler);
      if (this.observer) {
        this.observer.observe(ele);
      } // otherwise, we are likely mounting.  in which case it will be added after
    },
    unobserve: (ele) => {
      this.observed.delete(ele);
      if (this.observer) {
        this.observer.unobserve(ele);
      }
    },
    observing: (ele) => {
      return this.observed.has(ele);
    },
  };

  private createIntersectionObserver() {
    const { rootMargin = "0%", threshold, thresholdSteps = 25 } = this.props;
    let levels = threshold ? threshold : null;
    if (!levels) {
      let step = 1 / (Math.max(2, thresholdSteps) - 1);
      levels = new Array(thresholdSteps).fill(0).map((_x, i) => i * step);
    }

    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver(this.onLayoutObserverCallback, {
      root: this.domRef.current,
      rootMargin,
      threshold: levels,
    });

    // Add observables registered during mount, on after observer re-instantiate
    for (let ele of this.observed.keys()) {
      this.observer.observe(ele);
    }
  }

  onLayoutObserverCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      const ele = entry.target;
      const callback = this.observed.get(ele);
      if (callback) {
        callback(entry);
      }
    });
  };

  render() {
    const { children } = this.props;

    let _children;
    if (typeof children === "function") {
      _children = children(this.domRef);
    } else {
      _children = children;
    }

    return (
      <LayoutObserverContext.Provider value={this.contextApiValue}>
        {_children}
      </LayoutObserverContext.Provider>
    );
  }
}
