import React, {
  FC,
  createContext,
  useContext,
  useReducer,
  useMemo,
  useRef,
  Dispatch,
} from "react";
import { ObserverProvider2 } from "./observe2";
import { schedulerApi } from "./scheduler-actions";
import {
  SchedulerAction,
  SchedulerApi,
  SchedulerProviderProps,
  SchedulerState,
} from "./scheduler-api";
import { useSchedulerResolver } from "./scheduler-resolver";
import { initialSchedulerState, schedulerReducer } from "./scheduler-state";

// Context
const SchedulerContext = createContext<SchedulerApi>(null!);
export const useSchedulerContext = () => useContext(SchedulerContext);

/**
 * Scheduler Provider
 */
export const SchedulerProvider: FC<SchedulerProviderProps> = ({ children }) => {
  // Setup
  const initialState = useMemo(() => initialSchedulerState(), []);
  console.log("<SchedulerProvider> Render");
  const [state, dispatch] = useReducer(schedulerReducer, initialState);

  // Use Refs to pass to Actions Api.
  const stateRef = useRef<SchedulerState>(state);
  const dispatchRef = useRef<Dispatch<SchedulerAction>>(dispatch);

  // Actions Api is created once only
  const api = useMemo(() => schedulerApi(stateRef, dispatchRef), []);

  useSchedulerResolver(state);

  // Render
  return (
    <SchedulerContext.Provider value={api}>
      <ObserverProvider2>{children}</ObserverProvider2>
    </SchedulerContext.Provider>
  );
};
