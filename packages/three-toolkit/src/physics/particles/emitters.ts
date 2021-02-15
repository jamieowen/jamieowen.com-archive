import { Stream } from "@thi.ng/rstream";
import { EmitterDef, EmitterEvent, EmitterStream, IEmitter } from "./types";

export class Emitter implements IEmitter {
  stream: EmitterStream;

  constructor(public definition: EmitterDef) {
    this.stream = new Stream<EmitterEvent>();
  }
  emit() {
    this.stream.next({
      type: "emit",
      emitter: this,
    });
  }
}

export const emitter = (def: EmitterDef) => {
  return new Emitter(def);
};
