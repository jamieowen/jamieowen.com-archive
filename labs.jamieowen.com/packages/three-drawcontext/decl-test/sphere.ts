import * as tx from '@thi.ng/transducers';
import { getDrawContext,DrawContext } from './drawContext';

export function sphere(){

  const ctx:DrawContext = getDrawContext();

  ctx.push( 
    tx.comp(
      tx.map(()=>{
        
      })
    )
  )

}