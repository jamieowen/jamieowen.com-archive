import Sketch from 'three-toolkit/rendering/Sketch';
import HudDisplay from 'three-toolkit/rendering/HudDisplay';
import initOBJLoader from 'three-toolkit/loaders/OBJLoader';
import initFBXLoader from 'three-toolkit/loaders/FBXLoader';
import MeshDepthViews from 'three-toolkit/texture-gen/MeshDepthViews';
import OrbitControls from 'three-toolkit/controls/OrbitControls';
import Simulate from 'three-toolkit/gpgpu/Simulate';
import LightingRig from 'three-toolkit/lighting/LightingRig';

import * as THREE from 'three';
initOBJLoader( THREE );
const OBJLoader = THREE.OBJLoader;

initFBXLoader( THREE );
const FBXLoader = THREE.FBXLoader;

import {
    Mesh,
    SphereBufferGeometry,
    MeshBasicMaterial,
    MeshLambertMaterial,
    TextureLoader,
    MeshDepthMaterial,
    RGBADepthPacking,
    ShaderLib,
    Vector3,
    ShaderMaterial
} from 'three';


Sketch( {

    background: 0xff0000,
    near: 1,
    far: 300,

    preload: function( callback ){

        let loader = new OBJLoader();
        loader.load( 'models/formula-1.obj', ( group )=>{

            let geometry = group.children[0].geometry;
            this.resources = { 'model': geometry };
            callback();

        } );

    }

}, function( scene, camera, manager ){

    let ref = new Mesh(
        this.resources['model'],
        new MeshLambertMaterial({
            color: 0xffffff
        })
    );

    scene.add( ref );

    let lighting = new LightingRig();

    lighting.meta( 'key' ).phi = Math.PI * 0.5;
    lighting.meta( 'fill' ).phi = Math.PI * 0.5;

    console.log( 'META :', lighting.meta('key'), lighting.meta('fill') );

    scene.add( lighting );

    let hud = new HudDisplay();
    manager.addPlugin( hud );

    let meshDepthViews = new MeshDepthViews( {
        views: [ 'top', 'bottom' ]
    })

    let simulationState = new Simulate( {

        numObjects: 5000,
        attributes: [
            'position',
            { name: 'velocity', type: 'vec3' }
        ],
        uniforms: {
            gravity: { value: new Vector3() },
            damping: { value: 0.99 },
            boundsMin: { value: new Vector3() },
            boundsMax: { value: new Vector3() }
        },
        shaderDeclarations: `

        `,
        shaderUpdate: `

            position += velocity;
            velocity *= damping;

        `

    } )

    manager.addRenderable( meshDepthViews );

    let textureLoader = new TextureLoader();
    let testTexture = textureLoader.load( 'textures/height-map.png' );
    hud.addTexture( testTexture );

    for( let i = 0; i<meshDepthViews.views.length; i++ ){

        hud.addTexture( meshDepthViews.views[i].texture );

    }

    let controls = new OrbitControls( manager.renderer.domElement, camera );
    let geometry = this.resources[ 'model' ];

    meshDepthViews.setGeometry( geometry );

    let update = ()=>{

        //lighting.phi += Math.PI * 0.001;

        lighting.theta += Math.PI * 0.001;
        lighting.radius = 100;

        controls.update();

    }

    return { update };
    //return { render, update, resize, pointerDown, pointerUp, pointerMove };

});
