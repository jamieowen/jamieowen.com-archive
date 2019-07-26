
import MaterialModifier from 'three-material-modifier';

/**
 * Geometry must include an additional attributes
 * vec3 displacementNormal
 * float displacementWeight
 */

export default {

    Lambert: MaterialModifier.extend( 'lambert', {

        className: 'DisplacementLambertMaterial',
        uniforms: {

            displacementMap: { type: 't', value: null },
            displacementScale: { type: 'f', value: 0 },
            displacementBias: { type: 'f', value: 0 }

        },
        vertexShader: {
            uniforms: `
            uniform sampler2D displacementMap;
            uniform float displacementScale;
            uniform float displacementBias;

            attribute vec3 displacementNormal;
            attribute float displacementWeight;

            `,
            preTransform: `
            transformed += normalize( displacementNormal ) * ( texture2D( displacementMap, uv ).x * displacementWeight * displacementScale + displacementBias );
            `
        }

    } ),

    Phong: MaterialModifier.extend( 'phong', {

        className: 'DisplacementPhongMaterial',
        uniforms: {

            displacementMap: { type: 't', value: null },
            displacementScale: { type: 'f', value: 0 },
            displacementBias: { type: 'f', value: 0 }

        },
        vertexShader: {
            uniforms: `
            uniform sampler2D displacementMap;
            uniform float displacementScale;
            uniform float displacementBias;

            attribute vec3 displacementNormal;
            attribute float displacementWeight;

            `,
            preTransform: `
            transformed += normalize( displacementNormal ) * ( texture2D( displacementMap, uv ).x * displacementWeight * displacementScale + displacementBias );
            `
        }

    } )

}
