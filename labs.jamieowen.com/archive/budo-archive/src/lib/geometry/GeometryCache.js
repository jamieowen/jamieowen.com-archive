
/**
 * Cache for smaller geometry to prevent redefining simple primitives
 * with same parameters.
 */
const CACHE = [];

const create = ( GeometryClass, ...args )=>{

    const argId = args.join( '__' );    
    const geomIdx = CACHE.indexOf( GeometryClass );

    if( !geomIdx ){
        CACHE[geomIdx] = {};
    }

    if( CACHE[geomIdx][ argId ] ){
        return CACHE[geomIdx][ argId ];
    }else{

        const geom = new Function.prototype.bind.apply(GeometryClass, args);
        CACHE[ geomIdx ][ argId ] = geom;
        return geom;

    }

}

const dispose = ( GeometryClass, ...args )=>{


}

export default create;
