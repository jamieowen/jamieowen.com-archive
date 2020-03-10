import { BufferGeometry, Material, Mesh, Camera, Vector3, Color } from "three";
import { ObjectManager } from "./ObjectManager";
import { Geometries,Materials } from './constants';

export interface DrawCommand{

  idx:number
  // geometry:BufferGeometry,
  // material:Material,
  // mesh:Mesh,
  // camera:Camera

}

export interface DrawMeshCommand extends DrawCommand{

  mesh:Mesh

}

export class DrawState{

  objects:ObjectManager = new ObjectManager();

  position:Vector3 = new Vector3();
  scale:Vector3 = new Vector3();
  color:Color = new Color();
  ambient:Color = new Color();

  material:string = Materials.BASIC;
  geometry:string = Geometries.BOX;

  drawCommands:Array<DrawCommand> = [];

  resetState(){

    this.position.set(0,0,0);
    this.scale.set(1,1,1);
    this.color.set('white');
    this.ambient.set('black');

    this.drawCommands.splice(0);

  }

  setMaterial(material:string){
    this.material = material;
  }

  setGeometry(geometry:string){
    this.geometry = geometry;
  }

  setTexture(){

  }

  drawMesh(){

    const mesh = this.objects.createMesh();
    const material = this.objects.getMaterial(this.material);
    const geometry = this.objects.getGeometry(this.geometry);

    mesh.geometry = geometry;
    mesh.material = material;

    mesh.position.copy( this.position );
    mesh.scale.copy( this.scale );

    material['color'].copy( this.color );

    const command:DrawMeshCommand = {
      idx: this.drawCommands.length+1,
      mesh: mesh
    }
    
    this.drawCommands.push(command);

  }

  drawInstance(){

  }

  private pushState(){

  }

}
