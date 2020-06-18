
import dat from 'dat.gui';

import {
    Object3D,
    SphereBufferGeometry,
    PlaneBufferGeometry,
    Mesh,
    MeshLambertMaterial,
    MeshPhongMaterial,
    MeshBasicMaterial,    
    PointLight,
    DirectionalLight,
    PointLightHelper,
    BackSide,
    DoubleSide,
    Matrix4,
    GeometryUtils,
    GeometryIdCount
} from 'three';



import OpacityLightMaterial from '../materials/OpacityLightMaterial';
import MaterialModifier from 'three-material-modifier';

const flipNormals = ( geometry )=>{

    const normals = geometry.attributes[ 'normal' ].array;

    for( let i = 0; i<normals.length; i+=3 ){
        normals[ i ] = -normals[ i ];
        normals[ i+1 ] = -normals[ i+1 ];
        normals[ i+2 ] = -normals[ i+2 ];
    }

    // const position = geometry.attributes[ 'position' ].array;
    // let p1,p2,p3;
    // for( let i = 0; i<position.length; i+=3 ){

    //     p1 = position[ i ];
    //     p2 = position[ i+1 ];
    //     p3 = position[ i+2 ];

    //     position[ i ] = p3;
    //     position[ i + 1 ] = p2;
    //     position[ i + 2 ] = p1;

    // }    

    // geometry.computeVertexNormals();

}

export default class DomeEnvironment extends Object3D{

    constructor(){

        super();
        this.init();

    }

    init(){

        const scale = 40;
        const seg = 60;
        const sphere = new SphereBufferGeometry( 
            1,seg,seg,
            0,Math.PI*2, 0,Math.PI*0.5
        );

        const InvertedMeshPhongMaterial = MaterialModifier.extend( 'phong',{
            fragmentShader: {
                postFragColor: `
                gl_FragColor.rgb = 1.0 - gl_FragColor.rgb;
                `
            }
        });

        this.sky = new Mesh( 
            sphere.clone(),
            new InvertedMeshPhongMaterial( {
                color: 0xffffff,
                side: BackSide
            })
            // new OpacityLightMaterial.Lambert( {
            //     color: 0xffffff//,
            //     // side: BackSide
            // })         
            // new MeshLambertMaterial( {
            //     color: 0xffffff,
            //     side: BackSide
            // })       
        );

                
        flipNormals( this.sky.geometry );

        this.add( this.sky );
        this.sky.scale.multiplyScalar(scale);

        const horizonLen = Math.PI * 0.1;
        this.horizon = new Mesh( 
            new SphereBufferGeometry( 
                1,10,10,
                0,Math.PI*2, Math.PI*0.5-horizonLen,horizonLen
            ),
            new MeshLambertMaterial( {
                color: 0xff0000,
                side: BackSide
            })            

        )
        
        // this.add( this.horizon );
        this.horizon.scale.multiplyScalar( scale - 0.1 );

        this.ground = new Mesh( 
            sphere,
            // new PlaneBufferGeometry(1,1,1,1),
            // new OpacityLightMaterial.Lambert( {
            //     color: 0xffffff
            // }),
            new InvertedMeshPhongMaterial( {
                color: 0xffffff,
                // side: BackSide
            })
        );

        // flipNormals( sphere );

        // const bakeTransform = new Matrix4();
        // bakeTransform.makeRotationX( Math.PI * -0.5 );
        // this.ground.geometry.applyMatrix( bakeTransform );

        this.add( this.ground );
        this.ground.scale.multiplyScalar(scale*1.01);
        this.ground.scale.y = 0.00001;
        
        const p1 = new PointLight( 0xffffff - 0x0000ff, 1, 100, 2 );
        
        this.add( p1 );
        this.p1 = p1;

        const p1H = new PointLightHelper( p1,2 );
        this.add( p1H );
        
        const p2 = new PointLight( 0xffffff - 0xff0000, 2, 400, 2 );//, 200 );
        this.add( p2 );
        this.p2 = p2;

        const p2H = new PointLightHelper( p2,2 );
        this.add( p2H );

        this.p1h = p1H;
        this.p2h = p2H;

        this.time = 0;
        this.radius = 55;

        const dL = new DirectionalLight( 0xffffff - 0x00ff00, 2 );
        dL.position.set( -1,1,-0.5 );
        this.add( dL );

        var gui = new dat.GUI();
        // gui.add( p2, 'color');
        var p1Folder = gui.addFolder( 'Point Light 1 ' );
        p1Folder.add( p1, 'intensity', 0,3 );
        p1Folder.add( p1, 'decay', 0,10 );
        p1Folder.add( p1, 'distance', 50,500 );
        p1Folder.add( p1, 'visible' );

        var p2Folder = gui.addFolder( 'Point Light 2 ' );
        p2Folder.add( p2, 'intensity', 0,3 );
        p2Folder.add( p2, 'decay', 0,10 );
        p2Folder.add( p2, 'distance', 50,500 );
        p2Folder.add( p2, 'visible' );        

        var dLFolder = gui.addFolder( 'Directional Light' );
        dLFolder.add( dL, 'intensity', 0,3 );
        dLFolder.add( dL, 'visible' );      

        gui.add( this, 'radius', 5, 100 );

        
        // gui.add(text, 'explode');

    }

    updateMatrixWorld( force ){

        this.p1h.update();
        this.p2h.update();

        const inc = 0.001;
        const r = this.radius;

        this.p1.position.y = r;
        this.p1.position.x = Math.cos( this.time * ( Math.PI * inc ) ) * r;
        this.p1.position.z = Math.sin( this.time * ( Math.PI * inc ) ) * r;

        this.p2.position.y = r;
        this.p2.position.x = Math.cos( this.time * ( Math.PI * inc ) + Math.PI * 0.4 ) * ( r * 0.8 );
        this.p2.position.z = Math.sin( this.time * ( Math.PI * inc ) + Math.PI * 0.4 ) * ( r * 0.8 );

        super.updateMatrixWorld(force);

        // this.time += 1;

    }

}