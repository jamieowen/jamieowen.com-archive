import * as tx from '@thi.ng/transducers';
import { XLayout } from '../src';
import * as gen from '../src/generators';
import * as ops from '../src/operators';
import { Node } from '../src/nodes';
import { renderSvg as renderSvg2 } from '../src/renderers/renderSvg';



    // gen.group([
    //   ops.centerToBounds(),
    //   gen.rect(w2*0.75,h2,[
    //     ops.rotate(i=>Math.PI*0.25),
    //     ops.attribute('fill',i=>'#e0e'),
    //   ]),
    //   gen.circle(width*0.3,[
    //     ops.attribute('fill',i=>'#ff0'),
    //     ops.attribute('style',i=>({['mix-blend-mode']:'exclusion'})),
    //   ]),
    // ]),



const layout:XLayout = new XLayout((params:any)=>{

  const { 
    width=100,
    height=100,
    scl=40
  } = params;

  const w2 = width*0.5;
  const h2 = height*0.5;


  const colors = [
    '#0ff',
    '#f2f',
    '#ff0',
    '#f0f',
  ]

  const doColorShift = (i:number) => colors[i%colors.length];

  const subDivOpts = [
    { w:4,h:12,}
  ]

  return gen.bounds(width,height,[

    // Background Rectangle

    gen.rect(width,height,[
      ops.centerToBounds(),
      ops.attribute('fill', doColorShift ),
    ]),
    
    // Center Grid With Rectangles & Circles
    gen.group([
      ops.centerToBounds(),
      gen.grid(5,5,[

        ops.positionScale(i=>[scl,scl]),

        gen.rect(10,10,[
          // ops.attribute('fill',doColorShift),
        ]),

        gen.circle(3,[
          ops.attribute('fill',i=>'#ff0'),
          ops.attribute('test',i=>{
            console.log( 'circ', i )
          }),          
        ])

      ])
    ]),


    ops.branch(i=>gen.rect2({w:100,h:100},[

    ])),
    /**
     * Problem at the moment, is the 'i' in  the 'iteration scope'
     * does not make logical / usable sense.
     */
    gen.subdivide(2,4,[
      ops.attribute('test',i=>{
        // console.log( 'iiii', i )
      }),
      ops.branch(i=>{
        console.log( 'subdiv branch',i);

      }),
      gen.rect(10,10,[
        ops.sizeToBounds(),
        ops.centerToBounds(),        
        ops.attribute('fill',i=>i%2 === 0 ? '#f33' : '#00f' ),
        ops.attribute('stroke',i=>'white'),
        ops.attribute('opacity',(i,v,n)=>{
          const ri = n.parent.parent.children.indexOf(n.parent);

          // console.log( 'II', i,  );
          return ( i * 0.2 ) + 0.2
        })
      ])
    ]),
    gen.circle(10,[
      ops.position(i=>[w2,h2]),
      ops.attribute('fill',i=>'#f0f'),
      // ops.attribute('opacity',i=>1 ),
      ops.attribute('test',(i,v,n)=>{
        // console.log('TEST', i );
        // console.log('TEST I', i, n.parent.children.indexOf(n), n.parent.children.length );
      }),
      ops.sizeToBounds(i=>0.7)
    ])       
  ]);

})

const count = 1;
for( let i = 0; i<count; i++ ){

  const s = 1 / ( count-i );

  const xGraphNew = layout.generate({
    width:230*s,
    height:300*s
  });
  xGraphNew.update();
  
  const ele = <SVGElement>renderSvg2(xGraphNew);
  document.body.appendChild(ele);
  ele.style.margin = '1px';

}
