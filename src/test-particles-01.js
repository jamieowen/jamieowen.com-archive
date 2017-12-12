import Sketch from 'three-toolkit/rendering/Sketch';
import Simulate from 'three-gpgpu/Simulate';
import MaterialModifier from 'three-material-modifier';
import DomeEnvironment from './lib/objects/DomeEnvironment';
import OrbitControls from 'three-toolkit/controls/OrbitControls';
import SkyDome from './lib/objects/SkyDome';
import Gui from './lib/gui';

import {
    BoxBufferGeometry,
    AmbientLight,
    Mesh,
    MeshPhongMaterial
} from 'three';

Sketch( {

    background: 0x212121

}, function( scene, camera, renderManager ){

    const dome = new SkyDome({
        segW: 30,
        segH: 3
    });
    scene.add( dome );

    dome.groundSphere = true;
    dome.lights[0].position.set( 209,82,0 );
    dome.lights[0].intensity = 0.6;
    dome.lights[1].position.set( 21,25,136 );
    dome.lights[0].intensity = 0.9;
    dome.lights[2].visible = true;
    dome.lights[2].position.set( -100,50,10 );

    Gui.addObject( 'dome', dome, {
        props: [ 
            'visible', 'radius', 'invertColors', 
            'groundSphere' ]
    } );
    
    Gui.addMaterial( 'dome.dome-material', dome.dome.material );
    Gui.addMaterial( 'dome.ground-material', dome.ground.material );

    dome.lightProperties.addToGui( Gui, 'dome' );

    // Gui.add( 'dome.light-properties', dome.lightProperties, {
    //     props: [ 
    //         'autoPosition', 
    //         'autoColorize',
    //         'addDomeRadius',
    //         'phi', 'theta', 'radius'
    //     ]
    // } );


    Gui.addLight( 'dome.lights', dome.lights );


    const testMesh = new Mesh( 
        new BoxBufferGeometry( 1,1,1 ),
        new MeshPhongMaterial({
            color: 0xffffff
        })
    )
    scene.add( testMesh );

    testMesh.scale.multiplyScalar( 4 );
    testMesh.position.y = 8;
    this.testMesh = testMesh;

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

        testMesh.rotation.x += 0.01;
        testMesh.rotation.z += 0.001;
        testMesh.rotation.y += 0.003;
    
        controls.update();

    }

    return {
        update
    }

})