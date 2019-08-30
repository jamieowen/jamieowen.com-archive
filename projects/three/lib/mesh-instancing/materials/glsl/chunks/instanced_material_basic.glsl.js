export default {
  instanced_pars_vertex: `
    attribute vec3 a_diffuse;
    attribute float a_opacity;
    varying vec3 diffuse; 
    varying float opacity;    
  `,
  instanced_varyings_vertex:`
    diffuse = a_diffuse;
    opacity = a_opacity;
  `,
  instanced_pars_fragment:`
    varying vec3 diffuse; 
    varying float opacity;    
  `
}

