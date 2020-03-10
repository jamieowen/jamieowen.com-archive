import {
  BoxBufferGeometry,
  SphereBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  Scene,
  Euler,
  Object3D,
  Vector3,
  Matrix4,
  Material,
  Geometry,
  InstancedBufferGeometry,
  InstancedMesh,
  PlaneBufferGeometry,
  Color,
  MeshLambertMaterial,
  Clock
} from 'three';



type Instancer = {

  geometryClass:Function;
  geometry:InstancedBufferGeometry;
  layer:string;
  mesh:InstancedMesh;

}

class ObjectPool<T>{

  // new <T>() ??
  // https://blog.rsuter.com/how-to-instantiate-a-generic-type-in-typescript/
  // https://github.com/Microsoft/TypeScript/issues/2037
  public instances:Array<T> = [];
  public index:number = 0;

  public type:Function;

  constructor(type:Function){
    this.type = type;
  }

  public create():T{

    let item:T = this.instances[this.index];
    if( !item ){
      // @ts-ignore
      item = new this.type();
      this.instances.push(item);
    }
    this.index++;
    return item;

  }

  public singleton(args:Array<any> | Object):T{
    
  }

  public reset(){
    this.index = 0;
  }

}


class DrawContext{

  private scene:Scene;

  private currentMatrix:Matrix4 = new Matrix4();
  private currentMaterial:Function = MeshBasicMaterial;
  private currentGeometry:Function = BoxBufferGeometry;
  private currentColor:Color = new Color();
  private currentLayer:String = 'default';
  private currentPosition:Vector3 = new Vector3();
  private currentScale:Vector3 = new Vector3();
  private currentRotation:Euler = new Euler();
  private testGeom = new BoxBufferGeometry(1,1,1);

  // private meshPoolIndex:number = 0;
  // private meshPool:Array<Mesh> = [];

  private clock:Clock = new Clock();

  private meshPool:ObjectPool<Mesh> = new ObjectPool<Mesh>(Mesh);
  private materialPool:ObjectPool<MeshBasicMaterial> = new ObjectPool<MeshBasicMaterial>(MeshBasicMaterial);
// z  private lambertPool:

  // private layerKeyMap:Map<object,string> = new Map();
  // private geometryKeyMap:Map<Function,string> = new Map();
  // private materialKeyMap:Map<Function,string> = new Map();
  
  // private instancerMap:Map<string,Instancer> = new Map();

  private previousCommands:Array<object>; 
  private currentCommands:Array<object>;

  constructor(scene:Scene, update:Function=null ){

    this.scene = scene;
    this.clock.start();
    if( update ){      
      this.draw( update );
    }

  }

  public drawOnce( update:Function ){

    this.begin();
    update( this,this.clock.getElapsedTime(),this.clock.getDelta());
    this.end();    

  }

  public draw( update:Function ){

    this.begin();
    update( this,this.clock.getElapsedTime(),this.clock.getDelta());
    this.end();

    requestAnimationFrame( ()=>{
      this.draw(update);
    });

  }


  public begin(){
    
    this.previousCommands = this.currentCommands;
    this.currentCommands = [];
    this.currentMatrix.identity();
    this.currentPosition.set(0,0,0);
    this.currentScale.set(1,1,1);    

    // this.meshPoolIndex = 0;
    this.meshPool.reset();
    this.materialPool.reset();

  }

  public end(){

    // console.log( 'Flush Commands :', this.currentCommands.length, this.meshPool.instances.length );

    // for( var i:number = 0; i<this.commands.length; i++ ){

    // }

  //   this.currentCommands.forEach((com)=>{
      
  //     if( com.id === 'draw-mesh' ){
  //       const color = com.args.color;
  //       const material = com.args.material;
  //       const geometry = com.args.geometry;
  //       const matrix = com.args.matrix;
        

  //       const mesh = new Mesh(
  //         new BoxBufferGeometry(1,1,1),
  //         // new geometry(),
  //         new material()
  //       )
  //       mesh.matrixAutoUpdate = false;
  //       // console.log( 'Create ', color, material, matrix );
  //       mesh.material.color.setRGB(color.r,color.g,color.b);
  //       mesh.matrix.fromArray( matrix );
  //       // mesh.updateMatrix();
  //       this.scene.add(mesh);

  //       // <Color>material.color.setRGB()
        
  //     }
  //   })

  }

