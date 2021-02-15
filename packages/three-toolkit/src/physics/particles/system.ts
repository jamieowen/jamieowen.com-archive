import { ISubscriber, Subscription } from "@thi.ng/rstream";
import { DEFAULT_RAF_STREAM, RafStream } from "../../motion";
import { EmitterEvent, EmitterStream, IEmitter } from "./types";

export class ParticleSystem {
  emitters: Map<IEmitter, Subscription<EmitterEvent, EmitterEvent>> = new Map();
  state: Map<string, any> = new Map();

  constructor(rafStream: RafStream = DEFAULT_RAF_STREAM()) {
    rafStream.subscribe(this.raf);
  }

  add(emitter: IEmitter) {
    if (!this.emitters.has(emitter)) {
      const sub = emitter.stream.subscribe(this.emit);
      this.emitters.set(emitter, sub);
    }
  }

  remove(emitter: IEmitter) {
    if (this.emitters.has(emitter)) {
      const sub = this.emitters.get(emitter);
      emitter.stream.unsubscribe(sub);
      this.emitters.delete(emitter);
    }
  }

  raf: ISubscriber<number> = {
    next: (time) => {},
  };

  emit: ISubscriber<EmitterEvent> = {
    next: (ev) => {
      console.log("EMIT", ev.type);
    },
  };
}
