import React, { Component } from "react";
import {
  IntersectionState,
  Observable,
  TransitionState,
} from "../observable/Observable";
import { Observer } from "../observable/Observer";
import {
  ObservableChangeEvent,
  SchedulerContextApi,
  SchedulerProps,
  SchedulerContext,
} from "./types";
import { Interpreter, EventObject } from "xstate";
import { Group } from "./Group";
import {
  ScheduleEvent,
  ScheduleStateContext,
  ScheduleStateSchema,
} from "./Schedule";

// export interface IScheduledComponent<C, S, E extends EventObject> {
export interface IScheduledComponent<
  C extends ScheduleStateContext = ScheduleStateContext,
  S extends ScheduleStateSchema = ScheduleStateSchema,
  E extends EventObject = ScheduleEvent
> {
  getService(): Interpreter<C, S, E>;
}

/**
 *
 * --
 * Scheduler
 * --
 *
 */

export class Scheduler extends Component<SchedulerProps, {}> {
  private children: Set<IScheduledComponent> = new Set();
  private invalidated: boolean = false;
  private changed: IScheduledComponent[] = [];

  contextApiValue: SchedulerContextApi = {
    register: (child: IScheduledComponent) => {
      this.children.add(child);
      this.changed.push(child);
    },
    unregister: (child: IScheduledComponent) => {
      this.children.delete(child);
    },
    notifyChange: (events) => {
      // this.observablesChanged = [...this.observablesChanged, ...events];
      this.invalidate();
    },
  };

  componentDidMount() {
    console.log("<Scheduler> did mount", this.children);
    this.invalidate();
  }
  componentDidUpdate() {
    console.log("Scheduler Updated. ");
  }

  shouldComponentUpdate() {
    return true;
  }

  invalidate() {
    if (!this.invalidated) {
      this.invalidated = true;
      requestAnimationFrame(this.onRequestFrameCallback);
    }
  }

  onRequestFrameCallback: FrameRequestCallback = (time: number) => {
    // This could be built into a parent state machine? ( via actor spawning... later )
    // after a given 'capture' time,
    // all changed items are filtered and sorted into
    // groups, and notified to transition to their next state.
    // this needs to
    this.changed.forEach((comp, i) => {
      const service = comp.getService();
      service.send({ type: "QUEUE", timestamp: time, delay: i * 200 });
    });
    this.changed = [];
  };

  render() {
    const { children } = this.props;
    console.log(">> Render New, New Scheduler!");

    return (
      <SchedulerContext.Provider value={this.contextApiValue}>
        {/* <Observer>{children}</Observer> */}
        <Group>{children}</Group>
      </SchedulerContext.Provider>
    );
  }
}
