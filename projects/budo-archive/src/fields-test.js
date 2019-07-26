import Sketch from 'three-toolkit/quick-sketch';
import VectorFieldLines from 'three-toolkit/objects/vector-field-lines';

import {
    Mesh,
    SphereBufferGeometry,
    MeshBasicMaterial
} from 'three';

Sketch( {

    opt1: 12,
    opt2: 'etc'

}, ( scene, camera, manager )=>{



    let ref = new Mesh(
        new SphereBufferGeometry(10,10,10),
        new MeshBasicMaterial({
            color: 0xffffff
        })
    );

    scene.add( ref );

    let vectorFieldLines = new VectorFieldLines();

    let update = ()=>{

    }

    return { update };
    //return { render, update, resize, pointerDown, pointerUp, pointerMove };

});
