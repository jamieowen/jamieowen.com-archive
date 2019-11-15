import Sketch from 'three-toolkit/rendering/Sketch';
import LightingRig from 'three-toolkit/lighting/LightingRig';
import OrbitControls from 'three-toolkit/controls/OrbitControls';
import AutoInstancer from 'three-toolkit/batching/AutoInstancer';

import InstancedLambertMaterial from 'three-toolkit/materials/InstancedLambertMaterial';

import {
    Object3D,
    Mesh,
    MeshLambertMaterial,
    BoxBufferGeometry
} from 'three';

Sketch({

    background: 0xff00ff

}, function( scene, camera, manager ){

    let container = new Object3D();
    let sourceGeometry = new BoxBufferGeometry(1,1,1,1,1,1);

    let count = 20; let radius = 10;
    let theta = ( Math.PI * 2 ) / ( count -1 );

    let items = [];
    let mesh;
    for( let i = 0; i<count; i++ ){

        mesh = new Mesh(
            sourceGeometry,

            //new MeshLambertMaterial({
            new InstancedLambertMaterial({
                color: 0xffffff
            })
        )

        mesh.scale.set( 2,2,2 );
        mesh.position.x = Math.cos( i * theta ) * radius;
        mesh.position.y = Math.sin( i * theta ) * radius;

        mesh.rotation.z = i * theta;

        container.add( mesh );

    }

    // NEED TO RESTRICT DRAW RANGE, ETC WHEN TRAVERSING GRAPH
    // IN AUTO INSTANCER
    let instancer = new AutoInstancer( container, {
        meshDefinitions: [
            {
                poolCount: count,
                geometry: sourceGeometry,
                material: InstancedLambertMaterial,
                addPivot: false,
                meshAttributes: {
                },
                materialAttributes: {
                }
            }
        ]
    });

    let controls = new OrbitControls( manager.domElement, camera );

    let lighting = new LightingRig();

    scene.add( lighting );
    scene.add( instancer );
    //scene.add( container );

    let update = ()=>{
        controls.update();
    }

    return { update };

} );
