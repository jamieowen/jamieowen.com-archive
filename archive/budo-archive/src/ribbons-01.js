import Sketch from 'three-toolkit/quick-sketch';

import RibbonsCpuSim from 'three-toolkit/objects/ribbons-cpusim'
import LightingRig from 'three-toolkit/objects/lighting-rig';

import {
    Vector3,
    Mesh,
    SphereBufferGeometry,
    MeshLambertMaterial
} from 'three';

Sketch( {

    background: 0xffffff

},( scene, camera, manager )=>{

    console.log( 'DONE : ', scene, camera, manager );

    camera.position.set( 50,10,75 );
    camera.lookAt( scene.position );

    let lighting = new LightingRig();
    scene.add( lighting );

    let ref = new Mesh(
        new SphereBufferGeometry( 10 ),
        new MeshLambertMaterial( {
            color: 0xcd4444
        })
    );
    //scene.add( ref );

    let bounds = 70;

    let createData = ()=>{

        let data = [];
        let ribbonCount = 100;
        let item;

        for( let i = 0; i<ribbonCount; i++ ){

            // required values.
            item = {
                x: -bounds + ( Math.random() * bounds * 1.5 ),
                y: Math.random() * bounds,
                z: Math.random() * bounds,
                thickness: 0.1 + ( Math.random() * 0.2 ),
                r: 1.0,
                g: 0.0,
                b: 1.0,
                speed: Math.random() * 0.25
            }

            data.push( item );

        }

        return data;

    }

    let updateRibbons = ( ribbonData,i )=>{

        ribbonData.x += 0.05 + ribbonData.speed;
        ribbonData.y += Math.sin( ribbonData.x ) * 0.05;
        ribbonData.z -= 0.1;

        if( ribbonData.x > bounds ){
            let z = Math.random() * bounds;
            ribbonData.z = z;
            ribbonData.x = -bounds; // this has to be added.
            ribbons.resetHistoryData( i, { x: -bounds, z:z } );
        }

    }

    let ribbons = new RibbonsCpuSim( createData(), updateRibbons, {

        precomputeHistory: true,
        ribbonLength: 50,
        //addDebugLines: true,
        useColor: true

    } );

    ribbons.frustumCulled = false;
    scene.add( ribbons );

    let update = ()=>{

        ribbons.update();

    }

    return { update };

})
