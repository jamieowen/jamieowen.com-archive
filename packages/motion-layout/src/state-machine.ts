import {
  MachineConfig,
  Interpreter,
  createMachine,
  interpret,
  StateSchema,
  assign,
} from "xstate";

/** XState Definitions */
export interface ScheduleStateContext {
  // tags: Tags;
  visible: boolean;
  entry: IntersectionObserverEntry;
  ratio: number;
}

export interface ScheduleStateSchema extends StateSchema {
  states: {
    mount: {
      states: {
        initialise: {};
        queue_mount: {};
        mount: {};
        mounted: {};
        unmount: {};
        unmounted: {};
      };
    };
    visibility: {
      states: {
        visible: {};
        hidden: {};
      };
    };
    intersect: {
      states: {
        left: {};
        right: {};
        top: {};
        bottom: {};
        none: {};
      };
    };
  };
}

export type ScheduleEvent =
  | { type: "QUEUE"; timestamp: number; delay: number }
  | { type: "MOUNT"; timestamp: number; delay: number }
  | { type: "MOUNTED"; timestamp: number; delay: number }
  | { type: "UNMOUNT"; timestamp: number; delay: number }
  | { type: "UNMOUNTED"; timestamp: number; delay: number }
  | { type: "INTERSECT"; entry: IntersectionObserverEntry }
  | { type: "VISIBILITY"; entry: IntersectionObserverEntry };

export type ScheduleInterpreter = Interpreter<
  ScheduleStateContext,
  ScheduleStateSchema,
  ScheduleEvent
>;

export const scheduleMachine: MachineConfig<
  ScheduleStateContext,
  ScheduleStateSchema,
  ScheduleEvent
> = {
  initial: "mount",
  type: "parallel",
  context: {
    visible: false,
    ratio: 0,
    entry: null!,
  },
  states: {
    mount: {
      initial: "initialise",
      states: {
        initialise: {
          on: {
            MOUNT: "queue_mount",
          },
        },
        queue_mount: {
          after: {
            // delay to move to the mount state - delay time passed by Scheduler xstate event.
            SCHEDULED_DELAY: "mount",
          },
        },
        mount: {
          on: {
            MOUNTED: "mounted",
          },
        },
        mounted: {
          on: {
            UNMOUNT: "unmount",
          },
        },
        unmount: {
          on: {
            UNMOUNTED: "unmounted",
          },
        },
        unmounted: {},
      },
    },
    visibility: {
      initial: "hidden",
      states: {
        visible: {
          on: {
            INTERSECT: [
              {
                target: "hidden",
                cond: (_context, event) => !event.entry.isIntersecting,
              },
              {
                actions: assign((context, event) => {
                  return {
                    ...context,
                    entry: event.entry,
                    ratio: event.entry.intersectionRatio,
                    visible: event.entry.isIntersecting,
                  };
                }),
              },
            ],
          },
        },
        hidden: {
          on: {
            INTERSECT: [
              {
                target: "visible",
                cond: (_context, event) => event.entry.isIntersecting,
              },
              {
                actions: assign((context, event) => {
                  return {
                    ...context,
                    entry: event.entry,
                    ratio: event.entry.intersectionRatio,
                    visible: event.entry.isIntersecting,
                  };
                }),
              },
            ],
          },
        },
      },
    },
    intersect: {
      initial: "none",
      states: {
        left: {},
        right: {},
        top: {},
        bottom: {},
        none: {},
      },
    },
  },
};

// state options.
// initialise
// mount -> DELAY
// mounted

// mount as one state.
// visible as another
// visible.hidden
// visible.visible.
// intersect.left , top , bottom , right

export const createInterpreter = (): ScheduleInterpreter =>
  interpret(
    createMachine(scheduleMachine, {
      delays: {
        SCHEDULED_DELAY: (_context, event) => {
          // console.log(" DELAY ", event);
          if (event.type === "QUEUE") {
            return event.delay;
          } else {
            return 0;
          }
        },
      },
    })
  );