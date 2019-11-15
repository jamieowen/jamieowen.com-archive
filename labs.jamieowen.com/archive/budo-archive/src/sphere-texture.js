
import Sketch from 'three-toolkit/quick-sketch';
import HudDisplay from 'three-toolkit/rendering/hud-display';
import SphereNoise from 'three-toolkit/textures/sphere-noise';
import MaterialModifier from 'three-material-modifier';

import {
    Mesh,
    SphereBufferGeometry,
    MeshLambertMaterial,
    MeshBasicMaterial,
    TextureLoader,
    SphericalReflectionMapping,
    AmbientLight,
    DirectionalLight
} from 'three';


window.onload = ()=>{

    let hud = new HudDisplay();
    let sphereNoise = new SphereNoise();

    hud.addTexture( sphereNoise );

    let loader = new TextureLoader();
    let texture = loader.load( 'src-static/maps/sphere-earth-night.jpg', ()=>{

        texture.mapping = SphericalReflectionMapping;
        texture.needsUpdate = true;
        hud.addTexture( texture );

    })

    let sketch = new Sketch( document.body, {

        background: 0x333333,
        plugins: [ hud ],
        renderables: [ sphereNoise ],

        init: ( scene, camera, manager, sketch )=>{

            let mesh = new Mesh(
                new SphereBufferGeometry(10,30,30),
                new MeshLambertMaterial( {
                    color: 0xffffff,
                    //map: texture
                    map: sphereNoise.texture

                })
            )

            let c = 4;
            let meshes = [];
            for( let i = 0; i<c; i++ ){
                scene.add( mesh );
                mesh.position.x = ( i * 22 ) - ( (c-1) * 22 / 2 );
                mesh = mesh.clone();
                mesh.rotateY( Math.PI * 0.25 );
                mesh.rotateX( Math.PI * 0.5 );
                meshes.push( mesh );
            }

            let amb = new AmbientLight( 0xffffff, 0.8 );
            let dir = new DirectionalLight( 0xffffff, 1.2 );

            scene.add( amb );
            scene.add( dir );
            dir.position.set( 10,5,10 );

            console.log( 'SCENE : ', scene, scene.rotation );
            debug( scene );

            let update = ()=>{

                for( let i = 0; i<meshes.length; i++ ){
                    mesh = meshes[i];
                    //mesh.rotateY( Math.PI * 0.001 );
                    //mesh.rotateX( Math.PI * 0.001 );
                }

                //scene.rotateY( Math.PI * 0.001 );
                requestAnimationFrame( update );

            }

            update();
            camera.position.z = 100;

        },

        render: ( renderer)=>{

        },

        pointer: ( x,y, w,h )=>{

            let xR = ( x / w ) * 2.0 - 1.0;

            sketch.manager.scene.rotation.y = xR * Math.PI;

        }

    } );


}

let toCartesian = ( position,radius,phi,theta )=>{

    position.x = radius * Math.sin(phi) * Math.sin(theta);
    position.y = radius * Math.cos(phi);
    position.z = radius * Math.sin(phi) * Math.cos(theta);

    return position;

}


let debug = ( scene )=>{

    let mesh;

    let r = 10.0;

    let uv = {
        x: 0,
        y: 0
    }

    let geometry = new SphereBufferGeometry(0.5,3,3);
    let s;

    let c = 50;
    let cm1 = c-1;

    for( let i = 0; i<c; i++ ){

        let mesh = new Mesh(
            geometry,
            new MeshBasicMaterial( {
                color: i === 0 ? 0xffffff : 0xff00ff,
                depthTest: false
            })
        )

        s = i === 0 ? 0.5 : 1;
        mesh.scale.set( s,s,s );

        scene.add( mesh );
        mesh.renderOrder = i === 0 ? 101 : 100;

        // phi
        uv.x = ( i / cm1 ) * ( Math.PI * 2.0 ) + ( Math.PI * 0.5 );
        // theta
        uv.y = Math.PI * 0.5;
        //uv.y = ( i / cm1 ) * ( Math.PI * 2.0 );

        // /console.log( uv );
        toCartesian( mesh.position, r, uv.x, uv.y );




    }
}
