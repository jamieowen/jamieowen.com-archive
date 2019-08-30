export default {

  instanced_pars_vertex: `
    attribute vec4 matrixWorld0;
    attribute vec4 matrixWorld1;
    attribute vec4 matrixWorld2;
    attribute vec4 matrixWorld3;

    attribute vec3 a_diffuse;
    attribute float a_opacity;

    varying vec3 diffuse; // all but normal material?
    varying float opacity;    

    #ifdef INSTANCED_LAMBERT
      attribute vec3 a_emissive;
      varying vec3 emissive;
    #endif

    #ifdef INSTANCED_PHONG
      // + lambert
      attribute vec3 a_specular;
      attribute float a_shininess;
      varying vec3 specular;
      varying float shininess;
    #endif

    #ifdef INSTANCED_PHONG
      // + lambert
      attribute vec3 a_specular;
      attribute float a_shininess;
      varying vec3 specular;
      varying float shininess;
    #endif    

    #ifdef INSTANCED_STANDARD
      uniform float roughness;
      uniform float metalness;
      #ifndef STANDARD
        uniform float clearCoat;
        uniform float clearCoatRoughness;
      #endif    
    #endif
  `,

  instanced_begin_vertex: `

  `,

  instanced_normal_vertex: `
  
  `,

  instanced_transform_vertex:`

  `,

  instanced_varyings_vertex: `

  `,

  instanced_pars_fragment: `

  `
}