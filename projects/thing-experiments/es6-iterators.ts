

const dataArray = 'Do your best in life, no one will do it for you'.split(' ');
const dataObject = dataArray.reduce((acc:any,x,i)=>(acc[i]=x,acc),{});

console.log( 'Data Array:', dataArray );
console.log( 'Data Object:', dataObject );

// Javascript Refresh...

// Articles
// https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e

// FOR LOOPS..

// FOR IN --- iterates by key
const inLoop = (data:any)=>{
  const res = [];
  for( let key in data ){
    res.push(key);
  }
  return res;
}

// FOR OF --- iterates by value
const ofLoop = (data:any)=>{
  const res = [];
  for( let value of data ){
    res.push(value);
  }
  return res;
}

// ARRAYS ARE ITERABLE - OBJECTS ARE NOT...

console.log( 'inLoop (Array)', inLoop(dataArray) );
console.log( 'ofLoop (ArraY)', ofLoop(dataArray) );

console.log( 'inLoop (Object)', inLoop(dataObject) );
try{
  console.log( 'inLoop (Object)', ofLoop(dataObject) );
}catch(e){
  console.warn( 'inLoop (Object) FAILS - not iterable - which makes sense?' );
}


// ITERATORS... ( AND SYMBOLS - Symbols are unique ids essentially )

const manualIterator = (data:any)=>{

  const iterator = dataArray[Symbol.iterator]();  
  const res = [];
  let p;
  while( (p = iterator.next(),!p.done ) ){
    res.push(p.value);
  }
  return res;

}

console.log( 'manual iterator:', manualIterator(dataArray) );

// DEFINE AN ITERATOR

dataObject[Symbol.iterator] = function(){

  let idx = 0;
  const obj:any = this;
  const keys = Object.keys(obj);
  return {
    next:()=>{     
      const res = {
        value: obj[keys[idx]],
        done: idx >= keys.length
      }
      idx++;
      return res;
    }
  }
}

console.log( 'WE NOW HAVE ITERABLE OBJECTS :', ofLoop(dataObject) );