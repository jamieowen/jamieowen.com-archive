import React, {
  ContextType,
  Component,
  ReactNode,
  createRef,
  RefObject,
} from "react";
import { LayoutGroupContext, LayoutGroupInfo } from "./LayoutGroup";
import { LayoutObserverApi, LayoutObserverContext } from "./LayoutObserver";
import { SchedulerContext } from "./Scheduler";

/** React State & Props Definitions */
export interface ScheduleProps {
  // defer mount until mount state is entered.??
  // this is not always desirable, as would prevent DOM layout on elements.
  defer?: boolean;
  // tags to manually apply to this schedule
  tags?: string[];

  children: (state: ScheduleRenderChildState) => ReactNode;
}

export type StateString = {
  visibility: "hidden" | "visible";
  mount: "mounted" | "unmounted";
};

export type Intersection = {
  ratio: number;
  edge: "left" | "right" | "top" | "bottom" | "none";
};

/** Regular React State */
export interface IScheduleState {
  tags: Tags;
  intersection: Intersection;
  state: StateString;
  pendingState: StateString | null;
}

export type Tags = Set<string>;

/** Render State passed to render child. */
export interface ScheduleRenderChildState {
  state: StateString;
  isect: Intersection;
  intersection: Intersection;
  ref: RefObject<any>;
  // onComplete: () => void;
  // potentially?
  // mounted or ready as boolean
}

export class Schedule extends Component<ScheduleProps, IScheduleState> {
  static contextType = SchedulerContext;
  context!: ContextType<typeof SchedulerContext>;
  observerContextApi!: LayoutObserverApi;
  domRef: RefObject<any> = createRef(); // types ? LegacyRef error
  activeTimeout: any;
  // Return sortable fields.
  // i.e. group, x,y, width, height

  constructor(props: any) {
    super(props);

    this.state = {
      tags: new Set(),
      intersection: {
        ratio: 0,
        edge: "none",
      },
      state: {
        mount: "unmounted",
        visibility: "hidden",
      },
      pendingState: null,
    };
  }

  componentDidMount() {
    this.context.register(this);
    if (this.domRef.current) {
      this.observerContextApi.observe(
        this.domRef.current,
        this.onIntersectionObserverEntry
      );
    }
  }

  componentWillUnmount() {
    this.context.unregister(this);
    clearTimeout(this.activeTimeout);
    if (this.domRef.current) {
      this.observerContextApi.unobserve(this.domRef.current);
    }
  }

  onIntersectionObserverEntry = (entry: IntersectionObserverEntry) => {
    this.context.onIntersectionObserverEntry(this, entry);
  };

  setIntersectionEntry(entry: IntersectionObserverEntry) {
    this.setState({
      intersection: {
        ratio: entry.intersectionRatio,
        edge: "none",
      },
    });
  }

  setPendingStateString(state: Partial<StateString>, delay: number) {
    clearTimeout(this.activeTimeout);

    if (delay > 0) {
      this.setState({
        pendingState: { ...this.state.state, ...state },
      });
      this.activeTimeout = setTimeout(() => {
        this.commitPendingState();
      }, delay);
    } else {
      this.setState({
        state: { ...this.state.state, ...state },
      });
    }
  }

  commitPendingState() {
    clearTimeout(this.activeTimeout);
    if (this.state.pendingState) {
      this.setState({
        state: { ...this.state, ...this.state.pendingState },
        pendingState: null,
      });
    }
  }

  render() {
    return (
      <LayoutGroupContext.Consumer>
        {(groupInfo) => (
          <LayoutObserverContext.Consumer>
            {(observerApi) => this.renderWithContexts(groupInfo, observerApi)}
          </LayoutObserverContext.Consumer>
        )}
      </LayoutGroupContext.Consumer>
    );
  }

  renderWithContexts(group: LayoutGroupInfo, observerApi: LayoutObserverApi) {
    const { children, defer = false } = this.props;
    // const { tags } = this.state;

    // Not keen on this ref but no access to multiple contexts with class components?
    // Because of this, register happens on mount
    this.observerContextApi = observerApi;

    return children({
      ref: this.domRef,
      intersection: this.state.intersection,
      isect: this.state.intersection,
      state: this.state.state,
    });
  }
}

export const Layout = Schedule;
