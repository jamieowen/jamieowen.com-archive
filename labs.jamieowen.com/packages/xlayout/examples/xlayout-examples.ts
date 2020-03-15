import * as gen from '../src/generators';
import * as ops from '../src/operators';


export const circleAndRect = (params:any)=>{

  const {
    width,height
  } = params;

  return gen.bounds(width,height,[
    gen.rect(width,height,[
      ops.position1(i=>[width/2,height/2]),
      ops.attribute1('fill',i=>'#333')
    ]),
    gen.circle(width*0.314,[
      ops.attribute1('fill',i=>'#f0f'),
      ops.position1(i=>[width/2,height/2]),
    ])
  ]);

}

export const randomPoints = (params:any)=>{

  const {
    width,height
  } = params;

  const uniformRandom2 = (s=1,min=1) => (i)=>{
    const r = (Math.random()*s)+min;
    return [r,r];
  }

  const colors = [
    '#f10','#f0f'
  ]
  const cycle = (source) => (i)=>{
    return source[i % source.length];
  }

  return gen.bounds(width,height,[
    gen.rect(width,height,[
      ops.position1(i=>[width/2,height/2]),
      ops.attribute1('fill',i=>'#333')
    ]),    
    gen.points(50,[
      gen.branch1(i=>gen.circle(4,[
        ops.attribute1('fill',j=>cycle(colors)(i) ),
        ops.position1(i=>[Math.random()*width,Math.random()*height]),
        ops.scale1(uniformRandom2(4,1))
      ]))
    ])
  ])

}