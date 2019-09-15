import MaterialModifier from 'three-material-modifier';
import compileMaterialClass from 'three-material-modifier/compileMaterialClass';

import {
    MeshLambertMaterial,
    ShaderLib
} from 'three';

export default {

    Lambert: compileMaterialClass( {
        extend: MeshLambertMaterial,
        className: 'OpacityLightMaterial',
        typeCheck: 'isMeshLambertMaterial',
        uniforms: ShaderLib.lambert.uniforms,
        vertexShader: `
            #define LAMBERT
            varying vec4 vLightFront;
            #ifdef DOUBLE_SIDED
                varying vec4 vLightBack;
            #endif
            #include <common>
            #include <uv_pars_vertex>
            #include <uv2_pars_vertex>
            #include <envmap_pars_vertex>
            #include <bsdfs>
            #include <lights_pars>
            #include <color_pars_vertex>
            #include <fog_pars_vertex>
            #include <morphtarget_pars_vertex>
            #include <skinning_pars_vertex>
            #include <shadowmap_pars_vertex>
            #include <logdepthbuf_pars_vertex>
            #include <clipping_planes_pars_vertex>
            void main() {
                #include <uv_vertex>
                #include <uv2_vertex>
                #include <color_vertex>
                #include <beginnormal_vertex>
                #include <morphnormal_vertex>
                #include <skinbase_vertex>
                #include <skinnormal_vertex>
                #include <defaultnormal_vertex>
                #include <begin_vertex>
                #include <morphtarget_vertex>
                #include <skinning_vertex>
                #include <project_vertex>
                #include <logdepthbuf_vertex>
                #include <clipping_planes_vertex>
                #include <worldpos_vertex>
                #include <envmap_vertex>

                vec3 diffuse = vec3( 1.0 );
                
                GeometricContext geometry;
                geometry.position = mvPosition.xyz;
                geometry.normal = normalize( transformedNormal );
                geometry.viewDir = normalize( -mvPosition.xyz );
                
                GeometricContext backGeometry;
                backGeometry.position = geometry.position;
                backGeometry.normal = -geometry.normal;
                backGeometry.viewDir = geometry.viewDir;
                
                vLightFront = vec4( 0.0 );
                
                #ifdef DOUBLE_SIDED
                    vLightBack = vec4( 0.0 );
                #endif
                
                IncidentLight directLight;
                float dotNL;
                float sat;
                vec3 directLightColor_Diffuse;
                
                #if NUM_POINT_LIGHTS > 0
                
                    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
                
                        getPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );
                
                        dotNL = dot( geometry.normal, directLight.direction );
                        directLightColor_Diffuse = PI * directLight.color;

                        sat = saturate( dotNL );
                        vLightFront.a += sat;

                        // vLightFront.rgb += vLightFront.a * directLightColor_Diffuse;
                        // vLightFront.rgb += directLightColor_Diffuse;

                        vLightFront.rgb += mix( vec3(1.0), directLightColor_Diffuse, sat );
                        // vLightFront.rgb = vec3( 1.0 );

                        // Look at blending point light colors together, 
                        // also rather than multiply by the dot, how about adjusting lightness / chroma / etc 
                
                        #ifdef DOUBLE_SIDED
                        
                            sat = saturate( -dotNL );
                            vLightBack.a += sat;
                            // vLightBack.rgb += saturate( -dotNL ) * directLightColor_Diffuse;
                            vLightBack.rgb += mix( vec3(1.0), directLightColor_Diffuse, sat );
                
                        #endif
                
                    }
                
                #endif
                
                #if NUM_SPOT_LIGHTS > 0
                
                    for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
                
                        getSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );
                
                        dotNL = dot( geometry.normal, directLight.direction );
                        directLightColor_Diffuse = PI * directLight.color;
                
                        vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
                
                        #ifdef DOUBLE_SIDED
                
                            vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
                
                        #endif
                    }
                
                #endif
                
                /*
                #if NUM_RECT_AREA_LIGHTS > 0
                    for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
                        // TODO (abelnation): implement
                    }
                #endif
                */
                
                #if NUM_DIR_LIGHTS > 0
                
                    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
                
                        getDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );
                
                        dotNL = dot( geometry.normal, directLight.direction );
                        directLightColor_Diffuse = PI * directLight.color;
                
                        vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
                
                        #ifdef DOUBLE_SIDED
                
                            vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
                
                        #endif
                
                    }
                
                #endif
                
                #if NUM_HEMI_LIGHTS > 0
                
                    for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
                
                        vLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
                
                        #ifdef DOUBLE_SIDED
                
                            vLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );
                
                        #endif
                
                    }
                
                #endif

                #include <shadowmap_vertex>
                #include <fog_vertex>
            }                
        `,
        fragmentShader: `
            uniform vec3 diffuse;
            uniform vec3 emissive;
            uniform float opacity;
            varying vec4 vLightFront;
            #ifdef DOUBLE_SIDED
                varying vec4 vLightBack;
            #endif
            #include <common>
            #include <packing>
            #include <dithering_pars_fragment>
            #include <color_pars_fragment>
            #include <uv_pars_fragment>
            #include <uv2_pars_fragment>
            #include <map_pars_fragment>
            #include <alphamap_pars_fragment>
            #include <aomap_pars_fragment>
            #include <lightmap_pars_fragment>
            #include <emissivemap_pars_fragment>
            #include <envmap_pars_fragment>
            #include <bsdfs>
            #include <lights_pars>
            #include <fog_pars_fragment>
            #include <shadowmap_pars_fragment>
            #include <shadowmask_pars_fragment>
            #include <specularmap_pars_fragment>
            #include <logdepthbuf_pars_fragment>
            #include <clipping_planes_pars_fragment>
            void main() {
                #include <clipping_planes_fragment>

                vec4 diffuseColor = vec4( diffuse, opacity );
                ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
                vec3 totalEmissiveRadiance = emissive;

                #include <logdepthbuf_fragment>
                #include <map_fragment>
                #include <color_fragment>
                #include <alphamap_fragment>
                #include <alphatest_fragment>
                #include <specularmap_fragment>
                #include <emissivemap_fragment>

                // indirect lighing ( surface diffuse color and ambient light )
                reflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );
                #include <lightmap_fragment>
                reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );

                float blendOpacity;
                // new
                reflectedLight.indirectDiffuse = diffuseColor.rgb;

                // direct diffuse ( real light sources )
                #ifdef DOUBLE_SIDED
                    reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront.rgb : vLightBack.rgb;
                    blendOpacity = ( gl_FrontFacing ) ? vLightFront.a : vLightBack.a;
                #else
                    reflectedLight.directDiffuse = vLightFront.rgb;
                    blendOpacity = vLightFront.a;
                #endif
                reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();


                #include <aomap_fragment>
                // vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

                // normal blending
                // blend * opacity + base * (1.0 - opacity));

                // vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
                vec3 outgoingLight = reflectedLight.directDiffuse * blendOpacity + reflectedLight.indirectDiffuse * ( 1.0 - blendOpacity );
                



                #include <envmap_fragment>
                gl_FragColor = vec4( outgoingLight, diffuseColor.a );

                

                #include <tonemapping_fragment>
                #include <encodings_fragment>
                #include <fog_fragment>
                #include <premultiplied_alpha_fragment>
                #include <dithering_fragment>

            }        
        `
    })
}