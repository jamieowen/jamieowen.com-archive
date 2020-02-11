import { Engine, EngineParams } from "./Engine";
import { EngineEvent } from "./EngineEvent";

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

  public domContainer:HTMLElement;
  public domElement:HTMLElement;
  public scrollElement:HTMLElement;

  constructor(engine:Engine,params:EngineParams){

    this.engine = engine;

    this.domElement = params.domElement;
    this.domContainer = createContainer(this.domElement);
    this.domElement.appendChild(this.domContainer);
    this.scrollElement = params.scrollElement;    

    // @ts-ignore
    this.resizeObserver = new ResizeObserver((entries)=>{
      const e = entries[0];
      const ev = {
        type:EngineEvent.DOM_RESIZE,
        width:e.contentRect.width,
        height:e.contentRect.height
      }
      this.engine.dispatchEvent(ev);  
    });

  }

  public initialise(){

    this.resizeObserver.observe(this.domContainer);  

    if( this.scrollElement ){
      this.scrollElement.addEventListener('scroll',this.onScroll);
    }

  }

  private onScroll = (ev:Event)=>{


  }

}

export {
  DomManager
}