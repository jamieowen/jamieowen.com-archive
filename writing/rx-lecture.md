
# Reactive Programming Lecture

https://www.youtube.com/watch?v=KOjC3RhwKU4


## Data Streams
Reactive programming being a method/paradigm of programming of manipulating data streams.

A stream that is 'emitting' events is the 'subject',

A number of functions that manipulate the data ( filter, map, etc )
The resulting stream is the observer. Based on the GoF Observer pattern.

More functions ( filter, map, count, max, min, delay )

## What creates the 'subject' data stream?

In RXJs these streams are called 'Observables'
( Observable.create(), fromIterable(), etc ) 

## Operators - filtering functions

Some examples of operators: 
- Transforming ( buffer, scan )
- Filtering ( debounce, distinct, first, last, take, min, max )
- Combining ( join, merge, zip )
- Math ( average, concat, max )