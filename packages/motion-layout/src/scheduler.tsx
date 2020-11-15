import React, {
  Component,
  ContextType,
  createContext,
  createRef,
  ReactNode,
  RefObject,
} from "react";

// Types
interface SchedulerProps {
  children: ReactNode;
}

interface RegisterComponent<C = Observable> {
  register(component: C): void;
  unregister(component: C): void;
}

interface NotifyObservableChange {
  notifyChange(events: ObservableChangeEvent[]): void;
}

interface ObservableChangeEvent {
  entry: IntersectionObserverEntry;
  component: Observable;
}

type SchedulerContextApi = RegisterComponent<Observable | Observer> &
  NotifyObservableChange;

interface ObserverProps {
  children?: ReactNode | ((name: string) => ReactNode);
}

type ObserverContextApi = RegisterComponent & NotifyObservableChange;

interface ObservableProps {
  children: (domRef: RefObject<Element>, state: ObservableState) => ReactNode;
  delay?: number;
}

type TransitionState =
  | "initialise"
  | "queued"
  | "entered"
  | "idle"
  | "exited"
  | "focus"
  | "defocus";

type IntersectionState = "pending" | "in-view" | "out-of-view";
interface ObservableState {
  intersectionState: IntersectionState;
  transitionState: TransitionState;
  intersectionRatio: number;
}

const SchedulerContext = createContext<SchedulerContextApi>(null!);

/**
 *
 * --
 * Scheduler
 * --
 *
 */

export class Scheduler extends Component<SchedulerProps, {}> {
  private observers: Set<Observer> = new Set();

  private observables: Set<Observable> = new Set();

  private observablesChanged: ObservableChangeEvent[] = [];

  private invalidated: boolean = false;

  addObserver(component: Observer) {
    this.observers.add(component);
  }

  removeObserver(component: Observer) {
    this.observers.delete(component);
  }

  addObservable(observable: Observable) {
    this.observables.add(observable);
  }

  removeObservable(observable: Observable) {
    this.observables.add(observable);
  }

  contextApiValue: SchedulerContextApi = {
    register: (component) => {
      if (component instanceof Observer) {
        this.addObserver(component);
      } else {
        this.addObservable(component);
      }
    },
    unregister: (component) => {
      if (component instanceof Observer) {
        this.removeObserver(component);
      } else {
        this.removeObservable(component);
      }
    },
    notifyChange: (events) => {
      this.observablesChanged = [...this.observablesChanged, ...events];
      this.invalidate();
    },
  };

  componentDidMount() {
    console.log("<Scheduler> did mount", this.observables, this.observers);
  }
  componentDidUpdate() {
    console.log("Scheduler Updated. ", this.observables, this.observers);
  }

  shouldComponentUpdate() {
    return true;
  }

  invalidate() {
    if (!this.invalidated) {
      this.invalidated = true;
      requestAnimationFrame(this.tick);
    }
  }

  private tick: FrameRequestCallback = (time: number) => {
    console.log("Tick");
    this.invalidated = false;
    if (this.observablesChanged.length > 0) {
      this.commitObservableChanges();
    }
  };

  commitObservableChanges() {
    // Update changed observables to their new state.
    this.observablesChanged.forEach((ev) => {
      if (!ev.component) {
        console.warn("hot loading? fails... ");
        return;
      }
      const { isIntersecting, intersectionRatio } = ev.entry;
      let intersectionState: IntersectionState;
      let transitionState: TransitionState;

      if (isIntersecting) {
        intersectionState = "in-view";
      } else {
        intersectionState = "out-of-view";
      }
      ev.component.setState({
        intersectionState,
        intersectionRatio,
      });
    });
    this.observablesChanged = [];
  }

  render() {
    const { children } = this.props;
    console.log(">> Render New, New Scheduler!");

    return (
      <SchedulerContext.Provider value={this.contextApiValue}>
        <Observer>{children}</Observer>
      </SchedulerContext.Provider>
    );
  }
}

/**
 *
 * --
 * Observer
 * --
 *
 */

const ObserverContext = createContext<ObserverContextApi>(null!);

export class Observer extends Component<ObserverProps, {}> {
  static contextType = SchedulerContext;
  context!: ContextType<typeof SchedulerContext>;

  domRef: RefObject<Element> = createRef();

  observer!: IntersectionObserver;

  observablesByEle: Map<Element, Observable> = new Map();

  /**
   * Exposes methods accessible by Observables.
   */
  contextApiValue: ObserverContextApi = {
    register: (component: Observable) => {
      if (!component.domRef.current) {
        throw new Error("Observables must have a domRef set.");
      }
      this.observablesByEle.set(component.domRef.current, component);
      this.context.register(component);
    },
    unregister: (component: Observable) => {
      this.observablesByEle.delete(component.domRef.current!);
      this.context.unregister(component);
    },
    notifyChange: (events) => {
      this.context.notifyChange(events);
    },
  };

  /**
   * Create the Observer object and subscribe any pending
   * observables created during startup.
   */
  componentDidMount() {
    console.log("observer register...");

    this.observer = new IntersectionObserver(this.onObserverCallback, {
      root: this.domRef.current,
      rootMargin: "-25%",
      threshold: [0, 0.5, 1],
    });

    // Add observables registered during mount
    for (let ele of this.observablesByEle.keys()) {
      this.observer.observe(ele);
    }

    this.context.register(this);
  }

  componentWillUnmount() {
    this.context.unregister(this);
  }

  onObserverCallback: IntersectionObserverCallback = (entries) => {
    const events = entries.map(
      (entry): ObservableChangeEvent => {
        return {
          component: this.observablesByEle.get(entry.target)!,
          entry,
        };
      }
    );
    this.context.notifyChange(events);
  };

  render() {
    const { children } = this.props;

    let _children;
    if (typeof children === "function") {
      _children = children("");
    } else {
      _children = children;
    }

    return (
      <ObserverContext.Provider value={this.contextApiValue}>
        {_children}
      </ObserverContext.Provider>
    );
  }
}

/**
 *
 * --
 * Observable
 * --
 *
 */

export class Observable extends Component<ObservableProps, ObservableState> {
  static contextType = ObserverContext;

  context!: ContextType<typeof ObserverContext>;

  domRef: RefObject<HTMLElement> = createRef();

  state: ObservableState = {
    intersectionRatio: 0,
    intersectionState: "pending",
    transitionState: "initialise",
  };

  componentDidMount() {
    console.log("observable register...");
    this.context.register(this);
  }

  componentWillUnmount() {
    this.context.unregister(this);
  }

  layoutUpdate(state: Partial<ObservableState>) {
    // update bounds,
    // intersectino
    // state
    // delta
    this.setState(state);
  }

  render() {
    const {
      intersectionState,
      transitionState,
      intersectionRatio,
    } = this.state;
    // const item = { state: intersectionState };
    const item = { state: intersectionRatio };
    const { children } = this.props;
    return children(this.domRef, this.state);
  }
}
