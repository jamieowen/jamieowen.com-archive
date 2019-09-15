
import dat from 'dat.gui';

import {
    Vector2,
    Vector3,
    Spherical,
    Color,
    Euler,    
    Box3
} from 'three';

const defaultObjectOpts = {

    props: [ 'visible', 'position' ], // Include other props
    args: null, // Can be an array to pass to each gui control
    type: null // Can be a type to force a specfic control

}

const defaultLightOpts = {
    
    props: [ 'visible', 'position', 'color', 'intensity' ],
    args: null,
    type: null,
    lightExtraProps: { // additional props added to the above.
        directional: [],
        point: [ 'decay', 'distance' ]
    }

}

const defaultMaterialOpts = {

    props: [ 'visible', 'transparent', 'opacity', 'color' ],
    args: null,
    type: null,
    materialExtraProps: {
        lambert: [ 'emissive', 'emissiveIntensity', 'reflectivity', 'refractionRatio' ],
        phong: [ 'emissive', 'emissiveIntensity', 'specular', 'shininess' ]
    }

}

export class GuiBuilder{

    constructor(){

        this.gui = new dat.GUI({
            width: 350,
            load: {},
            preset: ''
        });

        this.folders = {};
        
        this.bounds = new Box3();
        this.setWorldBounds( 100 );

    }

    /**
     * Influences the min and max limits on various property controls.
     * @param {*} bounds Scalar value to uniformly apply to min and max bounds.
     */
    setWorldBounds( bounds ){

        this.bounds.min.set( -bounds,-bounds,-bounds );
        this.bounds.max.set( bounds, bounds, bounds );

    }

    add( name, object, opts={} ){

        if( !opts.props ){
            throw new Error( 'Specify some props for raw object adding.' );
        }

        const folders = createFolders( this, name );   
        addPrimitives( folders[folders.length-1], object, opts.props );

    }

    addObject( name, object, opts ){

        const objects = object instanceof Array ? object : [ object ];
        opts = Object.assign( {}, defaultObjectOpts, opts );

        let props,args,typeString;
        const multiple = objects.length > 1;

        let folders = createFolders( this, name );    

        for( let i = 0; i<objects.length; i++ ){
            
            object = objects[i];         
            props = opts.props.slice(0);

            // if( multiple ){
            //     folders = createFolders( this, `${name}.light-${ i+1 }   (${typeString})`);
            // }

            addPrimitives( folders[folders.length-1], object, props );
            
        }

    }

    addLight( name, light, opts ){

        const lights = light instanceof Array ? light : [ light ];
        opts = Object.assign( {}, defaultLightOpts, opts );

        let props,args,typeString;
        const multiple = lights.length > 1;

        let folders = createFolders( this, name );        

        for( let i = 0; i<lights.length; i++ ){

            light = lights[i];

            if( light.isPointLight ){
                props = opts.props.slice(0).concat( opts.lightExtraProps['point' ] );
            }else{                
                props = opts.props.slice(0);
            }

            if( light.isPointLight ){
                typeString = 'point';
            }else
            if( light.isAmbientLight ){
                typeString = 'ambient';
            }else
            if( light.isDirectionalLight ){
                typeString = 'directional';
            }

            if( multiple ){
                folders = createFolders( this, `${name}.light-${ i+1 }   (${typeString})`);
            }

            addPrimitives( folders[folders.length-1], light, props );
            
        }

    }

    addMaterial( name, material, opts ){

        const materials = material instanceof Array ? material : [ material ];
        opts = Object.assign( {}, defaultMaterialOpts, opts );

        let props,args,typeString;
        const multiple = materials.length > 1;

        let folders = createFolders( this, name );    

        for( let i = 0; i<materials.length; i++ ){
            
            material = materials[i];         
            props = opts.props.slice(0);

            if( material.isMeshLambertMaterial ){
                props = opts.props.slice(0).concat( opts.materialExtraProps[ 'lambert' ] );
            }else 
            if( material.isMeshPhongMaterial ){
                props = opts.props.slice(0).concat( opts.materialExtraProps[ 'phong' ] );
            }else{                
                props = opts.props.slice(0);
            }

            // if( multiple ){
            //     folders = createFolders( this, `${name}.light-${ i+1 }   (${typeString})`);
            // }

            addPrimitives( folders[folders.length-1], material, props );
            
        }

    }


}

export default new GuiBuilder();


const createFolders = ( builder, path )=>{

    const folders = path.split( '.' );
    const mappedFolders = [];    

    let newPath = '';
    let folder;
    let parentFolder = builder.gui;

    for( let i = 0; i<folders.length; i++ ){

        newPath += folders[i];
        folder = builder.folders[ newPath ];

        if( !folder ){
            folder = parentFolder.addFolder( folders[i] );
            builder.folders[ newPath ] = folder;
        }

        if( i === 0 ){
            folder.open();
        }

        mappedFolders.push( folder );
        parentFolder = folder;

    }

    return mappedFolders;

}

const addPrimitives = ( gui, object, props, args )=>{

    let value,prop;
    let folder,controller;

    // Create wrapper to handle controller updates.
    const handle = function( object ){

        return function( controller, value, custom ){

            controller.onChange( (res)=>{
                
                if( custom ){
                    custom( value,res );
                }

                if( object.onGuiChange ){
                    object.onGuiChange();
                }

            })

        }

    }( object );

    for( let i = 0; i<props.length; i++ ){
        
        prop = props[i];
        value = object[ prop ];
        folder = gui;

        if( value instanceof Vector2 ){

            folder = gui.addFolder( prop );
            handle( folder.add( value, 'x' ), value );
            handle( folder.add( value, 'y' ), value );

        }else
        if( value instanceof Vector3 ){

            folder = gui.addFolder( prop );
            handle( folder.add( value, 'x' ), value );
            handle( folder.add( value, 'y' ), value );
            handle( folder.add( value, 'z' ), value );

        }else
        if( value instanceof Color ){

            let colorProxy = {};
            colorProxy[ prop ] = [ value.r * 255, value.g * 255, value.b * 255 ];
            
            handle( folder.addColor( colorProxy, prop ), value, (val,res)=>{
                val.setRGB( res[0]/255,res[1]/255,res[2]/255 );
            } );

        }else
        if( value instanceof Euler ){

            folder = gui.addFolder( prop );
            handle( folder.add( value, 'x' ), value );
            handle( folder.add( value, 'y' ), value );
            handle( folder.add( value, 'z' ), value );

        }else
        if( value instanceof Spherical ){

            folder = gui.addFolder( prop );
            handle( folder.add( value, 'radius', 0,1000, 0.01 ), value );
            handle( folder.add( value, 'phi', -Math.PI, Math.PI, 0.00001 ), value );
            handle( folder.add( value, 'theta', -Math.PI, Math.PI, 0.00001 ), value );

        }else{

            folder.add( object, prop );

        }

    }

}