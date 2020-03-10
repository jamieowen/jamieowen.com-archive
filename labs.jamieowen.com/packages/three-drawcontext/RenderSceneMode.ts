import { DrawState, DrawCommand, DrawMeshCommand } from "./DrawState";
import { Scene, Mesh } from "three";

export class RenderSceneMode{

  scene:Scene = new Scene();

  setScene(scene:Scene){
    this.scene = scene;
  }

  render(state:DrawState){
  
    const commands:Array<DrawCommand> = state.drawCommands; 

    for( let c of commands ){
      
      const comm:DrawMeshCommand = <DrawMeshCommand>c;
      const mesh:Mesh = comm.mesh;

      if( !mesh.parent ){
        this.scene.add(mesh);
      }else
      if( mesh.parent !== this.scene ){
        this.scene.add(mesh);
      }

    }

  }

}