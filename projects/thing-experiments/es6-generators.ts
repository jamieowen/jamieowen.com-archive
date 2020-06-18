

const data = 'Another compelling story in a short number of robust and explanatory words'.split(' ');
const createObject = ()=>data.reduce((acc:any,s,i)=>(acc[i]=s,acc),{});
const dataObj = createObject();

console.log( 'Data', dataObj );

// Typical iterator syntax
dataObj[Symbol.iterator] = function(){
  
  const keys = Object.keys(this);
  let curr = 0;

  return {
    next:()=>{
      return {
        value:this[keys[curr++]],
        done: curr > keys.length
      }
    }
  }

}

const clone = Object.assign( {},dataObj );

// Generator syntax for iterators.
// No state involved for the creation
// yield until done or indefinitely
function* makeIterator(x:number){
  let i;
  for( i = 0; i<x; i++ ){
    yield i;
  }
}

// Generators essentially do the next() object bit for you - with no state.
// and perhaps assume usage of yield
const ite:Iterator<object> = makeIterator(2);
console.log( ite.next() );
console.log( ite.next() );
console.log( ite.next() ); // done=true

const forOfLoop = (iterable)=>{
  const res = [];
  for( let value of iterable ){
    res.push(value);
  }
  return res;
}

console.log( 'iter 1: ', forOfLoop( makeIterator(2) ) );
console.log( 'iter 2: ', forOfLoop( makeIterator(13) ) );

// This example show us generator(iterator) is iterable object,
// which has the @@iterator method return the it (itself),
// and consequently, the it object can iterate only _once_.

const myObj = createObject();

// Assign bogus iterator to obj
myObj[Symbol.iterator] = makeIterator // would work but no arg given
myObj[Symbol.iterator] = makeIterator(5) // does not work as called on OF usage 
myObj[Symbol.iterator] = ()=>makeIterator(10)

console.log( 'Bogus obj iterator', forOfLoop(myObj) );

// Define shorthand
const iterableObj = createObject();

iterableObj[Symbol.iterator] = function*(){
  for( let key in this ){
    yield this[key];
  }
  yield* 'Chars'; // yield* is essential 'yield into an iterable'
  yield 'Ending';
  yield* ['a','b','c'];
}

console.log( 'Yield:', forOfLoop(iterableObj) );


// Yield to accept next(args)..
// Not sure about this - would miss a next() for this?? ( seems so but a bit weird )
const iterAccept = createObject();
iterAccept[Symbol.iterator] = function*(){
  let a = '';
  for( let key in this ){    
    let append = yield this[key] + a
    console.log( 'STEP');
    if( append ){
      a = ' --< XX'
    }else{
      a = '';
    }
  }
}

const it = iterAccept[Symbol.iterator]()
console.log( it.next(true) ); 
console.log( it.next(false) );
console.log( it.next(true) );



