import React, { Component, createContext, ReactNode } from "react";
import { LayoutGroup } from "./LayoutGroup";
import { Schedule } from "./Schedule";
import { LayoutObserver } from "./LayoutObserver";

interface SchedulerApi {
  register: (child: Schedule) => void;
  unregister: (child: Schedule) => void;
  onIntersectionObserverEntry: (
    child: Schedule,
    entry: IntersectionObserverEntry
  ) => void;
}

export interface SchedulerProps {
  children: ReactNode;
}

export const SchedulerContext = createContext<SchedulerApi>(null!);

export class Scheduler extends Component<SchedulerProps, {}> {
  private children: Set<Schedule> = new Set();
  private invalidated: boolean = false;
  private changedIntersections: Map<
    Schedule,
    IntersectionObserverEntry
  > = new Map();

  contextApiValue: SchedulerApi = {
    register: (child: Schedule) => {
      this.children.add(child);
      // this.changed.set(child);
    },
    unregister: (child: Schedule) => {
      this.children.delete(child);
    },
    onIntersectionObserverEntry: (
      child: Schedule,
      entry: IntersectionObserverEntry
    ) => {
      this.changedIntersections.set(child, entry);
      this.invalidate();
    },
  };

  componentDidMount() {
    // console.log("<Scheduler> did mount", this.children);
    this.invalidate();
  }
  componentDidUpdate() {
    // console.log("Scheduler Updated. ", this.changed);
    this.invalidate();
  }

  shouldComponentUpdate() {
    return true; //this.invalidated;
  }

  invalidate() {
    if (!this.invalidated) {
      this.invalidated = true;
      requestAnimationFrame(this.onRequestFrameCallback);
    }
  }

  onRequestFrameCallback: FrameRequestCallback = (time: number) => {
    this.commitIntersectionChanges(time);
  };

  /**
   * Commit changes to state machines, caused by
   * intersection observer events.
   * @param time
   */
  commitIntersectionChanges(time: number) {
    const entries = this.changedIntersections.entries();
    const changed = [];
    const changedVisible = [];

    // Create events and categorise for assigning delay sequence
    for (let [schedule, entry] of entries) {
      const state = {
        entry,
        delay: 0,
        schedule,
        timestamp: time,
      };

      changed.push(state);

      if (entry.isIntersecting) {
        changedVisible.push(state);
      }
    }

    // Assign Sort Order
    changedVisible.forEach((state, i) => {
      state.delay = (i + 1) * 50;
    });

    console.log(
      "Chanaged : ",
      [...this.children.entries()].length,
      changed.length
    );
    // Set Changes
    changed.forEach(({ delay, schedule, entry }) => {
      schedule.setIntersectionEntry(entry);
      schedule.setPendingStateString(
        {
          visibility: entry.isIntersecting ? "visible" : "hidden",
        },
        delay
      );
    });

    // Reset and Clear
    this.invalidated = false;
    this.changedIntersections.clear();
  }

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
