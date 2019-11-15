import Sketch from 'three-toolkit/rendering/Sketch';
import MaterialModifier from 'three-material-modifier';
import LightingRig from 'three-toolkit/lighting/LightingRig';
import AutoInstancer from 'three-toolkit/batching/AutoInstancer';
import OrbitControls from 'three-toolkit/controls/OrbitControls';
import InstancedLambertMaterial from 'three-toolkit/materials/InstancedLambertMaterial';

import {

    Object3D,
    Scene,
    Mesh,
    BoxBufferGeometry,
    PlaneBufferGeometry,
    SphereBufferGeometry,
    MeshBasicMaterial,
    MeshLambertMaterial,
    DoubleSide

} from 'three';

Sketch( {

    background: 0x000000,
    preload: function( cb ){
        cb();
    }

}, function( scene, camera, manager ){


    let lighting = new LightingRig({

    });
    scene.add( lighting );

    // If we were preparing something for use with the AutoBatcher
    // May be the material modifier could be extended to contain a couple of new things :
    // + One is sharing of vertex fragment String - via a getter/setter - so a string primitive is not declared on each material
    // + A Metadescriptor object as static refrence on the Materials Class - that gives details on attributes,
    // + A method to convert base three.js uniforms ( diffuse,emissive,etc ) to attributes. ( and show them in the metadescriptor )
    // + a new material modifier  with new defaultHooks on the static class to extend the material further.
    // + auto creation of uniform getters / setters.
    // + additional hook commands - convert uniform to attribute, replace:, etc.

    let ViewShiftMaterial = MaterialModifier.extend( 'lambert', {
        vertexShader: {
            uniforms: `

                attribute vec3 translate;
                attribute vec4 rotate;

            `,
            preTransform: `

                transformed += translate;

            `
        }
    });


    let container = new Object3D();

    let boxGeometry = new BoxBufferGeometry(1,1,1,1,1,1);
    let sphereGeometry = new SphereBufferGeometry(1,1,1);
    let planeGeometry = new PlaneBufferGeometry(1,1,1,1);
    let sourceGeometry = boxGeometry;

    let meshes = [];

    let useInstancer = true;

    let childCount = 30;
    let maxDepth = 1;
    let totalObjects = 0;

    let buildRecursiveTree = function( parent, depth ){

        let mesh;

        for( let i = 0; i<childCount; i++ ){

            mesh = new Mesh(
                sourceGeometry,
                new InstancedLambertMaterial( {color: 0xffffff } )
            );
            mesh.frustumCulled = false;

            totalObjects++;

            let rand = Math.random();
            parent.add( mesh );
            mesh.userData.depth = depth;
            mesh.userData.rand = rand;

            let step = depth * ( Math.PI / childCount );

            let s = 1 - ( depth / maxDepth );

            let n = i / childCount;
            mesh.position.setFromSpherical( {
                phi: Math.PI * n ,
                theta: Math.PI * 2 * n * rand,
                radius: ( 35 * s ) + 4
            })

            let ss = ( s * 1.4 ) + 0.3;
            //console.log( ss );
            mesh.scale.set( ss,ss,ss );
            meshes.push( mesh );


            if( depth < maxDepth ){
                buildRecursiveTree( mesh, depth+1 );
            }

        }

    }

    buildRecursiveTree( container, 0 );
    console.log( 'TOTAL OBJECTS : ', totalObjects );


    let autoInstancer = new AutoInstancer( container, {
        enableInstancing: false,
        meshDefinitions: [
            {
                poolCount: totalObjects,
                geometry: sourceGeometry,
                material: InstancedLambertMaterial,
                addPivot: false,
                meshAttributes: {
                },
                materialAttributes: {
                    emissive: { size: 3, update: (material,array,offset)=>{

                        array[ offset ] = material.emissive.r;
                        array[ offset + 1 ] = material.emissive.g;
                        array[ offset + 2 ] = material.emissive.b;

                    } }
                }
            }
        ]
    });

    let paused = false;
    let renderBoth = false;

    window.addEventListener( 'keyup', (ev)=>{
        if( ev.which == 32 ){
            paused = !paused;
        }else
        if( ev.which == 86 ){
            renderBoth = !renderBoth;
        }
    })

    let time = 0;
    let controls = new OrbitControls( manager.domElement, camera );

    let update = ()=>{

        if( paused ){
            return;
        }

        controls.update();

        time += 0.05;

        //container.rotation.z += 0.001;
        //container.rotation.x += 0.005;

        let cs = ( Math.sin( time ) * 0.2 ) + 1.0;
        //container.scale.set( cs,cs,cs );

        let mesh,s,d;

        for( let i = 0; i<meshes.length; i++ ){

            mesh = meshes[i];

            mesh.rotation.x += 0.05 * mesh.userData.rand;
            mesh.rotation.y += 0.03 * mesh.userData.depth;
            mesh.rotation.z += 0.05 * mesh.userData.rand;

            if( mesh.userData.depth > 0 ){
                mesh.rotation.z += 0.05 * mesh.userData.depth * mesh.userData.rand;
                mesh.rotation.x += 0.3 * mesh.userData.depth;
            }
        }

    }


    let lighting1 = new LightingRig();
    let sceneInstancer = new Scene();
    sceneInstancer.add( lighting1 );
    sceneInstancer.add( autoInstancer );
    let lighting2 = new LightingRig();
    let sceneRegular = new Scene();
    sceneRegular.add( lighting2 );
    sceneRegular.add( container );

    lighting1.light( 'fill' ).visible = lighting2.light( 'fill' ).visible = false;
    //lighting1.light( 'key' ).visible = lighting2.light( 'key' ).visible = false;

    sceneRegular.overrideMaterial = new MeshLambertMaterial({color:0xffffff })
    let r = manager.renderer;
    r.autoClear = false;

    let render = ()=>{

        if( paused ){
            return;
        }
        r.clear();

        lighting1.theta+=0.009;
        lighting2.theta+=0.009;

        let w = window.innerWidth;
        let h = window.innerHeight;

        if( renderBoth ){

            r.setScissorTest( true );

            r.setViewport( w * 0.5,0, w * 0.5, h );
            r.setScissor( w * 0.5,0, w * 0.5, h );
            r.render( sceneInstancer, camera );

            r.setViewport( 0,0, w * 0.5, h );
            r.setScissor( 0,0, w * 0.5, h );
            r.render( sceneRegular, camera );

        }else{

            r.setScissorTest( false );
            r.setViewport( 0,0, w, h );
            r.setScissor( 0,0, w, h );
            //r.render( sceneRegular, camera );
            r.render( sceneInstancer, camera );

        }


    }

    return { update, render };

} );
