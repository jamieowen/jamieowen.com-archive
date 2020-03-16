import { DeferredNodeDecl,breadthFirstIterator } from '../decl';

export const branch = (childRfn) => new DeferredNodeDecl(childRfn)
export const root = (children) => branch(i=>children);
export const group = ( childRfn ) => new DeferredNodeDecl(childRfn,Node);

