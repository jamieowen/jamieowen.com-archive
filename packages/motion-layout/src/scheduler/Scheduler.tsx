import React, { Component } from "react";
import { SchedulerContextApi, SchedulerProps, SchedulerContext } from "./types";
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
      console.log("Register Schedule child");
      this.children.add(child);
      this.changed.push(child);
    },
    unregister: (child: IScheduledComponent) => {
      console.log("Unregister Schedule child");
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
    console.log("Scheduler Updated. ", this.changed.length);
    this.invalidate();
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
      console.log("Delay Service :", this.changed.length);
      const service = comp.getService();
      // service.state.
      service.send({ type: "QUEUE", timestamp: time, delay: i * 200 });
    });
    this.invalidated = false;
    this.changed = [];
  };

  render() {
    const { children } = this.props;
    console.log(">> Render Scheduler!!!");

    return (
      <SchedulerContext.Provider value={this.contextApiValue}>
        <Group>{children}</Group>
      </SchedulerContext.Provider>
    );
  }
}
