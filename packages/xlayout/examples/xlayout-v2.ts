import { layout2d,grid } from '../src/v2/xlayout-v2';

const drawElement = (x=0,y=0,w=10,h=10)=>{
  const ele = document.createElement('div');
  ele.style.width = `${w}px`;
  ele.style.height = `${h}px`;
  ele.style.backgroundColor = '#333';
  ele.style.position = 'absolute';
  ele.style.transform = `translate(${x}px,${y}px)`;
  document.body.appendChild(ele);
  return ele;
}

layout2d(
  // TODO.. ( 5th Apr 2020 )
  // rename grid to some order based iterator ( i.e. leftToRight  )
  // the goal is to be able to interchange the orders using thing/iterators.
  // also - we could move the Cursor creation stuff to each iterator function.
  grid(9), 
  // The next step in a layout is to expand to an area ( or the actual layout )
  // i.e. grid(w:100,h:100,) or bounds(),
  // then...
  // subdivive() with mapcat...
  // herringbone()/layouts() with matrixRepeater ( a subdiv ) and mapcat.
).render(cursor=>{
  console.log( 'Render ', cursor.x, cursor.y );
  const s = 12;
  drawElement(cursor.x*s,cursor.y*s);
})