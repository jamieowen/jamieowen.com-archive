import React, {
  ContextType,
  Component,
  ReactNode,
  createRef,
  RefObject,
} from "react";
import { StateValue } from "xstate";
import { LayoutGroupContext, LayoutGroupInfo } from "./LayoutGroup";
import { createInterpreter, ScheduleInterpreter } from "./state-machine";
import { LayoutObserverApi, LayoutObserverContext } from "./LayoutObserver";
import { SchedulerContext } from "./Scheduler";

/** React State & Props Definitions */
interface ScheduleProps {
  // defer mount until mount state is entered.??
  // this is not always desirable, as would prevent DOM layout on elements.
  defer?: boolean;
  // tags to manually apply to this schedule
  tags?: string[];

  children: (state: ScheduleRenderChildState) => ReactNode;
}

/** Regular React State */
interface ScheduleState {
  xstate: StateValue;
  tags: Tags;
  ratio: number;
}

type Tags = Set<string>;

/** Render State passed to render child. */
export interface ScheduleRenderChildState {
  state: string;
  group: string;
  ratio: number;
  tags: Tags;
  ref: RefObject<Element>;
  onComplete: () => void;
  // potentially?
  // mounted or ready as boolean
}

export class Schedule extends Component<ScheduleProps, ScheduleState> {
  static contextType = SchedulerContext;
  context!: ContextType<typeof SchedulerContext>;
  fsm: ScheduleInterpreter;
  observerContextApi!: LayoutObserverApi;
  domRef: RefObject<Element> = createRef();

  getService() {
    return this.fsm;
  }

  // Return sortable fields.
  // i.e. group, x,y, width, height

  constructor(props: any) {
    super(props);

    this.fsm = createInterpreter();
    this.fsm.onTransition((state) => {
      this.setState({ xstate: state.value });
    });
    this.fsm.onChange((context) => {
      this.setState({
        ratio: context.ratio,
      });
    });

    this.state = {
      xstate: this.fsm.initialState.value,
      tags: this.fsm.initialState.context.tags,
      ratio: 0,
    };
  }

  componentDidMount() {
    this.fsm.start();
    this.context.register(this);
    if (this.domRef.current) {
      this.observerContextApi.observe(
        this.domRef.current,
        this.onIntersectionObserverEntry
      );
    }
  }

  componentWillUnmount() {
    this.fsm.stop();
    this.context.unregister(this);
    if (this.domRef.current) {
      this.observerContextApi.unobserve(this.domRef.current);
    }
  }

  onIntersectionObserverEntry = (entry: IntersectionObserverEntry) => {
    this.context.onIntersectionObserverEntry(this, entry);
  };

  setPendingState(state: Partial<Exclude<ScheduleState, "">>) {}

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
    const { tags } = this.state;

    // Not keen on this ref but no access to multiple contexts with class components?
    // Because of this, register happens on mount
    this.observerContextApi = observerApi;

    // console.log("RENDER SCHEDULE");
    const renderState: ScheduleRenderChildState = {
      state: this.state.xstate as any,
      group: group.groupName,
      ratio: this.state.ratio,
      ref: this.domRef,
      onComplete: () => {},
      tags,
    };

    return children(renderState);
  }
}

export const Layout = Schedule;
