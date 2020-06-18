
import {
    WebGLRenderer,
    Scene,
    Mesh,
    Object3D,
    DoubleSide,
    PerspectiveCamera,
    RawShaderMaterial,
    MeshBasicMaterial,
    MeshLambertMaterial,
    BufferGeometry,
    BufferAttribute,
    BoxBufferGeometry,
    SphereBufferGeometry,
    Vector2,
    Vector3,
    HemisphereLight,
    DirectionalLight,
    PointLight
} from 'three';


window.onload = ()=>{


    let renderer = new WebGLRenderer({
        antialias:true
    });

    renderer.setPixelRatio( 2 );
    document.body.style.margin = '0px';
    document.body.appendChild( renderer.domElement );

    let scene = new Scene();
    let camera = new PerspectiveCamera( 45, 4/3, 0.1, 1000 );
    camera.position.z = 100;
    let hem = new HemisphereLight( 0xff00ff, 0xaa0000 );
    let dir = new DirectionalLight( 0xffffff, 1 );
    let point = new PointLight( 0xfffffff, 1 );

    scene.add( hem );
    //scene.add( dir );
    scene.add( point );

    dir.position.set( 20,10,20 );
    point.position.set( 20,20,30 );

    let box;
    let boxes = [];
    //let geometry = new BoxBufferGeometry(1,1,1,1,1,1);
    let geometry = new SphereBufferGeometry(1,3,1);

    for( let i = 0; i<8; i++ ){

        box = new Mesh( geometry, new MeshLambertMaterial({
            color: 0xfffffff
        }))
        scene.add( box );
        box.position.y = i * 20;
        box.scale.set( 20,20,20 );
        box.userData = {
            rand: Math.random(),
            y: box.position.y
        }

        box.rotateX( Math.random() * Math.PI );
        box.rotateZ( Math.random() * Math.PI );
        boxes.push( box );

    }

    renderer.autoClear = false;

    let baseRotate = camera.quaternion.clone();
    let baseSceneRotate = scene.quaternion.clone();

    let base = 0;
    let time = 0;
    let frame = 0;

    let mouse = {
        x: 0,
        y: 0
    } // set below

    let render = ()=>{

        renderer.clear();

        time += 0.05;
        let r = 20;
        frame++;

        //dir.position.set( Math.sin( time ) * r, Math.cos( time ) * r, 20  );
        point.position.set( Math.sin( time ) * r, Math.cos( time ) * r, 100  );

        let d,b;
        for( let i = 0; i<boxes.length; i++ ){

            b = boxes[i];
            d = b.userData;
            b.rotateX( Math.PI * 0.001 );
            b.rotateY( Math.PI * 0.002 );

            //b.position.y = d.y + Math.sin( time + d.y  ) * 10.0;
            // b.position.y = d.y + Math.sin( time + d.y  ) * ( mouse.y * 10.0  / window.innerHeight );
            // b.position.x = d.y + Math.cos( time + d.y  ) * 4.0;
            // b.position.z = d.y + Math.sin( time * 0.2  ) * ( 10.0 * ( d.y / 100.0 ) );
            //
            b.position.y = ( mouse.y * 4.0  / window.innerHeight );
            b.position.x = Math.sin( time * 0.2  ) * 10.0;
            //b.position.x = 0.4;
            //b.position.z = d.y + Math.sin( time * 0.2  )  * ( mouse.y * 10.0  / window.innerHeight );

        }

        base += Math.PI * 0.0001;
        camera.quaternion.copy( baseRotate );
        scene.quaternion.copy( baseSceneRotate );

        let count = 12;
        let rot = Math.PI * 2 / count;

        let fovMin = 25;
        let fovMax = 70;

        for( let i = 0; i<count; i++ ){

            //camera.fov = fovMin + ( ( i / count ) * ( fovMax - fovMin ) );
            camera.updateProjectionMatrix();
            camera.rotateZ( rot );
            scene.rotateZ( -rot );

            //camera.rotateX( rot );
            //scene.rotateY( rot );

            //scene.rotateZ( rot );
            //scene.rotateY( rot );
            renderer.render( scene, camera );


        }

        if( frame % 60 === 0 ){
            console.log( 'ROTATE' );
            //camera.rotateX( Math.PI );
            scene.rotateX( Math.PI );
        }

        requestAnimationFrame( render );

    }

    let resize = ()=>{

        let w = window.innerWidth;
        let h = window.innerHeight;

        renderer.setSize( w,h );
        camera.aspect = w/h;
        camera.updateProjectionMatrix();

    }

    window.onmousemove = ( ev )=>{

        let m = {
            x: ev.clientX,
            y: ev.clientY
        }

        mouse = m;

    }

    window.onresize = resize;
    window.onresize();

    render();

}
