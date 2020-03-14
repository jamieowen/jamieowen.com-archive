import * as tx from '@thi.ng/transducers';
import { XLayout } from '../src';
import * as gen from '../src/generators';
import * as ops from '../src/operators';
import { Node } from '../src/nodes';
import { renderSvg as renderSvg2 } from '../src/renderers/renderSvg';

const pos = (pos)=> tx.map((n:Node)=>(n.translate = pos,n) );

const layout:XLayout = new XLayout((params:any)=>{

  const { 
    width=100,
    height=100,
    scl=40
  } = params;

  return gen.bounds(width,height,[
    
    gen.rect(width,height,[
      ops.position(i=>[width/2,height/2]),
      ops.attribute('fill',i=>'#333'),
    ]),
    gen.group([
      ops.position(i=>[width/2,height/2]),
      gen.rect(width*0.5,height*0.5,[
        ops.attribute('fill',i=>'#e0e'),
      ]),
      gen.circle(width*0.3,[
        ops.attribute('fill',i=>'#ff0'),
      ]),
    ]),
    gen.group([
      gen.grid(4,4,[
        tx.map((n:Node)=>(n.translate[0]*=scl,n.translate[1]*=scl,n)),
        gen.rect(10,10),
        gen.rect(4,4,[
          ops.attribute('fill',i=>'#ff0'),
        ])
      ])
    ])
  ]);

})

for( let i = 0; i<4; i++ ){

  const xGraphNew = layout.generate({
    width:230 + Math.round( Math.random() * 40 ),
    height:300
  });
  xGraphNew.update();
  
  const ele = <SVGElement>renderSvg2(xGraphNew);
  document.body.appendChild(ele);
  ele.style.margin = '1px';

}
