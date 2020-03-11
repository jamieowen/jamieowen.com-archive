import { DrawState, DrawCommand, DrawMeshCommand, DrawPointCommand } from "./DrawState";
import { Scene, Mesh, Points, BufferGeometry, BufferAttribute, PointsMaterial, VertexColors } from "three";


const createPointsGeometry = (count:number):Points=>{

  const position:Float32Array = new Float32Array(count*3);
  const color:Float32Array = new Float32Array(count*2);
  const geometry:BufferGeometry = new BufferGeometry();

  geometry.setAttribute( 'position', new BufferAttribute(position,3) );
  geometry.setAttribute( 'color', new BufferAttribute(color,3) );

  const material:PointsMaterial = new PointsMaterial({
    size:1,
    vertexColors:VertexColors
  })
  return new Points(geometry,material);

}

export class RenderSceneMode{

  scene:Scene = new Scene();
  points:Points;

  setScene(scene:Scene){
    this.scene = scene;
  }

  render(state:DrawState){
  
    const commands:Array<DrawCommand> = state.drawCommands;        

    if( !this.points ){
      this.points = createPointsGeometry(1000);
    }

    const pgeom:BufferGeometry = <BufferGeometry>this.points.geometry;    
    const ppos:BufferAttribute = pgeom.getAttribute('position');
    const pcol:BufferAttribute = pgeom.getAttribute('color');
    let pi = 0;

    for( let c of commands ){
      
      const comm:DrawCommand = c;
      const mesh:Mesh = comm.mesh;

      if( comm.type === 'mesh' ){
        if( !mesh.parent ){
          this.scene.add(mesh);
        }else
        if( mesh.parent !== this.scene ){
          this.scene.add(mesh);
        }
      }else
      if( comm.type === 'point' ){
        
        const pnt:DrawPointCommand = c;

        ppos.setXYZ(pi,pnt.position[0],pnt.position[1],pnt.position[2]);
        pcol.setXYZ(pi,pnt.color[0],pnt.color[1],pnt.color[2]);                      

        pi+=3;

      }

      pgeom.setDrawRange(0,pi);

      if( !this.points.parent ){
        this.scene.add(this.points);
      }

    }

  }

}