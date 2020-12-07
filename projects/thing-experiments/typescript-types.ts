

interface MyArr extends Array<any>{
  [0]:string,
  [1]:number,
  [2]:()=>string,
}

const arr:MyArr = ['key',0,()=>'aadsasd'];

interface Ball{
  bounce:()=>string,
  deflate?:()=>boolean
}

const ball:Ball = {
  bounce:()=>{
    return 'ajsd'
  }
}

type FuncType = ()=>string;
type StrType = string;
type NumType = number;
type FunType = ()=>string;

type IFaceRef = MyArr;

type MyT = string | { name: string, value?:number };

type MyType = {
  prop?:string
}

const value:MyT = { name:'string' }

class M extends Array<any> implements MyArr{
  public [0] = '';
  public [1] = 1;
  public [2] = ()=>'string';
}

console.log( new M() );
// Interfaces are exclusively defining an **object** interface!
// i.e. the shape..
interface MyInterface{
  obj:string,
  init:()=>string
}

interface Arr extends Array<any>{
  [0]:string
}

const f:FuncType = function(){
  return 'heelo';
};

const myFun:FunType = ()=>'string';



type Some<A,B> = (x:A)=>B;


const v:Some<string,number> = (s)=>{
  return 0
} 

const vv:Some<boolean,string> = (s)=>{
  return 'test';
}


v('ads');
vv(false);



