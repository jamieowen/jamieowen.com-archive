import { Engine, EngineParams } from "./Engine";
import { EngineEvent } from "./EngineEvent";
import { Box2 } from "three";

const createContainer = (parent:HTMLElement):HTMLElement => {

  const domContainer:HTMLElement = document.createElement('div');  

  domContainer.id = 'renderer-dom-container';
  domContainer.style.width = '100%';
  domContainer.style.height = '100%';
  domContainer.style.pointerEvents = 'all';
  // domContainer.style.backgroundColor = 'crimsom';

  const pPosition = parent.style.position;
  if( pPosition === 'absolute' ){
    domContainer.style.position = 'relative';  
  }else{
    domContainer.style.position = 'absolute';
  }

  return domContainer;

}

class DomManager{

  private engine:Engine;
  // @ts-ignore // not supported yet??
  private resizeObserver:ResizeObserver;

  public domSize:Box2 = new Box2(); // the size of the dom/root container
  public domContainer:HTMLElement; // The internally created container 
  public domElement:HTMLElement; // The supplied dom Element ( may be rename root? )
  public scrollElement:HTMLElement; // the scroll element to listen to scroll events ( optional )

  public scrollBounds:Box2 = new Box2(); // Current scroll position
  public scrollPageBounds:Box2 = new Box2(); // Total inner scroll area
  public scrollWorldScaling:number = 0.04;
  

  constructor(engine:Engine,params:EngineParams){

    this.engine = engine;

    this.domElement = params.domElement;
    this.domContainer = createContainer(this.domElement);
    this.domElement.appendChild(this.domContainer);
    this.scrollElement = params.scrollElement;

    // @ts-ignore
    this.resizeObserver = new ResizeObserver((entries)=>{
      const e = entries[0];
      this.domSize.min.set(0,0);
      this.domSize.max.set(e.contentRect.width,e.contentRect.height);
      const ev = {
        type:EngineEvent.DOM_RESIZE,
        width:this.domSize.max.x,
        height:this.domSize.max.y
      }
      this.engine.dispatchEvent(ev);

      if( this.scrollElement ){
        this.onScroll(null);
      }
    });

  }

  public initialise(){

    this.resizeObserver.observe(this.domContainer);  

    if( this.scrollElement ){
      this.scrollElement.addEventListener('scroll',this.onScroll);
    }

  }

  private onScroll = (event:Event)=>{
    
    this.scrollPageBounds.min.set(0,0);
    this.scrollPageBounds.max.set(
      this.scrollElement.scrollWidth,
      this.scrollElement.scrollHeight
    );

    this.scrollBounds.min.set( 
      this.scrollElement.scrollLeft,
      this.scrollElement.scrollTop
    )
    this.scrollBounds.max.set( 
      this.scrollElement.scrollLeft + this.domSize.max.x,
      this.scrollElement.scrollTop + this.domSize.max.y      
    )

    this.scrollBounds.min.multiplyScalar(this.scrollWorldScaling);
    this.scrollBounds.max.multiplyScalar(this.scrollWorldScaling);

    this.scrollPageBounds.min.multiplyScalar(this.scrollWorldScaling);
    this.scrollPageBounds.max.multiplyScalar(this.scrollWorldScaling);      

    const ev = {
      type:EngineEvent.DOM_SCROLL,  
      scrollBounds:this.scrollBounds,
      scrollPageBounds:this.scrollPageBounds
    }

    this.engine.dispatchEvent(ev);    

  }

}

export {
  DomManager
}