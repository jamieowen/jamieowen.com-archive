
import {
    PlaneGeometry,
    Matrix4,
    BufferGeometry,
    BufferAttribute
} from 'three';

import rotateUvs from './rotateUvs';

const matrix = new Matrix4();
const transformGeometry = ( geometry, yRotation, tx,ty,tz )=>{

    matrix.identity();
    matrix.makeRotationY( yRotation );
    geometry.applyMatrix( matrix );
    matrix.identity();
    matrix.makeTranslation( tx,ty,tz );
    geometry.applyMatrix( matrix );
    return geometry;

}

const makeRotationX = ( geometry, xRotation )=>{

    matrix.identity();
    matrix.makeRotationX( xRotation );
    geometry.applyMatrix( matrix );

}

const makeRotationZ = ( geometry, zRotation )=>{

    matrix.identity();
    matrix.makeRotationZ( zRotation );
    geometry.applyMatrix( matrix );

}


export default function createBoxDisplaceGeometry( topSeg=50 ){

    let seg = topSeg;
    let p1 = new PlaneGeometry( 1,1,seg,1 );
    let p2 = p1.clone();
    let p3 = p1.clone();
    let p4 = p1.clone();

    let top = new PlaneGeometry( 1,1,seg,seg );
    let bottom = new PlaneGeometry( 1,1,1,1 );

    // back
    transformGeometry( p1, Math.PI, 0,-0.5,-0.5 );
    rotateUvs( p1, Math.PI, false, true );

    // front
    transformGeometry( p2, 0, 0,-0.5,0.5 );
    rotateUvs( p2, 0, false, true );

    // left
    transformGeometry( p3, Math.PI * -0.5, -0.5,-0.5,0 );
    rotateUvs( p3, Math.PI * 0.5, false, true );

    // right
    transformGeometry( p4, Math.PI * 0.5, 0.5,-0.5,0 );
    rotateUvs( p4, Math.PI * -0.5, false, true );

    p1.merge( p2 );
    p1.merge( p3 );
    p1.merge( p4 );

    makeRotationX( top, Math.PI * -0.5 );

    p1.merge( top );

    makeRotationX( bottom, Math.PI * 0.5 );

    matrix.identity();
    matrix.makeTranslation( 0,-1.0,0 );
    bottom.applyMatrix( matrix );

    p1.merge( bottom );

    let merged = new BufferGeometry().fromGeometry( p1 );

    console.log( merged );
    // add weighting.

    let position = merged.attributes[ 'position' ].array;
    let displacementNormal = new Float32Array( position.length );
    let displacementWeight = new Float32Array( position.length / 3 );
    let y;

    for( let i = 0, j = 0; i<position.length; i+=3, j++ ){

        displacementNormal[ i ] = 0;
        displacementNormal[ i + 1 ] = 1;
        displacementNormal[ i + 2 ] = 0;

        y = position[ i + 1 ];
        if( y < 0.0001 && y > -0.0001 ){
            displacementWeight[ j ] = 1.0;
        }else{
            displacementWeight[ j ] = 0.0;
        }

        //position[ i + 1 ] = 0.0;

    }
    merged.addAttribute( 'displacementWeight', new BufferAttribute( displacementWeight,1 ) );
    merged.addAttribute( 'displacementNormal', new BufferAttribute( displacementNormal,3 ) );

    return merged;

}
