import { Engine } from "./Engine";
import { Object3D } from "three";

interface IEngineUpdatable{

  engineAdded(engine:Engine):void;
  engineUpdate(engine:Engine):void;
  engineRemoved(engine:Engine):void;
 
}

const instanceOfIEngineUpdatable = ( obj:Object3D )=>{
  return 'engineUpdate' in obj && 'engineAdded' in obj && 'engineRemoved' in obj;
}

export {
  instanceOfIEngineUpdatable,
  IEngineUpdatable
}