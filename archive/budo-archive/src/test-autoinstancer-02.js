import Sketch from 'three-toolkit/rendering/Sketch';
import MaterialModifier from 'three-material-modifier';
import LightingRig from 'three-toolkit/lighting/LightingRig';
import AutoInstancer2 from 'three-toolkit/batching/AutoInstancer2';

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

    throw new Error( 'Needs fixing based on changes to names of rotate,scale,transform attributes ( see AutoInstancer01 ), Decided to park this route using matrix element updates for now. Seemed that there may be bettwe ways to optimized the matrix decompose route' );
    
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

    // https://github.com/mattatz/ShibuyaCrowd/blob/master/source/shaders/common/quaternion.glsl
    let InstancedMaterial = MaterialModifier.extend( 'lambert', {
        vertexShader: {
            uniforms: `

                vec4 qmul(vec4 q1, vec4 q2) {
                	return vec4(
                		q2.xyz * q1.w + q1.xyz * q2.w + cross(q1.xyz, q2.xyz),
                		q1.w * q2.w - dot(q1.xyz, q2.xyz)
                	);
                }

                vec3 rotate_vector(vec3 v, vec4 r) {
                	vec4 r_c = r * vec4(-1, -1, -1, 1);
                	return qmul(r, qmul(vec4(v, 0), r_c)).xyz;
                }

                mat4 rotationMatrix(vec3 axis, float angle) {
    			    axis = normalize(axis);
    			    float s = sin(angle);
    			    float c = cos(angle);
    			    float oc = 1.0 - c;
    			    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    			                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    			                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    			                0.0,                                0.0,                                0.0,                                1.0
    			            );
    			}

                attribute vec4 elements1;
                attribute vec4 elements2;
                attribute vec4 elements3;
                attribute vec4 elements4;

                //attribute vec3 translate;
                //attribute vec4 rotation;
                //attribute vec3 scale;

            `,
            preNormal: `
                mat4 rotationMatrix = mat4( elements1,elements2,elements3,elements4 );
                objectNormal.xyz = ( vec4( objectNormal.xyz, 1.0 ) * rotationMatrix ).xyz;

                //objectNormal.xyz = rotate_vector( objectNormal, rotation );
            `,
            preTransform: `

                transformed = ( vec4( transformed.xyz, 1.0 ) * rotationMatrix ).xyz;

                //transformed *= scale;
                //transformed = rotate_vector( transformed, rotation );
                //transformed += translate;

            `
        }
    })

    console.log( 'AI : 2 ' );
    let container = new Object3D();

    let boxGeometry = new BoxBufferGeometry(1,1,1,1,1,1);
    let sphereGeometry = new SphereBufferGeometry(1,1,1);
    let planeGeometry = new PlaneBufferGeometry(1,1,1,1);
    let sourceGeometry = planeGeometry;

    let meshes = [];

    let useInstancer = true;

    let childCount = 25;
    let maxDepth = 2;
    let totalObjects = 0;

    let buildRecursiveTree = function( parent, depth ){

        let mesh;

        for( let i = 0; i<childCount; i++ ){

            mesh = new Mesh(
                sourceGeometry,
                new InstancedMaterial( {color: 0xffffff } )
            );
            mesh.frustumCulled = false;

            totalObjects++;
            parent.add( mesh );
            mesh.userData.depth = depth;
            let step = depth * ( Math.PI / childCount );

            let s = 1 - ( depth / maxDepth );

            let n = i / childCount;
            mesh.position.setFromSpherical( {
                phi: Math.PI * n,
                theta: Math.PI * 2 * n,
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


    let autoInstancer = new AutoInstancer2( container, {
        enableInstancing: false,
        meshDefinitions: [
            {
                poolCount: totalObjects,
                geometry: sourceGeometry,
                material: InstancedMaterial,
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
    window.addEventListener( 'keyup', (ev)=>{
        if( ev.which == 32 ){
            paused = !paused;
        }
    })

    let time = 0;
    let update = ()=>{

        if( paused ){
            return;
        }

        time += 0.05;

        container.rotation.z += 0.001;
        container.rotation.x += 0.005;

        let cs = ( Math.sin( time ) * 0.2 ) + 1.0;
        container.scale.set( cs,cs,cs );

        let mesh,s,d;

        for( let i = 0; i<meshes.length; i++ ){

            mesh = meshes[i];
            mesh.rotation.x += 0.001;
            mesh.rotation.y += 0.003 * mesh.userData.depth;

            if( mesh.userData.depth > 2 ){
                mesh.rotation.z += 0.01 * mesh.userData.depth;
                mesh.rotation.x += 0.02 * mesh.userData.depth;
            }
        }

    }

    let lighting1 = new LightingRig();
    let sceneInstancer = new Scene();
    sceneInstancer.add( lighting1 );
    sceneInstancer.add( autoInstancer );
    //lighting1.light( 'fill' ).visible = false;
    //lighting1.light( 'key' ).visible = false;

    window.lighting = lighting1;

    let lighting2 = new LightingRig();
    let sceneRegular = new Scene();
    //lighting2.light( 'key' ).visible = false;
    sceneRegular.add( lighting2 );
    sceneRegular.add( container );

    sceneRegular.overrideMaterial = new MeshLambertMaterial({color:0xffffff })
    let r = manager.renderer;
    r.autoClear = false;

    let renderBoth = false;

    let render = ()=>{

        if( paused ){
            return;
        }
        r.clear();

        lighting1.theta+=0.009;
        lighting2.theta+=0.009;

        if( renderBoth ){

            let w = window.innerWidth;
            let h = window.innerHeight;

            r.setScissorTest( true );

            r.setViewport( 0,0, w * 0.5, h );
            r.setScissor( 0,0, w * 0.5, h );
            r.render( sceneRegular, camera );

            r.setViewport( w * 0.5,0, w * 0.5, h );
            r.setScissor( w * 0.5,0, w * 0.5, h );
            r.render( sceneInstancer, camera );

        }else{

            //r.render( sceneRegular, camera );
            r.render( sceneInstancer, camera );

        }


    }

    return { update, render };

} );