  private createMesh(){

    let mesh:Mesh = this.meshPool.create();    
    mesh.matrixAutoUpdate = false;
    mesh.matrix.identity();
    mesh.matrix.makeTranslation(
      this.currentPosition.x,
      this.currentPosition.y,
      this.currentPosition.z      
    )

    this.currentMatrix.makeScale(
      this.currentScale.x,
      this.currentScale.y,
      this.currentScale.z
    );

    mesh.matrix.multiply(this.currentMatrix);
    if( !mesh.parent ){
      this.scene.add( mesh );
    }
    
    // this.currentMatrix.identity();

    mesh.geometry = this.testGeom;//new BoxBufferGeometry(1,1,1);
    // @ts-ignore
    mesh.material = new this.currentMaterial();
    mesh.material.color.copy( this.currentColor );

  }

  

  private createInstance(){
    
  }

  private pushDrawState(id:string){

    return;


    this.currentMatrix.identity();

    this.currentMatrix.makeTranslation( 
      this.currentPosition.x,
      this.currentPosition.y,
      this.currentPosition.z,
    ) 

    const mat:Matrix4 = new Matrix4();
    mat.makeScale(
      this.currentScale.x,
      this.currentScale.y,
      this.currentScale.z
    );

    this.currentMatrix.multiply(mat);

    // this.currentTr

    const args = {      
      material: this.currentMaterial,
      geometry: this.currentGeometry,
      layer: this.currentLayer,
      matrix: this.currentMatrix.toArray(),
      color: {
        r: this.currentColor.r,
        g: this.currentColor.g,
        b: this.currentColor.b
      }

    }

    this.currentCommands.push( {
      id: id,
      args: args
    } );

  }

  /**
   * Matrix Ops
   */


  public position(x:number,y:number,z:number){
    
    this.currentPosition.set(x,y,z);

  }

  public rotationX(theta:number){

    

  }

  public rotationY(theta:number){

    // this.currentLocalMatrix.makeRotationY(theta);

  }

  public rotationZ(theta:number){

    // this.currentLocalMatrix.makeRotationZ(theta);

  }

  public scale(x:number,y:number,z:number){

    this.currentScale.set(x,y,z);

  }


  /**
   * Materials
   */


  public layer(name:string = 'default' ){
    this.currentLayer = name;
  }

  public wireframeMaterial(){
    this.currentMaterial = MeshBasicMaterial;
  }

  public basicMaterial(){
    this.currentMaterial = MeshBasicMaterial;
  }

  public lambertMaterial(){
    this.currentMaterial = MeshLambertMaterial;
  }

  public color(color:number){
    this.currentColor.setHex(color);
  }

  // public specular()
  // public roughness()
  // etc

  /**
   * Geometry & Meshes
   */

  public plane(){
    this.mesh(PlaneBufferGeometry);
  }

  public box(){
    this.mesh(BoxBufferGeometry);
  }

  public sphere(){
    this.mesh(SphereBufferGeometry);
  }  

  //@ts-ignore
  private getKey(map:Map,key:any){
    
    let value = map.get(key);
    if( value === undefined ){
      value = map.size.toString();
      map.set(key,value);
    }
    return value;

  }

  public mesh(GeometryClass:Function){

    /**
     * This stuff for instancing and storing to instance matrix.
     */
    // const layer = this.currentLayer;
    // const geom = this.

    // Use three maps to perform a lookup 
    // on an instancer for each geometry/layer/material combination
    // const lKey = this.getKey(this.layerKeyMap,'default');
    // const gKey = this.getKey(this.geometryKeyMap,GeometryClass);
    // const mKey = this.getKey(this.materialKeyMap,MeshBasicMaterial);

    // const iKey = `${lKey}-${gKey}-${mKey}`;

    // console.log( lKey,gKey,mKey );


    this.currentGeometry = GeometryClass;
    // this.pushDrawState( 'draw-mesh' );
    this.createMesh();

  }


}

export {
  DrawContext
}