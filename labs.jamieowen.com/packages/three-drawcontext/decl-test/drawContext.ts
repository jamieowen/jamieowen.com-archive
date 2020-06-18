
export type DrawContext = {
  
}

let current:DrawContext;

export function getDrawContext(){

  if( current ){
    return current;
  }

  current = {
  }

  return current;

}

export function renderContext(f:()=>{}){


}


renderContext(()=>{

  layer('background')
  sphere();
  layer('foreground')
  sphere();  

  
})