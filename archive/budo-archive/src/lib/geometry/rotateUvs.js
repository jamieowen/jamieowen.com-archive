
import {
    Vector2
} from 'three';


export default function rotateUvs( geometry, angle, flipU=false, flipV=false ){

    let center = new Vector2();
    center.set( 0.5, 0.5 );

    if( geometry.isBufferGeometry ){

        let uv = geometry.attributes[ 'uv' ].array;
        let point = new Vector2();

        for( let i = 0; i<uv.length; i+=2 ){

            point.x = uv[ i ];
            point.y = uv[ i + 1 ];

            point.rotateAround( center, angle );

            uv[ i ] = point.x;
            uv[ i + 1 ] = point.y;

        }

        geometry.attributes[ 'uv' ].needsUpdate = true;


    }else{

        let uv = geometry.faceVertexUvs[0];
        let face;

        for( let i = 0; i<uv.length; i++ ){

            face = uv[ i ];

            face[ 0 ].rotateAround( center, angle );
            face[ 1 ].rotateAround( center, angle );
            face[ 2 ].rotateAround( center, angle );

            if( flipU ){

                face[ 0 ].x = 1 - face[ 0 ].x;
                face[ 1 ].x = 1 - face[ 1 ].x;
                face[ 2 ].x = 1 - face[ 2 ].x;

            }

            if( flipV ){

                face[ 0 ].y = 1 - face[ 0 ].y;
                face[ 1 ].y = 1 - face[ 1 ].y;
                face[ 2 ].y = 1 - face[ 2 ].y;

            }

        }

    }

}
