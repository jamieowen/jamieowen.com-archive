import Sketch from 'three-toolkit/rendering/Sketch';
import HudDisplay from 'three-toolkit/rendering/HudDisplay';
import OrbitControls from 'three-toolkit/controls/OrbitControls';
import Simulate from 'three-toolkit/gpgpu/Simulate';
import MaterialModifier from 'three-material-modifier';
import LightingRig from 'three-toolkit/lighting/LightingRig';
import CurvesHelper from 'three-toolkit/helpers/CurvesHelper';
import CurvesTexture from 'three-toolkit/texture-gen/CurvesTexture';
import Toy from 'toy-ui';
import classicNoise from 'three-toolkit/glsl/noise/classic-3d';
import simplexNoise from 'three-toolkit/glsl/noise/simplex-3d';

import * as THREE from 'three';
import initOBJLoader from 'three-toolkit/loaders/OBJLoader';
initOBJLoader( THREE );
const OBJLoader = THREE.OBJLoader;


import {
    Mesh,
    SphereBufferGeometry,
    BoxBufferGeometry,
    MeshBasicMaterial,
    MeshLambertMaterial,
    TextureLoader,
    MeshDepthMaterial,
    Vector3,
    ShaderMaterial,
    InstancedBufferGeometry,
    InstancedBufferAttribute,
    BufferAttribute,
    Matrix4,
    CatmullRomCurve3,
    DataTexture
} from 'three';


