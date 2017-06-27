
import Sketch from 'three-toolkit/quick-sketch';
import MeshInstancer from 'three-mesh-instancer';

import {
    Mesh,
    MeshBasicMaterial,
    BoxBufferGeometry,
    AmbientLight,
    PointLight,
    PerspectiveCamera
} from 'three';

window.onload = ()=>{

    let sketch = new Sketch( document.body, {

        background: 0x111111,
        near: 0.1,
        far: 2000,

        init: ( scene, camera, manager, sketch )=>{

            let renderer = manager.renderer;
            let boxGeometry = new BoxBufferGeometry(1,1,1);

            let mesh = new Mesh(
                boxGeometry,
                new MeshBasicMaterial({
                    color: 0xffffff
                })
            )
            //scene.add( mesh );

            /**
             * Test style of having multiple layers of objects that are rendered
             * with a different camera each with a slighty different FOV. Might look quite nice.
             */
            // instance count for each layer.
            let fovLayers = [
                59,30,40,20,40
            ];

            let fovSetups = [];
            let fovDepth,instancer;

            for( let i = 0; i<fovLayers.length; i++ ){

                fovDepth =( i * 5 ) + 30;

                instancer = new MeshInstancer(
                    fovLayers[i], boxGeometry, new MeshLambertMaterial()
                );

                fovSetups.push( {

                    camera: new PerspectiveCamera( fovDepth, window.innerWidth/window.innerHeight, 0.1,1000 ),
                    instancer = new MeshInstancer( )

                } )


            }



            scene.add( instancer );
            instancer.frustumCulled = false;

            let instance;
            for( let i = 0; i<10; i++ ){

                instance = instancer.create();
                instance.scale.set( 1,1,1 );
                console.log( instance );

            }

        },

        update: ()=>{

            console.log( 'update' );

        }


    })

}
