
export class ObjectPoolManager{

  pools:Map<Function,ObjectPool<any>> = new Map<Function,ObjectPool<any>>();

  getPool(type:Function):ObjectPool<any>{
    let pool = this.pools.get(type);
    if(!pool){
      pool = new ObjectPool<any>(type);
    }
    return pool;
  }

}

export class ObjectPool<T>{

  // new <T>() ??
  // https://blog.rsuter.com/how-to-instantiate-a-generic-type-in-typescript/
  // https://github.com/Microsoft/TypeScript/issues/2037
  public instances:Array<T> = [];
  public index:number = 0;

  public type:Function;

  constructor(type:Function){
    this.type = type;
  }

  public create():T{

    let item:T = this.instances[this.index];
    if( !item ){
      // @ts-ignore
      item = new this.type();
      this.instances.push(item);
    }
    this.index++;
    return item;

  }

  public reset(){
    this.index = 0;
  }

}
