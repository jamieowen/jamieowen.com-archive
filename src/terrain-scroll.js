
import Sketch from 'three-toolkit/rendering/Sketch';
import HudDisplay from 'three-toolkit/rendering/HudDisplay';
import LightingRig from 'three-toolkit/lighting/LightingRig';
import OrbitControls from 'three-toolkit/controls/OrbitControls';
import MaterialModifier from 'three-material-modifier';


import {
    Mesh,
    BoxBufferGeometry,
    PlaneBufferGeometry,
    MeshLambertMaterial,
    TextureLoader,
    VertexNormalsHelper,
    BufferAttribute,
    Matrix4,
    FlatShading
} from 'three';

import DisplacementMaterial from './lib/materials/DisplacementMaterial';
import createBoxDisplaceGeometry from './lib/geometry/createBoxDisplaceGeometry';

let hud = new HudDisplay();

Sketch( {

    background: 0x0000ff,
    plugins: [ hud ],
    renderer: {
        logarithmicDepthBuffer: true
    },
    near: 0.1,
    far: 60

}, ( scene, camera, manager )=>{

    //let boxGeometry = new BoxBufferGeometry(1,1,1,100,100,100);

    let loader = new TextureLoader();
    let texture = loader.load( 'textures/height-map.png', ( res )=>{

        hud.addTexture( texture );

    });

    let terrainGeometry = createBoxDisplaceGeometry( 20 );

    let controls = new OrbitControls( manager.renderer.domElement, camera );

    let base = new Mesh(
        terrainGeometry,
        //new MeshLambertMaterial({
        new DisplacementMaterial.Phong( {
            color: 0xffffff,
            shading: FlatShading
            //map: texture
            //wireframe: true
        })
    )

    base.material.uniforms.displacementMap.value = texture;
    base.material.uniforms.displacementScale.value = 0.5;

    let s = 5.0;

    base.scale.set( s,s,s );
    scene.add( base );


    let base2 = new Mesh(
        terrainGeometry,
        //new MeshLambertMaterial({
        new DisplacementMaterial.Phong( {
            color: 0x0000ff,
            shading: FlatShading
            //map: texture
            //wireframe: true
        })
    )

    base2.scale.set( s - 0.01,s,s - 0.01 );
    scene.add( base2 );
    base2.rotation.y = Math.PI;// * 0.5;
    //base2.position.x = 10;

    base2.material.uniforms.displacementMap.value = texture;
    base2.material.uniforms.displacementScale.value = 0.2;

    let seg = 10;
    let planeGeometry = new PlaneBufferGeometry( 1,1,seg,seg );

    let matrix = new Matrix4();
    matrix.makeRotationX( Math.PI * -0.5 );
    planeGeometry.applyMatrix( matrix );

    let position = planeGeometry.attributes[ 'position' ].array;
    let displacementNormal = new Float32Array( position.length );
    let displacementWeight = new Float32Array( position.length / 3 );

    for( let i = 0, j = 0; i<position.length; i+=3, j++ ){

        displacementNormal[ i ] = 0.0;
        displacementNormal[ i + 1 ] = 1.0;
        displacementNormal[ i + 2 ] = 0.0;

        if( position[ i + 1 ] < 0.000001 ){

            displacementWeight[ j ] = 1.0;
        }else{
            displacementWeight[ j ] = 0.0;
        }

        //let y = position[ i + 1 ].toFixed(9);
        //position[ i + 1 ] = 0.0;
        //console.log( 'PLANE Y : ', y, y < 0.001, y == 0 );

    }

    planeGeometry.addAttribute( 'displacementWeight', new BufferAttribute( displacementWeight,1 ) );
    planeGeometry.addAttribute( 'displacementNormal', new BufferAttribute( displacementNormal,3 ) );

    let test = new Mesh(
        planeGeometry,
        //new MeshLambertMaterial({
        new DisplacementMaterial.Lambert( {
            color: 0xffffff//,
            //wireframe: true
        })
    )

    test.material.uniforms.displacementMap.value = texture;
    test.material.uniforms.displacementScale.value = 0.5;

    //scene.add( test );
    test.scale.set( s,s,s );
    test.position.y = 5;


    let lighting = new LightingRig({
        debug: true
    });
    scene.add( lighting );

    console.log( lighting );

    let normalsHelper = new VertexNormalsHelper( base );
    //scene.add( normalsHelper );

    let update = ()=>{

        controls.update();

    }

    return { update };

})
