import { System, World, SystemStateComponent } from "ecsy";
import { Box2, Vector2 } from "three";

class DomScroll extends SystemStateComponent{

  target:HTMLElement;
  bounds:Box2 = new Box2();
  offset:Vector2 = new Vector2();
  viewport:Box2 = new Box2();

  constructor(target:HTMLElement){
    super();
    this.target = target;
  }

}

class DomResize extends SystemStateComponent{

  target:HTMLElement;
  bounds:Box2 = new Box2();

  constructor(target:HTMLElement){
    super();
    this.target = target;
  }  

}

// class DomPointerMove extends SystemStateComponent{

// }

// class DomPointerDown extends SystemStateComponent{

// }

type DomSystemParams = {
  domElement:HTMLElement,
  scrollElement:HTMLElement
}

class DomSystem extends System{

  static queries = {
    resize: { components: [ DomResize ] },
    scroll: { components: [ DomScroll ] },
  }

  resizeObserver:any;

  init(){
    

  }

  postinit(params:DomSystemParams){
    
    console.group( 'Reg Params', params );
    const world:World = this.world;
    const domContainer:HTMLElement = document.createElement('div');

    domContainer.style.width = '100%';
    domContainer.style.height = '100%';
    domContainer.style.backgroundColor = 'blue';
    domContainer.style.position = 'absolute';
  
    params.domElement.appendChild( domContainer )
  
    world.registerComponent(DomScroll);
    world.registerComponent(DomResize);
      
    world.createEntity() // State
      .addComponent( DomScroll,new DomScroll(params.scrollElement) )
      .addComponent( DomResize,new DomResize(domContainer) )


    // Rejig...

    const resize:DomResize = this.getState('resize',DomResize);
    const scroll:DomScroll = this.getState('scroll',DomScroll);
    console.log( 'Init DomSystem',resize);
    if( resize.target ){
      // @ts-ignore
      this.resizeObserver = new ResizeObserver((entries)=>{
        const e = entries[0];
        const resize:DomResize = this.getMutableState('resize',DomResize);
        resize.bounds.min.set(0,0);
        resize.bounds.max.set(e.contentRect.width,e.contentRect.height);
      });
      this.resizeObserver.observe(resize.target);
    }

    if( scroll.target ){

    }    


  }  

  execute( delta:number,time:number ){

  }

  getState(q:string,comp:object):any{
    return this.queries[q].results[0].getComponent(comp);
  }

  getMutableState(q:string,comp:object):any{
    return this.queries[q].results[0].getMutableComponent(comp);
  }  

}

export {
  DomSystem,
  DomScroll,
  DomResize
}