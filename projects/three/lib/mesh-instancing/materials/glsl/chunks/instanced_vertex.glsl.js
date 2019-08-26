export default `
  // transformed *= scale;
  // transformed += translate;
  transformed = ( vec4( transformed.xyz, 1.0 ) * instanceMatrixWorld ).xyz;
  // transformed = ( instanceMatrixWorld * vec4( transformed, 1.0 ) ).xyz;
  
`;