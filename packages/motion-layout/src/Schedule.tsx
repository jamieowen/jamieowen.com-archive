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
  tags: string[];

  children: (state: ScheduleRenderChildState) => ReactNode;
}

/** Regular React State */
interface ScheduleState {
  xstate: StateValue;
  tags: Tags;
}

type Tags = Set<string>;

/** Render State passed to render child. */
export interface ScheduleRenderChildState {
  state: string;
  group: string;
  tags: Tags;
  onComplete: () => void;
  // potentially?
  // mounted or ready as boolean
}

export class Schedule extends Component<ScheduleProps, ScheduleState> {
  static contextType = SchedulerContext;
  context!: ContextType<typeof SchedulerContext>;
  fsm: ScheduleInterpreter;
  observerContextApi!: LayoutObserverApi;
  domRef: RefObject<HTMLElement> = createRef();

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

    this.state = {
      xstate: this.fsm.initialState.value,
      tags: this.fsm.initialState.context.tags,
    };
  }

  componentDidMount() {
    this.fsm.start();
    this.context.register(this);
  }

  componentWillUnmount() {
    this.fsm.stop();
    this.context.unregister(this);
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
    const { tags } = this.state;

    // Not keen on this refbut no access to multiple contexts.
    this.observerContextApi = observerApi;

    const renderState: ScheduleRenderChildState = {
      state: this.state.xstate as string,
      group: group.groupName,
      onComplete: () => {},
      tags,
    };

    return children(renderState);
  }
}

export const Layout = Schedule;