Sketch( {

    background: 0x000000,
    near: 1,
    far: 3000,

    preload: function( callback ){

        this.resources = {};

        let textureLoader = new TextureLoader();
        textureLoader.load( 'textures/height-map.png', ( res )=>{

            this.resources[ 'height-map' ] = res;
            let objLoader = new OBJLoader();
            objLoader.load( 'models/particle-blip-01.obj', ( res )=>{

                this.resources[ 'obj' ] = res.children[0];
                callback();

            })

        } );

    }

}, function( scene, camera, manager ){

    // ** Setup the basic helpers.

    let hud = new HudDisplay({
        width: 90,
        useTextureSizes: false
    });
    manager.addPlugin( hud );

    //let textureLoader = new TextureLoader();
    //let testTexture = textureLoader.load( 'textures/height-map.png' );
    hud.addTexture( this.resources['height-map'] );

    let lighting = new LightingRig({
        debug: true
    });

    scene.add( lighting );

    let controls = new OrbitControls( manager.renderer.domElement, camera );

    // ** Setup scene related helpers
    // ** Bounding box for simulations

    const SIM_BOUNDS = new Vector3( 200,50,100 );
    const boxGeometry = new BoxBufferGeometry( 1,1,1 );
    const boundsMesh = new Mesh(
        boxGeometry,
        new MeshBasicMaterial( {
            color: 0xffffff,
            wireframe: true
        })
    )
    boundsMesh.scale.copy( SIM_BOUNDS );
    scene.add( boundsMesh );

    // Define some paths ( or just the path to follow )
    let points = [];
    let pX = 3, sX = SIM_BOUNDS.x / pX;
    let pRad = 10;
    let offset = SIM_BOUNDS.clone().multiplyScalar(0.5);

    for( let i = 0; i<=pX; i++ ){
        points.push(
            new Vector3(
                i * sX - offset.x,
                Math.cos( i * Math.PI * 0.2 ) * pRad,
                Math.cos( i * Math.PI ) * pRad )
        )
    }

    let curve = new CatmullRomCurve3( points );
    let curvesHelper = new CurvesHelper( curve, {

    } );
    scene.add( curvesHelper );

    let curvesDataTexture = new CurvesTexture( curve,{
        samples: 128
    })

    hud.addTexture( curvesDataTexture );

    let numObjects = 10;

    let simulation = new Simulate( {

        numObjects: numObjects,
        attributes: [
            {
                name: 'position',
                initialState: ( vec,i )=>{

                    let rad = 50;
                    let ang = ( Math.PI * 2 ) / numObjects;
                    vec.x = Math.cos( i * ang ) * rad;
                    vec.y = Math.sin( i * ang ) * rad;//Math.random() * SIM_BOUNDS.y;
                    vec.z = 0.0;//Math.random() * SIM_BOUNDS.z;

                    vec.w = ( Math.random() * 2.0 ) + 0.05; // Mass

                }
            },
            {
                name: 'velocity',
                initialState: ( vec,i )=>{

                    //Velocity
                    vec.x = 1.0;//Math.random();
                    vec.y = 0.0;//Math.random();
                    vec.z = 0.0;//Math.random();

                    let rad = 50;
                    let ang = ( Math.PI * 2 ) / numObjects;
                    vec.x = Math.cos( i * ang );
                    vec.y = Math.sin( i * ang );//Math.random() * SIM_BOUNDS.y;
                    vec.z = 0.0;//Math.random() * SIM_BOUNDS.z;

                    // Max Speed
                    vec.w = 0.5;

                }
            }
        ],

        uniforms: {

            gravity: { value: new Vector3( 0.4,0,0 ) },
            damping: { value: 0.42 },
            bounds: { value: SIM_BOUNDS },
            time: { value: 0 },
            target: { value: new Vector3() }

        },

        updateShader: `


            precision mediump float;
            varying vec2 vUv;

            uniform sampler2D previousState;
            uniform float vSegmentSize;

            uniform vec3 bounds;
            uniform vec3 gravity;
            uniform float damping;
            uniform float time;
            uniform vec3 target;

            vec3 cubicBezier( vec3 p0, vec3 c0, vec3 c1, vec3 p1, float t ){

                float tn = 1.0 - t;
                return tn * tn * tn * p0 + 3.0 * tn * tn * t * c0 + 3.0 * tn * t * t * c1 + t * t * t * p1;

            }

            float insideBox(vec2 v, vec2 bottomLeft, vec2 topRight) {
                vec2 s = step(bottomLeft, v) - step(topRight, v);
                return s.x * s.y;
            }

            // return 1 if >= edge1 or < edge2 otherwise 0
            float between( float edge1, float edge2, float value ){
                return step( edge1, value ) - step( edge2, value );
            }

            ${ simplexNoise }

            /**
             * Notes:
             * seek()
             * flee()
             * pathFollow()
             * for path points, we encode a point in a texture, each particle has a current path position scalar - a (U)v corresponding to the path texture.
             * as the particle moves within the distance, it advances the position scalar by the U step.
             *
             * // weights for changing interest.

             */
            void main(){

                /**
                 * This is demonstrating sharing a single texture for multiple attributes.
                 * The texture is divided vertically, with each attribute occupying a certain portion of the texture.
                 *
                 * When writing the state back, all attributes are calculated but depending on the v offset,
                 * Only the value associated with the current v segment is mixed in.
                 *
                 * Perhaps using multiple textures is more efficient, or using multiple materials and the same texture
                 * and rendering using scissor rect on the affected segment. But this is one option when determining next state
                 * where having access to all attributes is preferential.
                 */

                float segOffsetV = mod( vUv.y, vSegmentSize );

                float positionV = 0.0;
                float velocityV = vSegmentSize;

                vec4 position = texture2D( previousState, vec2( vUv.x, segOffsetV ) );
                vec4 velocity = texture2D(  previousState, vec2( vUv.x, segOffsetV + velocityV ) );

                        //velocity.xyz += snoise( velocity.xyz * 3.0 );
                        //velocity.xyz += ( vec3( 100.0,25.0,50.0 ) - position.xyz ) * 0.0005;
                        //velocity.xyz += gravity * position.w;
                        //velocity.xyz *= damping;

                        // Cubic Bezier
                        //vec3 p0 = vec3( 0.0 )
                        //vec3 c0,
                        //vec3 c1, vec3 p1, float t


                // reynolds paper.

                // Simple Vehicle Model:
                //     mass          scalar
                //     position      vector
                //     velocity      vector
                //     max_force     scalar
                //     max_speed     scalar
                //     orientation   N basis vectors

                // ** steering_force = truncate (steering_direction, max_force)
                // ** acceleration = steering_force / mass
                // ** velocity = truncate (velocity + acceleration, max_speed)
                // ** position = position + velocity

                // My rough intepretation - didn't work
                // float max_speed = 0.9;
                // vec3 targ = vec3( 100.0, 25.0, 50.0 );
                // vec3 steer = targ - position.xyz;
                // vec3 accel = steer / 600.0;
                // velocity.xyz = clamp( velocity.xyz + accel, -max_speed, max_speed );

                // From https://gamedevelopment.tutsplus.com/tutorials/understanding-steering-behaviors-seek--gamedev-849

                float max_velocity = 50.0;
                //vec3 target = vec3( 100.0, 25.0, 50.0 );
                vec3 desired_velocity = normalize(target - position.xyz) * max_velocity;
                vec3 steering = desired_velocity - velocity.xyz;

                float mass = 1.0;
                float max_force = 0.025; // this is essetially steering adjustment sensitvity ( reation to velocity change )
                steering = clamp( steering, -max_force, max_force );
                steering = steering / mass;

                //float max_speed = 5.0;
                vec3 max_speed = vec3( 10.0, 3.0, 4.0 );
                velocity.xyz = clamp( velocity.xyz + steering, -max_speed, max_speed );

                // steering = truncate (steering, max_force)
                // steering = steering / mass
                // velocity = truncate (velocity + steering , max_speed)
                // position = position + velocity

                position.xyz += velocity.xyz;

                // Wrap around bounds.
                //position.xyz = mod( position.xyz, bounds );

                vec4 color = vec4(0.0);

                // test that we are segmenting values correctly
                //position = vec4( 1.0,0.0,1.0,1.0 );
                //velocity = vec4( 0.0,1.0,0.0,1.0 );

                // mix attribute for this position
                color += position * between( 0.0, vSegmentSize, vUv.y );
                color += velocity * between( vSegmentSize, vSegmentSize*2.0, vUv.y );

                gl_FragColor = color;

            }

        `

    } );

    manager.addRenderable( simulation );

    hud.addTexture( simulation.state.getRenderTexture() );
    hud.addTexture( simulation.initialState );

    // Create Source Geometry

    window.addEventListener( 'click', ()=>{

        console.log( 'CLICK' );
        //return;
        let d = 100.0;
        let d2 = d / 2;
        simulation.state.material.uniforms.target.value.x = Math.random() * d - d2;//SIM_BOUNDS.x;
        simulation.state.material.uniforms.target.value.y = Math.random() * d - d2;//SIM_BOUNDS.y;
        simulation.state.material.uniforms.target.value.z = Math.random() * d - d2;//SIM_BOUNDS.z;

        //simulation.state.material.uniforms.target.sub( SIM_BOUNDS.)

    })
    let source = this.resources['obj'].geometry;

    let matrix = new Matrix4();
    matrix.makeScale( 2,1,1 );
    source.applyMatrix( matrix );

    // Render Instances.

    let geometry = new InstancedBufferGeometry();
    geometry.maxInstancedCount = simulation.opts.numObjects;

    if( source.index ){
        geometry.setIndex( new BufferAttribute( source.index.array,1 ) );
    }
    geometry.addAttribute( 'position',
        new BufferAttribute( source.attributes['position'].array, 3 )
    );
    geometry.addAttribute( 'normal',
        new BufferAttribute( source.attributes['normal'].array, 3 )
    );
    geometry.addAttribute( 'uv',
        new BufferAttribute( source.attributes['uv'].array, 2 )
    );
    geometry.addAttribute( 'simulation_uv',
        new InstancedBufferAttribute( simulation.createUVAttributeArray(), 2 )
    )

    let SimulationMaterial = MaterialModifier.extend( 'phong', {
            uniforms: {
                simulationState: { value: simulation.state.getCurrent() }
            },
            vertexShader: {
                uniforms:`
                    attribute vec2 simulation_uv;
                    uniform sampler2D simulationState;
                `
                ,
                preTransform: `
                    vec4 translate = texture2D( simulationState,simulation_uv );
                    transformed += translate.xyz;
                `
            }
        }
    )

    let instanced = new Mesh(
        geometry,
        new SimulationMaterial({
            color: 0xffffff
        })
    );

    //instanced.position.sub( SIM_BOUNDS.clone().multiplyScalar(0.5) );

    scene.add( instanced );
    instanced.frustumCulled = false;

    let geom = new SphereBufferGeometry(0.5);
    let ref = new Mesh(
        geom,
        new MeshLambertMaterial({
            color: 0xff000
        })
    );

    //ref.scale.set( 4,4,4 );
    instanced.add( ref );

    let update = ()=>{

        ref.position.copy( simulation.state.material.uniforms.target.value );
        simulation.state.material.uniforms.time.value+=0.001;
        controls.update();

    }

    return { update };
    //return { render, update, resize, pointerDown, pointerUp, pointerMove };

});
