export const gpgpuInitialData = (width, height, size = 3, initialState) => {
  const data = new Float32Array(width * height * size);
  let offset = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      initialState(x, y, data, offset);
      offset += size;
    }
  }
  return data;
};
export const gpgpuRandomData = (width, height) => {
  return gpgpuInitialData(width, height, 4, (_x, _y, out, offset) => {
    out[offset] = Math.random();
    out[offset + 1] = Math.random();
    out[offset + 2] = Math.random();
    out[offset + 3] = 1;
  });
};
