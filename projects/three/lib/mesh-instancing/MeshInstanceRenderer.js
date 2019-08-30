import {
  Mesh,
  InstancedBufferGeometry,
  InstancedBufferAttribute,
  VertexColors
} from 'three';

class MeshInstanceRenderer extends Mesh{

  constructor(geometry,material,maxInstances){

    const geom = new InstancedBufferGeometry();    
    geom.copy( geometry );
    geom.maxInstancedCount = maxInstances;

    // const translate = new Float32Array(maxInstances*3).fill(0);
    // const scale = new Float32Array(maxInstances*3).fill(1);

    const matrixWorld0 = new Float32Array(maxInstances*4).fill(0);
    const matrixWorld1 = new Float32Array(maxInstances*4).fill(0);
    const matrixWorld2 = new Float32Array(maxInstances*4).fill(0);
    const matrixWorld3 = new Float32Array(maxInstances*4).fill(0);
  
    // geom.addAttribute( 'translate', new InstancedBufferAttribute(translate,3) );
    // geom.addAttribute( 'scale', new InstancedBufferAttribute(scale,3) );    

    geom.addAttribute( 'matrixWorld0', new InstancedBufferAttribute(matrixWorld0,4) );
    geom.addAttribute( 'matrixWorld1', new InstancedBufferAttribute(matrixWorld1,4) );
    geom.addAttribute( 'matrixWorld2', new InstancedBufferAttribute(matrixWorld2,4) );
    geom.addAttribute( 'matrixWorld3', new InstancedBufferAttribute(matrixWorld3,4) );
    
    if( material.type === 'MeshBasicMaterial' ){
      const diffuse = new Float32Array(maxInstances*3).fill(1);
      geom.addAttribute( 'diffuse', new InstancedBufferAttribute(diffuse,3) );
    }

    super(geom,material);

    this.frustumCulled = false;
    this.collectedInstances = [];

    this.updateDrawRange(); 

  }

  updateAttributes(){

    const { 
      // translate,
      // scale,
      matrixWorld0,
      matrixWorld1,
      matrixWorld2,
      matrixWorld3,
      diffuse
    } = this.geometry.attributes;

    let offset3 = 0;
    let offset4 = 0;
    let instance;

    for( let i = 0; i<this.collectedInstances.length; i++ ){

      instance = this.collectedInstances[i];

      // scale.array[offset3] = instance.scale.x;
      // scale.array[offset3+1] = instance.scale.y;
      // scale.array[offset3+2] = instance.scale.z;

      // translate.array[offset3] = instance.position.x;
      // translate.array[offset3+1] = instance.position.y;
      // translate.array[offset3+2] = instance.position.z;

      if( diffuse ){        
        diffuse.array[offset3] = 1;//this.material.color.r;
        diffuse.array[offset3+1] = 1;//this.material.color.g;
        diffuse.array[offset3+2] = 1;//this.material.color.b;
      }

      const elements = instance.matrix.elements;

      matrixWorld0.array[offset4] = elements[0];
      matrixWorld0.array[offset4+1] = elements[4];
      matrixWorld0.array[offset4+2] = elements[8];
      matrixWorld0.array[offset4+3] = elements[12];

      matrixWorld1.array[offset4] = elements[1];
      matrixWorld1.array[offset4+1] = elements[5];
      matrixWorld1.array[offset4+2] = elements[9];
      matrixWorld1.array[offset4+3] = elements[13];

      matrixWorld2.array[offset4] = elements[2];
      matrixWorld2.array[offset4+1] = elements[6];
      matrixWorld2.array[offset4+2] = elements[10];
      matrixWorld2.array[offset4+3] = elements[14];

      matrixWorld3.array[offset4] = elements[3];
      matrixWorld3.array[offset4+1] = elements[7];
      matrixWorld3.array[offset4+2] = elements[11];
      matrixWorld3.array[offset4+3] = elements[15];

      offset3+=3;
      offset4+=4;

    }

    // scale.needsUpdate = true;
    // translate.needsUpdate = true;

    if( diffuse ){
      diffuse.needsUpdate = true;
    }

    matrixWorld0.needsUpdate = true;
    matrixWorld1.needsUpdate = true;
    matrixWorld2.needsUpdate = true;
    matrixWorld3.needsUpdate = true;

  }

  addInstance( meshInstance ){
    
    this.collectedInstances.push(meshInstance);
    this.updateDrawRange();

  }

  removeInstance( meshInstance ){

    const idx = this.collectedInstances.indexOf(meshInstance);
    this.collectedInstances.splice(idx,1);
    this.updateDrawRange();

  }

  updateDrawRange(){

    const count = this.collectedInstances.length;
    this.geometry.maxInstancedCount = count;

    this.visible = count > 0;

  }

}

export default MeshInstanceRenderer;