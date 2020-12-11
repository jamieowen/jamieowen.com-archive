import React, { Component, createContext, ReactNode } from "react";
import { LayoutGroup } from "./LayoutGroup";
import { Schedule } from "./Schedule";
import { LayoutObserver } from "./LayoutObserver";

interface SchedulerApi {
  register: (child: Schedule) => void;
  unregister: (child: Schedule) => void;
  notifyChange: () => void;
}

export interface SchedulerProps {
  children: ReactNode;
}

export const SchedulerContext = createContext<SchedulerApi>(null!);

export class Scheduler extends Component<SchedulerProps, {}> {
  private children: Set<Schedule> = new Set();
  private invalidated: boolean = false;
  private changed: Schedule[] = [];

  contextApiValue: SchedulerApi = {
    register: (child: Schedule) => {
      this.children.add(child);
      this.changed.push(child);
    },
    unregister: (child: Schedule) => {
      this.children.delete(child);
    },
    notifyChange: () => {
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
        <LayoutObserver>
          <LayoutGroup>{children}</LayoutGroup>
        </LayoutObserver>
      </SchedulerContext.Provider>
    );
  }
}
