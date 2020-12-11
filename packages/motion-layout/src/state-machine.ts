import { MachineConfig, Interpreter, createMachine, interpret } from "xstate";

/** XState Definitions */
export interface ScheduleStateContext {
  // tags: Tags;
}

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
  initial: "initialise",
  context: {
    tags: new Set(),
    fields: new Map(),
  },
  states: {
    initialise: {
      on: {
        QUEUE: "queued",
      },
    },
    queued: {
      after: {
        // delay to move to the mount state - delay time passed by Scheduler xstate event.
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

export const createInterpreter = (): ScheduleInterpreter =>
  interpret(
    createMachine(scheduleMachine, {
      delays: {
        SCHEDULED_DELAY: (_context, event) => {
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
