export const gpgpuInitialData = (
  width: number,
  height: number,
  size: number = 3,
  initialState: (
    x: number,
    y: number,
    out: Float32Array,
    offset: number
  ) => void
) => {
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

export const gpgpuRandomData = (width: number, height: number) => {
  return gpgpuInitialData(width, height, 3, (_x, _y, out, offset) => {
    out[offset] = Math.random();
    out[offset + 1] = Math.random();
    out[offset + 2] = Math.random();
  });
};
