import React, {
  createContext,
  useMemo,
  useReducer,
  useContext,
  useEffect,
} from "react";
import { Engine, World, Body, Render, Runner } from "matter-js";

/** Api **/
type MatterState = {
  engine: Engine;
  world: World;
};

type MatterAction =
  | { type: "add-body"; body: Body }
  | { type: "remove-body"; body: Body };

export const MatterContext = createContext<MatterState>(undefined);
export const useMatter = () => useContext(MatterContext);

const reduceState = (state: MatterState, action: MatterAction): MatterState => {
  switch (action.type) {
    case "add-body":
      break;
    case "remove-body":
      break;
  }

  return state;
};

export const MatterProvider = ({ children, ...props }) => {
  const initialState = useMemo<MatterState>(() => {
    const engine = Engine.create();
    const world = engine.world;
    return { engine, world };
  }, []);

  const [state, dispatch] = useReducer(reduceState, initialState);

  useEffect(() => {
    /** Create runner is useEfffect - useMemo() is created during SSR **/
    const runner = Runner.create();
    Runner.run(runner, state.engine);
  }, []);

  return (
    <MatterContext.Provider value={state}>{children}</MatterContext.Provider>
  );
};
