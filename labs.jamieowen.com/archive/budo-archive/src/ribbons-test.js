
import {
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    SphereBufferGeometry,
    MeshLambertMaterial,
    AmbientLight,
    DirectionalLight,
    Mesh,
    Vector3

} from 'three';

import RibbonsCpuSim from 'three-toolkit/objects/ribbons-cpusim';



window.onload = ()=>{


    let renderer = new WebGLRenderer({
        antialias: true
    });

    document.body.appendChild( renderer.domElement );

    let camera = new PerspectiveCamera( 35, 4/3, 0.1, 1000 );
    let scene = new Scene();
    let mesh = new Mesh(
        new SphereBufferGeometry(1,4,4),
        new MeshLambertMaterial({
            color: 0xff00ff
        })
    )
    scene.add( mesh );
    mesh.position.x = 100;
    let light = new AmbientLight(0xffffff, 0.4);
    scene.add( light );

    let dirLight = new DirectionalLight();
    scene.add( dirLight );
    dirLight.position.set( 10,10,10 );
    camera.position.z = 400;

    const SPHERE_RADIUS = 100;
    const RIBBON_COUNT = 40;
    const RIBBON_LENGTH = 20;

    // + Sphere radius
    const RIBBON_RADIUS_MIN = 8.0;
    const RIBBON_RADIUS_RAND = 30.0;

    const RIBBON_RADIUS_MIN_VR = 25.0;
    const RIBBON_RADIUS_RAND_VR = 35.0;

    let minThickness = 2;
    let ribbonData = [];
    let r,s;
    for( let i = 0; i<10; i++ ){

        r = {

            position: new Vector3(), // x,y,z : theta,phi,radius
            target: new Vector3(), // as above
            velocity: new Vector3(),
            steer: new Vector3(),
            thickness: ( Math.random() * 0.2 ) + minThickness,
            time: 1.0,

            // calculated on step.
            x: 0,
            y: 0,
            z: 0

        }

        s = 1.0;
        r.position.x = Math.random() * Math.PI * s;
        r.position.y = Math.random() * Math.PI * s;
        r.position.z = SPHERE_RADIUS + RIBBON_RADIUS_MIN + ( Math.random() * RIBBON_RADIUS_RAND );

        r.target.x = Math.random() * Math.PI * s;
        r.target.y = Math.random() * Math.PI * s;
        r.target.z = r.position.z;

        //r.target.
        r.velocity.x = 0.001 + ( Math.random() * 0.005 );
        r.velocity.y = 0.001 + ( Math.random() * 0.005 );

        r.steer.x = 0.001;
        r.steer.y = 0.001;
        r.steer.z = 0.001;

        r.steer.multiplyScalar( 0.3 );

        ribbonData.push( r );

    }

    let vecA = new Vector3();

    let ribbons = new RibbonsCpuSim( ribbonData, ( ribbonData,i )=>{

        //console.log( 'UPDATE' );

        let p = ribbonData.position;
        let t = ribbonData.target;
        let v = ribbonData.velocity;
        let s = ribbonData.steer;

        vecA.copy( t );
        vecA.sub( p ).normalize().multiply( s );
        //vecA.sub( p ).multiply( s );

        v.add( vecA );

        let r = p.z;

        p.add( v );

        // ribbonData.x = r * Math.sin(p.y) * Math.sin(p.x);
        // ribbonData.y = r * Math.cos(p.y);
        // ribbonData.z = r * Math.sin(p.y) * Math.cos(p.x);

        ribbonData.x += 0.1;
        ribbonData.y += 0.1;
        ribbonData.z += 0.0;

    }, {
        precomputeHistory: true,
        ribbonLength: 50,
        addDebugLines: true
    })

    // add ribbons...
    console.log( 'add ribbons', ribbons );
    scene.add( ribbons );
    //scene.add( ribbons.debugLines );

    ribbons.frustumCulled = false;

    let update = ()=>{

        ribbons.update();
        renderer.render( scene,camera );
        requestAnimationFrame( update );

    }

    update();

    let resize = ()=>{
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    resize();
    window.onresize = resize;
}
