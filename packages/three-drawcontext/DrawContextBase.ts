import { Clock, Scene } from "three";
import { DrawState } from './DrawState';
import { RenderSceneMode } from './RenderSceneMode';

export class DrawContextBase{

  state:DrawState = new DrawState();
  clock:Clock = new Clock();
  renderMode:RenderSceneMode = new RenderSceneMode();

  constructor(scene?:Scene){
    if( scene ){
      this.renderMode.setScene(scene);
    }
  }
  /**
   * Clear the context and call the supplied update function once.
   * @param update 
   */
  public drawOnce( update:Function ){

    if( !this.clock.running ){
      this.clock.start();
    }

    this.begin();
    update( this,this.clock.getElapsedTime(),this.clock.getDelta());
    this.end();

  }

  /**
   * Call the update every frame.
   * @param update 
   */  
  public draw( update:Function ){

    if( !this.clock.running ){
      this.clock.start();
    }

    this.begin();
    update( this,this.clock.getElapsedTime(),this.clock.getDelta());
    this.end();

    requestAnimationFrame( ()=>{
      this.draw(update);
    });

  }

  begin(){
    this.state.resetState();
  }

  end(){
    this.renderMode.render(this.state);
  }

  /**
   * Set the material by registered name.
   * @param material 
   */
  material(material:string){
    this.state.setMaterial(material);
  }

  /**
   * Set the geometry by registered name.
   * @param material 
   */  
  geometry(geometry:string){
    this.state.setGeometry(geometry);
  }

  /**
   * Draw point with gl points.
   */
  point(){
    this.drawPoint();
  }

  /**
   * Set the texture by image/canvas.
   */
  texture(){
    throw new Error('not yet...');
  }

  /**
   * Draw a mesh with the current material,geometry and transform state.
   */
  drawMesh(){
    this.state.drawMesh();
  }

  drawPoint(){
    this.state.drawPoint();
  }
  
  /**
   * Transform & Material Attributes.
   */
  position(x:number,y:number,z:number){
    this.state.position.set(x,y,z);
  }

  scale(x:number,y:number,z:number){
    this.state.scale.set(x,y,z);
  }

  color(name:string){
    this.state.color.set(name);
  }

}