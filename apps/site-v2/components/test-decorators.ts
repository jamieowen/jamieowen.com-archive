const dec = (): any => {
  return () => {};
};

export class MyObj {
  constructor() {}

  @dec()
  fun() {}
}
