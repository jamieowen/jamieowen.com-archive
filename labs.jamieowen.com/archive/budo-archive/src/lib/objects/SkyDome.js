// import seedrandom from 'seedrandom';

import {
    Object3D,
    Mesh,
    SphereBufferGeometry,
    PlaneBufferGeometry,
    CircleBufferGeometry,
    ShaderMaterial,
    MeshPhongMaterial, 
    ShaderLib,   
    ShaderChunk,
    Vector3,
    Spherical,
    Matrix4,
    Color,
    AmbientLight,
    PointLight,
    DirectionalLight,
    PointLightHelper,
    DirectionalLightHelper    
} from 'three';

const defaultOpts = {

    radius: 50,
    pointLights: 2,
    directionalLights: 1,
    addHelpers: true,
    ambientLights: 0,
    segW: 50,
    segH: 30,
    invertColors: true,
    groundSphere: true,
    autoPosition: true,
    autoColorize: true

}

export default class SkyDome extends Object3D{

    constructor( opts ){

        super();

        opts = Object.assign( {}, defaultOpts, opts );

        this.init( opts );

        this.lightProperties = new LightPropertiesManager( this, opts );

        this.radius = opts.radius;
        this.invertColors = opts.invertColors;
        this.groundSphere = opts.groundSphere;

    }

    init( opts ){

        this.dome = new Mesh( 
            createDomeGeometry( opts ),
            createDomeMaterial( opts )
        );        

        this.add( this.dome );

        this._geometries = createGroundGeometry( opts );
        this.ground = new Mesh( 
            this.dome.geometry,
            createDomeMaterial( opts )
        );
        this.add( this.ground );

        const lightObjects = createLights( this, opts );
        this.lights = lightObjects.lights;
        this.helpers = lightObjects.helpers;

    }

    updateMatrixWorld( force ){

        this.lightProperties.update( this.lights );
        super.updateMatrixWorld( force );

    }

    render( renderer ){

        
    }

    get radius(){

        return this._radius;

    }

    set radius( value ){

        if( value <= 0.0 ){
            return;
        }

        this._radius = value;
        this.dome.scale.set( 1,1,1 ).multiplyScalar( this._radius );
        this.ground.scale.set( 1,1,1 ).multiplyScalar( this._radius * 1.01 );
        this.lightProperties.needsUpdate = true;

    }

    get invertColors(){
        
        return this._invertColors;

    }

    set invertColors( value ){

        this._invertColors = value;
        // this.dome.material.uniforms.invertColors.value = value ? 1 : 0;

    }

    get groundSphere(){

        return this._groundSphere;

    }

    set groundSphere( value ){

        if( value ){
            this.ground.geometry = this._geometries.groundSphere;
        }else{
            this.ground.geometry = this._geometries.groundPlane;
        }

        this._groundSphere = value;

    }

    get upScale(){
        
    }

}


const flipNormals = ( geometry )=>{

    const normals = geometry.attributes[ 'normal' ].array;
    
    for( let i = 0; i<normals.length; i+=3 ){
        normals[ i ] = -normals[ i ];
        normals[ i+1 ] = -normals[ i+1 ];
        normals[ i+2 ] = -normals[ i+2 ];
    }

}

const flipWindingOrder = ( geometry )=>{

    const index = geometry.index.array;

    let a1,a2,a3;
    for( let i = 0; i<index.length; i+=3 ){

        a1 = index[i];
        a2 = index[i+1];
        a3 = index[i+2];

        index[i] = a3;
        index[i+1] = a2;
        index[i+2] = a1;

    }

}

const createGroundGeometry = ( opts )=>{

    const bake = new Matrix4();
    
    const groundSphere = new SphereBufferGeometry( 
        1,opts.segW,opts.segH,
        0,Math.PI*2, 0,Math.PI*0.5         
    );

    // Squash the geometry.
    const positions = groundSphere.attributes['position'].array;
    for( let i = 1; i<positions.length; i+=3 ){
        positions[ i ] = 0;
    }   

    const groundPlane = new CircleBufferGeometry( 1,opts.segW );
    
    bake.identity();
    bake.makeRotationX( Math.PI * -0.5 );
    groundPlane.applyMatrix( bake );

    return { groundSphere, groundPlane };

}

const createDomeGeometry = ( opts )=>{

    const domeGeometry = new SphereBufferGeometry( 
        1,opts.segW,opts.segH,
        0,Math.PI*2, 0,Math.PI*0.5         
    );

    flipWindingOrder( domeGeometry );

    return domeGeometry;

}

