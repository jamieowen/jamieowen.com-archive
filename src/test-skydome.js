import Sketch from 'three-toolkit/rendering/Sketch';
import SkyDome from 'three-toolkit/objects/SkyDome';
import OrbitControls from 'three-toolkit/controls/OrbitControls';
import LightingRig from 'three-toolkit/lighting/LightingRig';
import GradientsTexture from 'three-toolkit/textures/GradientsTexture';

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
    far: 3000,
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
        killGround: false,
        dotFlip: false,
        dotNormalize: true,
        debug:true,
        geometry:{
            segments: 20
        },
        material:{
        }

    });

    let skySource = skyPalettes.skyDefault01.slice(0);
    let newSource = [
        [ 0xffffff, 0x000000 ],
        //[ 0x0000ff, 0x000000 ],
        //[ 0xffffff, 0x333399 ],
        [ 0xffffff, 0x000000 ]
    ]

    let targetSource = skySource;//newSource;

    let source = [ 0x595482, 0xf37953 ];

    let resizeArray = resizeColorArray( source, {
        length: 5,
        easing: easing.easeCircleOut
    } );

    let then = performance.now();

    let resizeGridArray = resizeColorGrid( targetSource, {
        width: 50,
        height: 50,
        shape:{
            easing: easing.easeCubicOut,
            min: 0.2,
            max: 0.5
        }
    });

    let now = performance.now();
    console.log( 'TIME : ', ( now - then ) / 1000 );


    let gradTextureBasic = new GradientsTexture( targetSource, {
        textureOpts: {
            minFilter: NearestFilter,
            magFilter: NearestFilter
        }
    } );

    let gradTextureSmoooth = new GradientsTexture( resizeGridArray, {
        textureOpts: {
            minFilter: NearestFilter,
            magFilter: NearestFilter
        }
    } );

    let planeGeom = new PlaneBufferGeometry(1,1,1,1);
    let plane = new Mesh(
        planeGeom,
        new MeshBasicMaterial( {
            color: 0xffffff,
            map: gradTextureBasic
        })
    );

    plane.scale.set( 100,400,1 );
    plane.scale.multiplyScalar( 3 );
    scene.add( plane );
    plane.position.z = 550;

    let plane2 = plane.clone();
    let dist = 160;
    plane.position.x = -dist; plane2.position.x = dist;
    plane2.material = new MeshBasicMaterial({
        color: 0xffffff,
        map: gradTextureSmoooth
    })
    scene.add( plane2 );


    let ground = new Mesh(
        planeGeom,
        //dome.dome.material
        new MeshBasicMaterial({
            color: 0xffffff
        })
    )

    scene.add( ground );
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

    let time = 0;
    let update = ()=>{

        time += 0.04;

        let dist = 300;
        dome.phi+= 0.01;
        dome.radius = dome.domeRadius + dist + ( Math.sin( time ) * ( dist * 0.5 ) );
        controls.update();

        //dome.rotation.y += 0.05;

    }

    return { update }

} );
