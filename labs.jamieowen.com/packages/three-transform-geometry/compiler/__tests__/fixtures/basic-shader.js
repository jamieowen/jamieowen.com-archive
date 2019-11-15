
export default `

  uniform float time;

  attribute vec3 position;
  varying vec3 position_out;

  void main(){

    vec3 pos = position;
    pos*=time;
    position_out = pos;

  }

`;
