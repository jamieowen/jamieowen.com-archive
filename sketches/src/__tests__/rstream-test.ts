import {
  stream,
  Stream,
  State,
  CloseMode,
  sync,
  reactive,
  fromRAF,
  sidechainPartition,
  trace,
  subscription,
  debounce,
} from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";

const eventObject = () => ({
  type: <"add" | "remove" | "update">"add",
  payload: <any>null,
});

type Event = ReturnType<typeof eventObject>;

// TESTING ADD / REMOVE - DOWNCAST / UPCAST...??

// This is for the idea of taking an array of transform objects ( somehow )
// and applying the first add() action, then waiting for update() actions to continue until
// the remove action/event is dispatched nad the transform is removed.

// There might be some rules needed for transform objects like :
// + swapping a transform upstream to an upstream positino elesewhere. ( ADD will have already been fired. )
// e.gs...
// source( [transform, transform], [transform] )

// Are we making an assumption about the need for transform arrays?
// + Or we just need a way of grouping / adding to a stream ( a subscribable array/group )
// + And an 'event-wrapper' to attach additional info, and gives option to 'downcast'/'upcast' to other types in the pipeline.
//
// there needs to be a way of taking a group of transforms/or points, attaching a 'filter group'
// to branch off with another stream selecting bits needed to:
// + seperate a component, ( like plot a line between every N object, etc )
// + may be need a physics-object - which has additional velocity components.
// + this would then lead to 'entity objects'
// + rather than augmenting objects they are defined excplcity upstream.

// An ADD event may not be needed, as using a WeakMap an objects unique coul dbe determined.
// However, that might be not explicit enough. and would require using WeakMaps as an extra complexity.
// A REMOVE event would be needed however.

// const group = transformGroup( [items] )
// group.transform(
//  map(op())
//  map(op())
//)
// group.start() ?

// OUTCOMES OF THIS RANDOM SESSION....
// + Probably...
// + Create new Particl/Physics types that are created upstream initially.
// + i.e. Do not augment midstream via transform. ( as Accumuate is doing )
// + any augmentation should probably happen at 'splits'/branches' to prepare events for next stage in pipeline

const jestSubs = () => {
  const totalSubs: ReturnType<typeof jest.fn>[] = [];
  const sub = () => {
    const next = jest.fn();
    totalSubs.push(next);
    return {
      next,
    };
  };
  return { totalSubs, sub };
};

test("Events start stop", () => {
  const evStream = stream((s) => {
    console.log("OPENED");
    s.next({ type: "add" });
    return () => {
      s.next({ type: "remove" });
    };
  });

  evStream.subscribe(sidechainPartition(fromRAF())).subscribe(trace("Emi"));
  evStream.unsubscribe();
});

/**
 * Testing how streams open and close.
 */
test("Test open/close state on streams", () => {
  // ** Test Stream Behaviour **
  // Streams start in the IDLE STATE.
  // The state determines if subscriptions exist or not.
  const s1 = stream({
    closeOut: CloseMode.FIRST,
  });
  expect(s1.getState()).toEqual(State.IDLE);
  // If a value emits, nothing changes, just the buffer is filled with the next value until a sub connects.
  s1.next("hello");
  expect(s1.getState()).toEqual(State.IDLE);

  // Subscribing will now emit the value immediately.
  const callback = jest.fn();
  const sub = s1.subscribe({
    next: callback,
  });
  expect(callback.mock.calls).toHaveLength(1);
  expect(callback.mock.calls[0][0]).toEqual("hello");

  // And the stream is still in the active state.
  expect(s1.getState()).toEqual(State.ACTIVE);

  // ** Check subscrition state before unsubscribing **
  expect(sub.getState()).toEqual(State.IDLE);
  s1.unsubscribe(sub);

  // Stream will now be closed
  expect(s1.getState()).toEqual(State.DONE);

  // Subscriptions are left UNTOUCHED by the parent stream.
  // This is when unsubscribing...
  expect(sub.getState()).toEqual(State.IDLE);
});

type SrcMap = Record<string, Stream<number>>;

test("test sync stream, undefined error issue", () => {
  const src = new Array(5).fill(0).reduce<SrcMap>((map, val, i) => {
    map[i + 1] = reactive(i + 1);
    return map;
  }, {});

  const synced = sync({
    src: src,
  });

  for (let key in src) {
    const inp = src[key];
    const curr = inp.deref();
    inp.next(curr + 1);
    // src[key].
  }
});

jest.useRealTimers();

test("Test stream connectivity", () => {
  const str = stream({});
  str.subscribe(trace("1"));
  str.subscribe(trace("2"));
  str.subscribe(trace("3"));
  str
    .transform(map(() => console.log("1")))
    .transform(map(() => console.log("2")))
    .transform(map(() => console.log("3")));
  // str.subscribe(debounce(30)).subscribe(trace("BOUNCE"));
  str.next(0);

  const str2 = stream({});
  str2.subscribe(trace("1")).subscribe(trace("2")).subscribe(trace("3"));
  str2.next(5);
});
