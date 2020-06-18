import { Scene, BoxBufferGeometry, Matrix4, Mesh, MeshLambertMaterial, HemisphereLight, Vector3, Box3 } from "three";

const boxGeometry = new BoxBufferGeometry(1,1,1);
boxGeometry.applyMatrix4(
  new Matrix4().makeTranslation(0,0,-0.5)  
).applyMatrix4(
  new Matrix4().makeScale(1,1,2)
).applyMatrix4(
  new Matrix4().makeScale(5,5,5)
);

class VectorTestScene extends Scene{

  public box:Mesh;

  constructor(){

    super();

    const box:Mesh = new Mesh(
      boxGeometry,
      new MeshLambertMaterial({
        color: 'crimson'
      })
    )
    this.add(box);

    const box2 = box.clone();
    box2.scale.multiplyScalar(0.3);
    this.add(box2);
    box2.position.x = 20;

    const hemLight = new HemisphereLight(0xffffff,0x444444);
    this.add(hemLight);   
    
    console.log( box.up, box );
    // box.lookAt( new Vector3(1,0,0) );

    let forward = new Vector3(0,0,-1);
    forward = forward.applyQuaternion(box.quaternion);
    console.log( 'forward :', forward );

    console.log( box.up, box );
    this.box = box;
    // console.log( box.fo )

  }

  updateMatrixWorld(force:any){
    
    super.updateMatrixWorld(force);

    let forward = new Vector3(0,0,-1).multiplyScalar(0);
    let right = new Vector3(1,0,0).multiplyScalar(0.01);

    let next = this.box.position.clone();

    next.add(forward);
    next.add(right);

    this.box.lookAt(next);
    this.box.position.copy(next);

  }

}

export {
  VectorTestScene
}