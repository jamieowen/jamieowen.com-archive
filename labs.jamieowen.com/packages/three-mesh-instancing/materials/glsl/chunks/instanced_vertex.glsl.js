export default {

  instanced_pars_vertex: `
    attribute vec4 matrixWorld0;
    attribute vec4 matrixWorld1;
    attribute vec4 matrixWorld2;
    attribute vec4 matrixWorld3;

    #if defined(BASIC) || defined(LAMBERT) || defined(PHONG) || defined(PHYSICAL)
      attribute vec3 a_diffuse;
      varying vec3 diffuse;
    #endif    

    #if defined(LAMBERT) || defined(PHONG) || defined(PHYSICAL)
      attribute vec3 a_emissive;
      varying vec3 emissive;
    #endif

    #ifdef PHONG
      attribute vec3 a_specular;
      attribute float a_shininess;
      varying vec3 specular;
      varying float shininess;
    #endif  

    #ifdef PHYSICAL
      attribute float a_roughness;
      attribute float a_metalness;
      varying float roughness;
      varying float metalness;
      
      #ifndef STANDARD
        attribute float a_clearCoat;
        attribute float a_clearCoatRoughness;
        varying float clearCoat;
        varying float clearCoatRoughness;
      #endif

    #endif   

    // attribute vec3 translate;
    // attribute vec3 scale;
  `,

  instanced_begin_vertex: `

    #if defined(BASIC) || defined(LAMBERT) || defined(PHONG) || defined(PHYSICAL)
      diffuse = a_diffuse;
    #endif

    #if defined(LAMBERT) || defined(PHONG) || defined(PHYSICAL)
      emissive = a_emissive;
    #endif

    #ifdef PHONG
      specular = a_specular;
      shininess = a_shininess;
    #endif  

    #ifdef PHYSICAL
      roughness = a_roughness;
      metalness = a_metalness;
      
      #ifndef STANDARD
        clearCoat = a_clearCoat;
        clearCoatRoughness = a_clearCoatRoughness;
      #endif
      
    #endif      

    mat4 instanceMatrixWorld = mat4( matrixWorld0,matrixWorld1,matrixWorld2,matrixWorld3 );
  `,

  instanced_normal_vertex: `
    objectNormal.xyz = ( vec4( objectNormal.xyz, 0.0 ) * instanceMatrixWorld ).xyz;
  `,

  instanced_transform_vertex: `
    // transformed *= scale;
    // transformed += translate;
    transformed = ( vec4( transformed.xyz, 1.0 ) * instanceMatrixWorld ).xyz;  
    
  `

}