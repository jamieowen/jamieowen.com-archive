import Sketch from 'three-toolkit/rendering/Sketch';
import MaterialModifier from 'three-material-modifier';
import OrbitControls from 'three-toolkit/controls/OrbitControls';
var glsl = require( 'glslify' );

import {
    CylinderBufferGeometry,
    Mesh,
    MeshBasicMaterial
} from 'three';

Sketch( {

    background: 0x333333,
    fov: 40,
    far: 2000

}, function( scene,camera,manager ){

    //radiusTop, radiusBottom, height,
    //radialSegments, heightSegments,
    //openEnded, thetaStart, thetaLength

    let height = 50;
    let radialSeg = 360;
    let heightSeg = 100;

    let geometry = new CylinderBufferGeometry(
        1,1,1,radialSeg,heightSeg,false,0,Math.PI*2
    );

    let WheelMaterial = MaterialModifier.extend( 'basic', {

        vertexShader: {
            uniforms: `
            precision highp float;

            vec3 hsv2rgb(vec3 c) {

                vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
                vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);

            }

            varying vec3 vRGB;
            `,
            preTransform: `

            /**
                hsv.x is the hue. ( theta )
                hsv.y is the saturation. ( radius )
                hsv.z is the value. ( y axis )
            **/

            vec3 p = position;
            vec3 hsv;
            hsv.x = ( atan( p.x,p.z ) + PI ) / PI2;
            hsv.y = normalize( length( p.xz ) );
            hsv.z = p.y + 0.5;

            vRGB = hsv2rgb( hsv );

            `
        },
        fragmentShader: {

            uniforms: `
                varying vec3 vRGB;
            `,

            postFragColor: `
                gl_FragColor.rgb = vRGB;
            `

        }

    });

    let mesh = new Mesh(
        geometry,
        new WheelMaterial({
            color: 0xffffff,
            wireframe: false
        })
    )

    mesh.scale.set( 100,75,100 );

    scene.add( mesh );

    let controls = new OrbitControls( manager.domElement,camera );



    let update = ()=>{

        controls.update();

    }

    return { update }

} )
