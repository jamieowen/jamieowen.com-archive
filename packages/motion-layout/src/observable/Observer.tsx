import React, {
  Component,
  ContextType,
  createContext,
  createRef,
  ReactNode,
  RefObject,
} from "react";
import {
  NotifyObservableChange,
  ObservableChangeEvent,
  RegisterComponent,
  SchedulerContext,
} from "../scheduler/types";
import { Observable } from "./Observable";
/**
 *
 * --
 * Observer
 * --
 *
 */

export interface ObserverProps {
  children?: ReactNode | ((name: string) => ReactNode);
}

export type ObserverContextApi = RegisterComponent & NotifyObservableChange;

export const ObserverContext = createContext<ObserverContextApi>(null!);

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
      // this.context.register(component);
    },
    unregister: (component: Observable) => {
      this.observablesByEle.delete(component.domRef.current!);
      // this.context.unregister(component);
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

    // this.context.register(this);
  }

  componentWillUnmount() {
    // this.context.unregister(this);
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
