import Sketch from 'three-toolkit/rendering/Sketch';
import Simulate from 'three-gpgpu/Simulate';
import MaterialModifier from 'three-material-modifier';
import DomeEnvironment from './lib/objects/DomeEnvironment';
import OrbitControls from 'three-toolkit/controls/OrbitControls';

import {
    BoxBufferGeometry,
    AmbientLight
} from 'three';

Sketch( {

    background: 0x333333

}, function( scene, camera, renderManager ){

    const dome = new DomeEnvironment();
    scene.add( dome );

    const light = new AmbientLight( 0xffffff,0.8 );
    // scene.add( light );

    const controls = new OrbitControls( renderManager.domElement,camera );

    const size = 128;
    const simulate = new Simulate( {
        width: size,
        height: size,
        attributes: [
            {
                name: 'position',
                size: 3,
                initialState: ( vec, i,x,y )=>{

                    // position
                    vec.x = Math.random();
                    vec.y = Math.random();
                    vec.z = Math.random();

                }

            },
            {
                name: 'color',
                size: 3,
                initialState: ( vec, i,x,y )=>{

                    // color
                    vec.x = Math.random();
                    vec.y = Math.random();
                    vec.z = Math.random();

                }

            }
        ],
        uniforms: {

        },
        updateShader: {

            declarations: `

            `,
            updateSimulation: `
            Model updateSimulation( Model sim ){

                // do something.
                return sim;

            }
            `

        }

    });

    // const SimInstancedLambertMaterial = MaterialModifier.extend( 'lambert', {

    //     uniforms: {

    //     },
    //     fragmentShader: {
    //         replace: [
    //             [ 'uniform vec3 diffuse;', 'varying vec3 diffuse;' ],
    //             [ 'uniform vec3 emissive;', 'varying vec3 emissive;' ],
    //             [ 'uniform float opacity;', 'varying float opacity;' ]
    //         ]
    //     },
    //     vertexHooks: {
    //         replaceDiffuse:'#replace:#uniform vec3 diffuse;'
    //     },
    //     vertexShader: {

    //     }

    // });


    const update = ()=>{

        controls.update();

    }

    return {
        update
    }

})