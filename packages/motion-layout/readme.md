# Notes

How best to architect this?

One Observer context.
One Scheduler context.

## Description

Each ObserverContext has a single observer watching all nested observe components.
all observe items can respond to state changes issues from a scheduler.

The scheduler has a global state, whereas the observer context
can be nested so may have multiple contexts. This is so the root intersection element can be changed,
to enable rootMargin changes, scroll areas, etc.

Scheduling involves sorting elements using certain criteria, as scheduling gives the ability to animate.

### Sorting Criteria could include :

- Rect Size ( small, medium, etc )
- Intersection state
- Position ( left to right, top to bottom, radial )
- Tag or Grouping
- ObserverContext ( or perhaps we add 'tagChildren' option to a context to tag all children within that context )

### Overlap & Delay

Given item count could be high or overlapping of grouped elements would give greater control there
needs to be an api into setting item delays and delays between groups.

- Tags or Grouping
- needs thinking

### States

Each observe item can have states. They're are default states and custom states.
The default states are :

- Initialise
- Visible ( or In View )
- Hidden ( out of view )
- Intersection?? ( left,right,top,bottom, etc )

The above critera would not be applied at the Observe level. The key thing is
that a schedule config / state machine would allow for different props depending on state.
As an animate from one state to another

```js
// top level context setup.
<MLProvider>

  <ObserverContext>
    <Observe/>

    <Observe/>
    <Observe/>
  </ObserverContext>
</MLProvider>


// Indiudual items
<Observe>
</Observe>
```
