import React, { Component, createContext, ReactNode } from "react";
import { LayoutGroup } from "./LayoutGroup";
import { Schedule } from "./Schedule";
import { LayoutObserver } from "./LayoutObserver";
import { ScheduleEvent } from "./state-machine";

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
    // let i = 0;
    // this.changed.forEach((comp) => {
    //   const service = comp.getService();
    //   console.log("Delay Service :", i, i * 200, service.state.value);
    //   service.send({ type: "QUEUE", timestamp: time, delay: i * 200 });
    //   i++;
    // });
    this.commitIntersectionChanges(time);
  };

  commitIntersectionChanges(time: number) {
    const entries = this.changedIntersections.entries();

    const visibleQ = [];
    const hiddenQ = [];
    for (let [schedule, entry] of entries) {
      const current = schedule.getService().state.value;
      // console.log("Current", current);
      // calc info
      // const bounds = entry.boundingClientRect;
      // const ratio = entry.intersectionRatio;
      // const visible = entry.isIntersecting;
      // const events: ScheduleEvent[] = [];

      // if (visible) {
      //   events.push({type:'MOUNT',timestamp:time,delay:0})
      //   events.push({type:'MOUNT',timestamp:time,delay:0})
      // }else{

      // }

      // events.push({ type: "INTERSECT", entry });
      entry.boundingClientRect;
      schedule.getService().send({ type: "INTERSECT", entry });
      // if( visible )
      // visibleQ.push({
      //   schedule,
      //   events,
      //   bounds,
      //   ratio,
      //   visible,
      // });
    }

    // sort.

    // visibleQ.forEach((entry,i)=>{
    //   const delay = i * 200; // or ease
    //   const serv = entry.schedule.getService();
    //   const events = entry.events.map((ev)=>({...event,delay:}))
    //   serv.send(entry.events);
    // })
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
