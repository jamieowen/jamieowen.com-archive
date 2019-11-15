import {
  Mesh,
  InstancedBufferGeometry,
  InstancedBufferAttribute,
  VertexColors
} from 'three';

const attributeFactory = {
  'diffuse': (maxInstances,geometry)=>{
    const a_diffuse = new Float32Array(maxInstances*3).fill(1);
    geometry.addAttribute( 'a_diffuse', new InstancedBufferAttribute(a_diffuse,3) );
  },
  'emissive': (maxInstances,geometry)=>{
    const a_emissive = new Float32Array(maxInstances*3).fill(1);
    geometry.addAttribute( 'a_emissive', new InstancedBufferAttribute(a_emissive,3) );    
  },
  'specular': (maxInstances,geometry)=>{
    const a_specular = new Float32Array(maxInstances*3).fill(1);
    geometry.addAttribute( 'a_specular', new InstancedBufferAttribute(a_specular,3) );
    const a_shininess = new Float32Array(maxInstances).fill(1);
    geometry.addAttribute( 'a_shininess', new InstancedBufferAttribute(a_shininess,1) );
  },
  'physical': (maxInstances,geometry)=>{
    const a_metalness = new Float32Array(maxInstances).fill(1);
    geometry.addAttribute( 'a_metalness', new InstancedBufferAttribute(a_metalness,1) );
    const a_roughness = new Float32Array(maxInstances).fill(1);
    geometry.addAttribute( 'a_roughness', new InstancedBufferAttribute(a_roughness,1) );
  },  
  'clearCoat': (maxInstances,geometry)=>{
    const a_clearCoat = new Float32Array(maxInstances).fill(1);
    geometry.addAttribute( 'a_clearCoat', new InstancedBufferAttribute(a_clearCoat,1) );
    const a_clearCoatRoughness = new Float32Array(maxInstances).fill(1);
    geometry.addAttribute( 'a_clearCoatRoughness', new InstancedBufferAttribute(a_clearCoatRoughness,1) );
  }
}

const materialAttributeMap = {
  'MeshBasicMaterial': ['diffuse'],
  'MeshLambertMaterial': [ 'diffuse','emissive' ],
  'MeshPhongMaterial': ['diffuse','emissive','specular'],
  'MeshStandardMaterial': ['diffuse','emissive','physical' ],
  'MeshPhysicalMaterial': ['diffuse','emissive','physical','clearCoat' ]
}

const createAttributes = ( material,geometry,maxInstances )=>{

  const factories = materialAttributeMap[material.type];
  if( factories ){
    factories.forEach((f)=>{
      const create = attributeFactory[f];
      create( maxInstances,geometry );
    })
  }
  console.log( 'Create attributes : ', material.type, factories, Object.keys(geometry.attributes) );

}

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
  
    createAttributes( material,geom,maxInstances );

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
      a_diffuse
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

      if( a_diffuse ){
        a_diffuse.array[offset3] = instance.material.color.r;
        a_diffuse.array[offset3+1] = instance.material.color.g;
        a_diffuse.array[offset3+2] = instance.material.color.b;
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

    if( a_diffuse ){
      a_diffuse.needsUpdate = true;
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