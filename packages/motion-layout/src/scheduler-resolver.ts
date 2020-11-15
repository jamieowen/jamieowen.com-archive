import { useEffect } from "react";
import { SchedulerState } from "./scheduler-api";

export const useSchedulerResolver = (state: SchedulerState) => {
  // useEffect(() => {
  //   console.log("Resolver.");
  //   // Update Items.
  //   for (let observable of state.observables) {
  //     const domRef = observable.domRef.current;
  //     const observer = observable.owner.observerRef.current;
  //     console.log("Observable :", observable);
  //     switch (observable.state) {
  //       case "initialise":
  //         observer.observe(domRef);
  //         observable.state = 'ready';
  //     }
  //   }
  // }, [state]);
};

// state.items[0].

// Scheduler running..
// Some item changes need evaluting at the reducer.
// items are only added & removed, then changed when either the bounds intersection changes.
// or.. internal state changes, delay props change, etc.

// instead of using timer functions. we'll keep a scheudler loop,
// and save timestamps on items when they come into view or
// delays can be applied based on those values??

// ALL state changes ( inc adding delays ) should happen in the reducer.
//
// here... is only a 'tick' function that checks delays and
// update

// check which items are visible, and within view.
// if none visible, they are automatically set to hidden state.
// no delay is used.
// for visible objects, they need to be queued
//
// for (let item of state.items) {
//   item.state = "scheduled";
// }

// Updating items will ( via api )
