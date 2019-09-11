export default {

  instanced_pars_fragment: `    

    uniform float opacity;
    #if defined(BASIC) || defined(LAMBERT) || defined(PHONG) || defined(PHYSICAL)
      varying vec3 diffuse;
    #endif
  
    #if defined(LAMBERT) || defined(PHONG) || defined(PHYSICAL)
      varying vec3 emissive;
    #endif    

    #ifdef PHONG
      varying vec3 specular;
      varying float shininess;
    #endif      

    #ifdef PHYSICAL
      varying float roughness;
      varying float metalness;
      
      #ifndef STANDARD
        varying float clearCoat;
        varying float clearCoatRoughness;
      #endif
      
    #endif      
  `,

  instanced_varyings_fragment: `

  `

}