import { PerspectiveCamera, Vector3, Box2, CameraHelper, BoxBufferGeometry, Mesh, MeshBasicMaterial, Matrix4, Object3D } from "three";
import { IEngineUpdatable } from "../engine/IEngineUpdatable";
import { Engine } from "../engine/Engine";
import { EngineEvent } from "../engine/EngineEvent";


const boxGeometry:BoxBufferGeometry = new BoxBufferGeometry(1,1,1);
boxGeometry.applyMatrix4(
  new Matrix4().makeTranslation(0.5,-0.5,0)
);

class DomScrollCamera extends Object3D implements IEngineUpdatable{

  public scrollAxis:Vector3 = new Vector3(0,1,0);
  public camHelper:CameraHelper;

  public camera:PerspectiveCamera;

  private scrollBoundsMesh:Mesh;
  private scrollPageBoundsMesh:Mesh;

  constructor(){

    super();
    
    this.camera = new PerspectiveCamera(35,1/1,0.1,1000);
    this.camera.name = 'dom-scroll-camera';
    this.camHelper = new CameraHelper(this.camera);

    this.add(this.camera);
    this.add(this.camHelper);

    this.scrollBoundsMesh = new Mesh(
      boxGeometry,
      new MeshBasicMaterial({
        wireframe:true,
        color: 'blue'
      })
    );
    this.add(this.scrollBoundsMesh);

    this.scrollPageBoundsMesh = new Mesh(
      boxGeometry,
      new MeshBasicMaterial({
        wireframe:true,
        color: 'red'
      })
    );
    this.add(this.scrollPageBoundsMesh);

  }

  engineAdded(engine:Engine):void{

    engine.addEventListener(EngineEvent.DOM_SCROLL,this.onEngineEvent);
    engine.addEventListener(EngineEvent.DOM_RESIZE,this.onEngineEvent);

  }

  engineUpdate(engine:Engine):void{
    // console.log( 'update scroll cam' );

    // this.camera.position.set(0,0,40);
    this.camHelper.update();

  }

  engineRemoved(engine:Engine):void{

    engine.removeEventListener(EngineEvent.DOM_SCROLL,this.onEngineEvent);
    engine.removeEventListener(EngineEvent.DOM_RESIZE,this.onEngineEvent);

  }

  resize( width:number,height:number ):void{
    console.log( 'engine resize' );
  }

  scroll( scrollBounds:Box2, scrollPageBounds:Box2 ):void{
    
    this.scrollBoundsMesh.scale.x = scrollBounds.max.x - scrollBounds.min.x;
    this.scrollBoundsMesh.scale.y = scrollBounds.max.y - scrollBounds.min.y;

    this.scrollPageBoundsMesh.scale.x = scrollPageBounds.max.x - scrollPageBounds.min.x;
    this.scrollPageBoundsMesh.scale.y = scrollPageBounds.max.y - scrollPageBounds.min.y;

    this.scrollBoundsMesh.position.x = scrollBounds.min.x;
    this.scrollBoundsMesh.position.y = -scrollBounds.min.y;

    this.camera.position.copy( this.scrollBoundsMesh.position );
    this.camera.position.x += ( scrollBounds.max.x - scrollBounds.min.x ) * 0.5;
    this.camera.position.y -= ( scrollBounds.max.y - scrollBounds.min.y ) * 0.5;

    const h2 = ( scrollBounds.max.y - scrollBounds.min.y ) * 0.5;
    const fov = this.camera.fov * Math.PI / 180;
    const distance = h2/Math.tan(fov*0.5);
    this.camera.position.z = distance;

  }

  onEngineEvent = (ev:any):void =>{

    switch( ev.type ){
      case EngineEvent.DOM_SCROLL:
        const bounds:Box2 = ev.scrollBounds;
        const pageBounds:Box2 = ev.scrollPageBounds;
        this.scroll( bounds,pageBounds );
        break;

      case EngineEvent.DOM_RESIZE:

        break;

    }
  }

}

export {
  DomScrollCamera
}