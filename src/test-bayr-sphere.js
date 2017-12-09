import Sketch from 'three-toolkit/rendering/Sketch';
import OrbitControls from 'three-toolkit/controls/OrbitControls';


import MaterialModifier from 'three-material-modifier';

import {
    Vector3,
    PlaneBufferGeometry,
    SphereBufferGeometry,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    NearestFilter,
    RawShaderMaterial
} from 'three';

Sketch( {

    background: 0x333333,
    near: 1,
    far: 5000,
    fov: 55,
    renderer: {
        //logarithmicDepthBuffer: true
    },

    preload: function( cb ){
        cb();
    }

}, function( scene,camera, manager ){

    //let planeGeom = new PlaneBufferGeometry(1,1,1,1);

    let sphereGeom = new SphereBufferGeometry(0.5,20,20);

    /**let SphereMaterial = MaterialModifier.extend( 'basic', {

        vertexShader: {

        },
        fragmentShader: {

            uniforms: `
            `,
            postFragColor: `

            `
        }

    })**/


    let mesh = new Mesh(
        sphereGeom,
        new RawShaderMaterial({

            vertexShader: `

            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            attribute vec3 position;

            void main(){

                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

            }

            `,
            fragmentShader: `

            void main(){

                gl_FragColor.rgba = vec4( 1.0 );

            }
            `,


        })
    );

    mesh.scale.set( 100,100,100 );
    scene.add( mesh );

    let controls = new OrbitControls(
        manager.domElement, manager.camera,{
            distanceBounds: [ 10,10000 ],
            distance: 300
        } );


    let update = ()=>{

        controls.update();

    }

    return { update }

} );
