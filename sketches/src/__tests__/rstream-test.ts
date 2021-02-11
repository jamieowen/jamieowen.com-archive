import { stream, State } from "@thi.ng/rstream";
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

test("event type clsoing/opening", () => {
  // Create stream and emit initial 'add'
  const str = stream<Event>((s) => {
    const ev = eventObject();
    ev.type = "add";
    s.next(ev);
    return () => {
      console.log("close");
    };
  }, {});

  // const handler = jest.fn();
  // using stream() and not reactive()

  // NO event is emitted until first subscription is attached.
  expect(str.deref()).toBeUndefined();
  console.log(str.deref());

  str.subscribe({
    next: (ev) => {
      console.log(">>", ev);
    },
    done: () => {},
    error: () => {},
  });

  expect(str.deref()).toHaveProperty("type");

  // console.log(str.deref());
});
