import { createContext, ReactNode } from "react";
import { Observable, Observer } from "../observable";
import { IScheduledComponent } from "./Scheduler";

export interface RegisterComponent {
  register(component: IScheduledComponent<any, any, any>): void;
  unregister(component: IScheduledComponent<any, any, any>): void;
}

export interface NotifyObservableChange {
  notifyChange(events: ObservableChangeEvent[]): void;
}

export interface ObservableChangeEvent {
  entry: IntersectionObserverEntry;
  component: Observable;
}

export interface SchedulerProps {
  children: ReactNode;
}

export const SchedulerContext = createContext<SchedulerContextApi>(null!);

export type SchedulerContextApi = RegisterComponent<Observable | Observer> &
  NotifyObservableChange;
