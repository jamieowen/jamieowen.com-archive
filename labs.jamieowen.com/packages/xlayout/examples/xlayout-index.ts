import { XLayout } from '../src/XLayout';
import * as ex from './xlayout-examples';
import { renderSvg as renderSvg2 } from '../src/renderers/renderSvg';

const examples = [
  ex.circleAndRect,
  ex.randomPoints,
]

const layouts = examples.map((ex)=>{
  return new XLayout(ex);
})

const render = (layout)=>{

  const then = performance.now();
  const graph = layout.generate2({
    width:230,
    height:300
  });
  
  const root = graph.currentNode.children[0];
  root.update();

  const now = performance.now();
  console.log( 'Graph Time :',((now-then)/1000));
  
  const ele = <SVGElement>renderSvg2(root);
  document.body.appendChild(ele);
  ele.style.margin = '1px';

  const nowSvg = performance.now();
  console.log( 'SVG Time :',((nowSvg-now)/1000));

}

layouts.forEach(render);

