
import Sketch from 'three-toolkit/quick-sketch';
import MeshInstancer from 'three-mesh-instancer';

import {
    Mesh,
    MeshBasicMaterial,
    BoxBufferGeometry
} from 'three';

window.onload = ()=>{

    let sketch = new Sketch( document.body, {

        background: 0x111111,
        near: 0.1,
        far: 2000,

        init: ( scene, camera, manager, sketch )=>{

            console.log( 'INIT', this );

            let boxGeometry = new BoxBufferGeometry(1,1,1);

            let mesh = new Mesh(
                boxGeometry,
                new MeshBasicMaterial({
                    color: 0xffffff
                })
            )
            //scene.add( mesh );

            let instancer = new MeshInstancer(
                100, boxGeometry, new MeshBasicMaterial()
            );

            scene.add( instancer );
            instancer.frustumCulled = false;

            let instance;
            for( let i = 0; i<10; i++ ){

                instance = instancer.create();
                instance.scale.set( 1,1,1 );
                instance.position.set( i * 4, 0,0 ); 
                console.log( instance );

            }

        },

        update: ()=>{

            console.log( 'update' );

        }


    })
    console.log( 'OK' );

}
