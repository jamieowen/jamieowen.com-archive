import {
  Object3D,
  Mesh,
  MeshBasicMaterial,
  BoxBufferGeometry,
  BufferGeometry,
  Points,
  PointsMaterial,
  VertexColors,
  Float32BufferAttribute,
  Uint16BufferAttribute
} from 'three';


const boxGeometry = new BoxBufferGeometry(1,1,1,1,1,1);

import {
  TransformUpdateCPU
} from '../../lib/transform-geometry';

class TransformObject extends Object3D{

  constructor(){
    super();

    this.mesh = new Mesh( 
      boxGeometry,
      new MeshBasicMaterial( {
        color: 'red'
      })
    )

    this.add( this.mesh );

    // Use any geometry or an extended geoometry?
    // Work with regular geometry to begin with.
    // Define geometry in usual three.js style way.
    // const transformGeometry = new TransformBufferGeometry();
    // add buffer attributes.
    // add instanced buffer attributes
    // position
    // color
    // Create a potential TextureBufferAttribute ? ( ping-pong texture ) // initialise with DataTexture
    // // with history options ??

    
    const count = 10 * 3;

    const id = new Array(count/3).fill(null).map((v,i)=>{
      return i;
    });    
    const positions = new Array(count).fill(null).map( (v,i)=>{
      return Math.random() * 10 - 5;
    });
    const colors = new Array(count).fill(null).map( (v,i)=>{
      return Math.random() * 100 - 50;
    });

    const geometry = new BufferGeometry();
    geometry.addAttribute( 'id', new Uint16BufferAttribute(id,1) );
    geometry.addAttribute( 'position', new Float32BufferAttribute(positions,3) );
    geometry.addAttribute( 'color', new Float32BufferAttribute(colors,3) );

    const mesh = new Points( 
      geometry,
      new PointsMaterial({
        vertexColors: VertexColors,
        size: 1
      })
    );

    const index = [];

    const jsGlobals = {
      random: ()=>{
        return [ Math.random(), Math.random(), Math.random() ];
      },
      upsert: ( id,position )=>{

      },
      find: ()=>{

      }
    }

    const transformUpdate = new TransformUpdateCPU(geometry,{
      read: [ 'id', 'position', 'color' ],
      write: [ 'position', 'color' ],
      uniforms: {
        time: { value: 0 }
      },
      jsGlobals,
      updateShader: `
        #include <header>

        uniform float time;
        attribute int id_in;
        attribute vec3 position_in;
        attribute vec3 color_in;

        varying vec3 position_out;
        varying vec3 color_out;

        void main(){
          #include <read>
          
          vec3 position = position_in;
          vec3 color = color_in;

          vec3 newPosition = vec3(1.0);
          mat4 cameraPosition = mat4();
          mat4 worldPosition = mat4();
          newPosition*=worldPosition;
          position = random();
          color = random();

          vec3 velocity = vec3(1,0,0);
          position*=2.5;
          position+=velocity;

          upsert( id,position );

          #include <write>

          gl_FragColor = position;

        }
      `
    });

    this.add( mesh );

    console.log( geometry );

    const update = ()=>{     

      const positions = geometry.getAttribute( 'position' );

      for( let i = 0; i<positions.array.length; i+=3 ){
        positions.array[i] = Math.random() * 10 - 5;
        positions.array[i+1] = Math.random() * 10 - 5;
        positions.array[i+2] = Math.random() * 10 - 5;
      }

      // transformUpdate.update();
      requestAnimationFrame(update);

    }

    update();
    
    // const position = new 

    
    
      
    // Create a transform update object to update a select number of
    // attributes - that exist on the same shader.
    // You cannot mix and match GPU/CPU modes between attributes.

    // TransformUpdateCPU
    // args: read: [], write: [], vertexShader: ``, initShader: ``, initCpu, functionApi: ''
    // TransformUpdateGPUTexture ( would need to initialise textures and draw methods )
    // TransformUpdateGPUFeedback
    // TransformUpdateCPUWorker

    // Inject code using preprocesser directives #pragma 
    // #headers
    // #read attribuets
    // #write attributes
    
    
    // transformUpdate.render(); // / or .update()

    // const mesh = new Mesh(
    //   transformGeometry,
    //   new MeshBasicMaterial()
    // );

    // const transformMaterial = new TransformLoopInitMaterial( {
    //   vertexShader: `

    //     ${ glsl.initShaderHeaders() }

    //     void main(){

    //       ${ glsl.initShaderRead() }
    //       position = vec3( 1.0, 1.0, 0.0 );
    //       color = vec3( 1.0, 1.0, 0.0 );
    //       ${ glsl.initShaderWrite() }

    //     }
    //   `
    // });

    // const transformLoop = new TransformLoop(
    //   transformGeometry,
    //   transformInitMaterial,
    //   transformUpdateMaterial
    // );
      
    // const transformMesh = new Mesh( 
    //   transformMesh,
    //   material
    // )

    // this.add( transformMesh );

  }

}

export default TransformObject;