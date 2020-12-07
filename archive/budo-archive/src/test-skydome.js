import Sketch from 'three-toolkit/rendering/Sketch';
import SkyDome from 'three-toolkit/objects/SkyDome';
import OrbitControls from 'three-toolkit/controls/OrbitControls';
import LightingRig from 'three-toolkit/lighting/LightingRig';
import GradientsTexture from 'three-toolkit/textures/GradientsTexture';

import dat from 'dat.gui';
import Meta from 'toy-ui/meta';
import { default as Toy } from 'toy-ui/dat-gui';
//console.log( dat, dat.gui, Toy );
Toy.init( dat );


import easing from 'three-toolkit/math/easing';
import resizeColorArray from 'three-toolkit/colors/resizeColorArray';
import resizeColorGrid from 'three-toolkit/colors/resizeColorGrid';
import skyPalettes from 'three-toolkit/colors/palettes/sky-grids';

import {
    Vector3,
    PlaneBufferGeometry,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    NearestFilter
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

    let lighting = new LightingRig();
    let dome = new SkyDome({

        domeRadius: 500,
        debug:true

    });

    let planeGeom = new PlaneBufferGeometry(1,1,1,1);

    let outTime = document.createElement( 'div' );
    outTime.style.position = 'fixed';
    outTime.style.top = outTime.style.left = '10px';
    outTime.style.color = 'white';
    outTime.innerText = '0';
    document.body.appendChild( outTime );

    let plane = new Mesh(
        planeGeom,
        new MeshBasicMaterial( {
            color: 0xffffff,
            map: dome.lightColorMap
        })
    );

    plane.scale.set( 100,400,1 );
    plane.scale.multiplyScalar( 3 );
    scene.add( plane );
    plane.position.z = 550;

    let ground = new Mesh(
        planeGeom,
        //dome.dome.material
        new MeshBasicMaterial({
            color: 0xffffff
        })
    );

    //scene.add( ground );
    ground.rotation.x = -Math.PI * 0.5;
    let gs = ( dome.domeRadius * 2 ) * 1.1;
    ground.scale.set( gs,gs,gs );

    let controls = new OrbitControls(
        manager.domElement, manager.camera,{
            distanceBounds: [ 10,10000 ],
            distance: 2000
        } );

    scene.add( dome );
    //scene.add( lighting );

    let uiMeta = new Meta({

        color1: 0x00ff00,
        color2: 0x000000,
        color3: 0x000000,
        vector2: [ 0,2 ],
        vector3: [ 0,3,0.12 ]

    });


    //Toy.addMeta( uiMeta );

    /**uiMeta.on( Meta.CHANGE, ( ev )=>{

        console.log( 'change', ev );

    });**/

    let time = 0;
    let dayTime = 0;

    let update = ()=>{

        time += 0.04;

        dayTime += 0.001;
        dayTime %= 1;

        dome.time = dayTime;

        outTime.innerText = dayTime.toFixed( 3 );

        let dist = 300;
        dome.lightPhi+= 0.005;
        //dome.lightPhi = Math.PI * 0.25;
        dome.lightTheta+= 0.005;
        dome.lightRadius = dome.domeRadius + 40;// + dist + ( Math.sin( time ) * ( dist * 0.5 ) );
        controls.update();

        //dome.rotation.y += 0.05;

    }

    return { update }

} );
