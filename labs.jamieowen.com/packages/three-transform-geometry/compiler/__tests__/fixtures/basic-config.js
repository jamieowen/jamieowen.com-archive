
const count = 3;
const startValue = 1;

const attributes = {
  position: {
    size: 3,
    type: 'vec3',
    array: new Float32Array(3*count).fill(startValue),
    feedback: 'position_out'
  }
}

const uniforms = {
  time:{
    value: 0,
    type: 'float'
  }
}

export {
  attributes,
  uniforms
}