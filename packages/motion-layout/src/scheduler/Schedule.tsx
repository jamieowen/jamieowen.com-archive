import React, { ContextType, Component, ReactNode } from "react";
import { SchedulerContext } from "./types";
import { createMachine, interpret, Interpreter, MachineConfig } from "xstate";
import { IScheduledComponent } from "./Scheduler";
import { GroupContext } from "./Group";

interface ScheduleProps {
  defer?: boolean;
  children: (state: any) => ReactNode;
}

export interface ScheduleStateContext {}

export interface ScheduleStateSchema {
  states: {
    initialise: {};
    queued: {};
    mount: {};
    mounted: {};
    unmount: {};
    unmounted: {};
  };
}

export type ScheduleEvent =
  | { type: "QUEUE"; timestamp: number; delay: number }
  | { type: "MOUNT" }
  | { type: "UNMOUNT" };

const scheduleMachine: MachineConfig<
  ScheduleStateContext,
  ScheduleStateSchema,
  ScheduleEvent
> = {
  initial: "initialise",
  context: {
    hello: "there",
  },
  states: {
    initialise: {
      on: {
        QUEUE: "queued",
      },
    },
    queued: {
      after: {
        SCHEDULED_DELAY: "mount",
      },
    },
    mount: {},
    mounted: {
      on: {
        UNMOUNT: "unmount",
      },
    },
    unmount: {
      after: {
        SCHEDULED_DELAY: "mount",
      },
    },
    unmounted: {
      type: "final",
    },
  },
};

export class Schedule
  extends Component<ScheduleProps>
  implements IScheduledComponent {
  static contextType = SchedulerContext;
  context!: ContextType<typeof SchedulerContext>;
  fsm: Interpreter<ScheduleStateContext, ScheduleStateSchema, ScheduleEvent>;

  getService() {
    return this.fsm;
  }

  // Return sortable fields.
  // i.e. group, x,y, width, height

  constructor(props: any) {
    super(props);
    this.fsm = interpret(
      createMachine(scheduleMachine, {
        delays: {
          SCHEDULED_DELAY: (context, event) => {
            console.log(" DELAY ", event);
            if (event.type === "QUEUE") {
              return event.delay;
            } else {
              return 0;
            }
          },
        },
      })
    );

    this.fsm.onTransition((state, event) => {
      this.setState({ fsm: state.value });
    });

    this.state = {
      fsm: this.fsm.initialState.value,
    };
  }

  componentDidMount() {
    this.context.register(this);
    this.fsm.start();
  }

  componentWillUnmount() {
    this.fsm.stop();
    this.context.unregister(this);
  }

  render() {
    return (
      <GroupContext.Consumer>
        {(value) => this.renderWithGroup(value)}
      </GroupContext.Consumer>
    );
  }

  renderWithGroup(group) {
    const { children, defer = false } = this.props;
    const state = this.state.fsm + " " + group.groupName;
    if (defer) {
      // defer mount until mount state is entered.
      // this is not always desirable, as would prevent DOM layout on elements.
    } else {
      return children(state);
    }
  }
}
