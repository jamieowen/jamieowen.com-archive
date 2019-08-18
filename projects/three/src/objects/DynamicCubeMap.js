import {
  Object3D,
  Mesh,
  RingBufferGeometry,
  MeshBasicMaterial,
  MeshLambertMaterial,
  SphereBufferGeometry,
  CubeCamera,
  LinearMipmapLinearFilter,
  DoubleSide,
  Scene
} from 'three';

class DynamicCubeMap extends Object3D{

  constructor(){
    super();

    const ringContainer = new Object3D();
    const ringGeometry = new RingBufferGeometry(1.8,2,10,10,0,Math.PI * 1.5);
    const rings = new Array(10).fill(null).map(()=>{
      const mesh = new Mesh( 
        ringGeometry,
        new MeshLambertMaterial({
          color: 'blue',
          side: DoubleSide
        })
      )
      mesh.rotateY( Math.random() * Math.PI * 2 );
      mesh.scale.multiplyScalar( Math.random() * 4 );
      ringContainer.add(mesh);
      return mesh;
    })
    
    this.ringContainer = ringContainer;
    this.add( ringContainer );

    // const scene = new Scene();
    // scene.add( ringContainer ); 


    const cubeCamera1 = this.cubeCamera1 = new CubeCamera( 0.1, 500, 256 );
    cubeCamera1.renderTarget.texture.generateMipmaps = true;
    cubeCamera1.renderTarget.texture.minFilter = LinearMipmapLinearFilter;

    const cubeCamera2 = this.cubeCamera2 = new CubeCamera( 0.1, 1000, 256 );
    cubeCamera2.renderTarget.texture.generateMipmaps = true;
    cubeCamera2.renderTarget.texture.minFilter = LinearMipmapLinearFilter;

    this.add( cubeCamera1 ); 
    this.add( cubeCamera2 );   

    console.log( cubeCamera1 );

    const sphere = this.sphere = new Mesh(
      new SphereBufferGeometry(2,30,30),
      new MeshLambertMaterial({
        color: 'grey',
        // envMap: cubeCamera1.renderTarget.texture
      })
    )

    sphere.position.x = 2;
    
    this.add( sphere );    

    this.count = 0;
  

  }

  updateMatrixWorld(force){
    super.updateMatrixWorld(force);
    this.ringContainer.rotation.x += 0.0001;
    this.ringContainer.rotation.y += 0.002;
  }

  render( renderer,scene ){
    
    const { sphere, cubeCamera1, cubeCamera2, count } = this;
    sphere.visible = false;
      

    if( count <10 ){
      console.log( 'Render' );
    }
    cubeCamera1.update( renderer,scene );
    // sphere.material.envMap = cubeCamera1.renderTarget;
    // sphere.material.needsUpdate = true;

    // if ( count % 2 === 0 ) {
    //   sphere.material.envMap = cubeCamera1.renderTarget.texture;
    //   cubeCamera2.update( renderer,scene );
    // } else {
    //   sphere.material.envMap = cubeCamera2.renderTarget.texture;
    //   cubeCamera1.update( renderer,scene );
    // }

    this.count ++;

    sphere.visible = true;

  }
  
}

export {
  DynamicCubeMap
}

