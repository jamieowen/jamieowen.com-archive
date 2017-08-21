import Sketch from 'three-toolkit/rendering/Sketch';
import SkyDome from 'three-toolkit/objects/SkyDome';
import OrbitControls from 'three-toolkit/controls/OrbitControls';
import LightingRig from 'three-toolkit/lighting/LightingRig';

Sketch( {

    background: 0xff0000,
    near: 0.1,
    far: 5000,

    preload: function( cb ){
        cb();
    }

}, function( scene,camera, manager ){


    let lighting = new LightingRig();
    let dome = new SkyDome();
    let controls = new OrbitControls( manager.domElement, manager.camera );

    scene.add( dome );
    scene.add( lighting );

    let update = ()=>{

        controls.update();

    }

    return { update }

} );
