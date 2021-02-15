import React, {
  Component,
  ContextType,
  createRef,
  ReactNode,
  RefObject,
} from "react";
import { ObserverContext } from "./Observer";

/**
 *
 * --
 * Observable
 * --
 *
 */

export type TransitionState =
  | "initialise"
  | "queued"
  | "entered"
  | "idle"
  | "exited"
  | "focus"
  | "defocus";

export type IntersectionState = "pending" | "in-view" | "out-of-view";
export interface ObservableState {
  intersectionState: IntersectionState;
  transitionState: TransitionState;
  intersectionRatio: number;
}

export interface ObservableProps {
  children: (domRef: RefObject<Element>, state: ObservableState) => ReactNode;
  delay?: number;
}

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