const createDomeMaterial = ( opts )=>{
    
    // console.log( ShaderLib.phong );
    // console.log( ShaderChunk );

    return new MeshPhongMaterial({
        color: 0xffffff
    });


    return new ShaderMaterial({

        // lights: true,

        uniforms: {
            invertColors: { value: 1 }
        },

        vertexShader: `

            void main(){

                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

            }

        `,

        fragmentShader: `

            void main(){

                gl_FragColor = vec4( 1.0 );

            }

        `
    })

}

const createLights = ( parent, opts )=>{
    
    const lights = [];
    const helpers = opts.addHelpers ? [] : null;
    let light,helper;

    for( let i = 0; i < opts.pointLights; i++ ){

        light = new PointLight( 0xffffff );        
        lights.push( light );
        parent.add( light );

        if( opts.addHelpers ){
            helper = new PointLightHelper( light, 1 );
            helpers.push( helper );
            parent.add( helper );
        }

    }

    for( let i = 0; i < opts.directionalLights; i++ ){

        light = new DirectionalLight();        
        lights.push( light );
        parent.add( light );

        if( opts.addHelpers ){
            helper = new DirectionalLightHelper( light );
            helpers.push( helper );
            parent.add( helper );
        }

    }

    for( let i = 0; i < opts.ambientLights; i++ ){
        
        lights.push( new AmbientLight() );

    }

    return { lights, helpers }
    
}

const lightProperties = {

    addDomeRadius: true,
    autoPosition: true,
    autoColorize: true,

    start: new Spherical( 0, Math.PI * 0.5, Math.PI ),
    shift: new Spherical( 0, Math.PI * 0.5, Math.PI ),
    randomSeed: new Spherical( 0,0,0 ),
    randomScale: new Spherical( 1,1,1 ),   

    colorBase: new Color(),
    hueShift: Math.PI / 6,
    hueSeed: 0,
    hueRandomScale: 1

}

const vecHelper = new Vector3();
const sphHelper = new Spherical();
const colorHelper = new Color();

class LightPropertiesManager{

    constructor( skyDome, opts ){

        this.skyDome = skyDome;

        opts = Object.assign( {}, lightProperties, opts );
        this.needsUpdate = false;

        for( let prop in lightProperties ){
            this[ prop ] = opts[ prop ]; 
            if( opts[prop] === lightProperties[prop] && opts[prop].clone ){
                opts[prop] = opts[prop].clone();
            }           
        }

    }

    update( lights ){
        
        if( this.needsUpdate ){

            this.needsUpdate = false;
            
            if( this.autoPosition ){

                sphHelper.copy( this.start );
                
                if( this.addDomeRadius ){
                    sphHelper.radius += this.skyDome.radius;
                }
    
                vecHelper.set( 0,0,0 );
    
                for( let i = 0; i<lights.length; i++ ){
    
                    vecHelper.setFromSpherical( sphHelper );
                    lights[i].position.copy( vecHelper );
    
                    sphHelper.radius += this.shift.radius;
                    sphHelper.theta += this.shift.theta;
                    sphHelper.phi += this.shift.phi;
    
                }

            }

            if( this.autoColorize ){

                colorHelper.copy( this.colorBase );

                for( let i = 0; i<lights.length; i++ ){

                    lights[i].color.copy( colorHelper );
                    colorHelper.offsetHSL( this.hueShift,0,0 );

                }

            }


        }

    }

    addToGui( Gui, name ){

        Gui.add( `${name}.light-properties`, this, {
            props: [
                'autoPosition', 'autoColorize'
            ]
        } );

        Gui.add( `${name}.light-properties.position`, this,{
            props: [ 
                'addDomeRadius',
                'start',
                'shift',
                'randomSeed',
                'randomScale'
            ]
        } );

        Gui.add( `${name}.light-properties.colorize`, this,{
            props: [ 'colorBase', 'hueShift', 'hueSeed', 'hueRandomScale' ]
        } );

    }

    // Triggered from gui.
    onGuiChange(){

        this.needsUpdate = true;

    }



}

for( let key in lightProperties ){

    Object.defineProperty( LightPropertiesManager.prototype, key, {

        get: function(){

            return this[ `_${key}` ];

        },
        set: function(value){

            this[ `_${key}` ] = value;            
            this.needsUpdate = true;

        }

    })

}
