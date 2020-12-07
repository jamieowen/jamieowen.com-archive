
import {
    WebGLRenderer,
    Scene,
    Mesh,
    Object3D,
    DoubleSide,
    PerspectiveCamera,
    RawShaderMaterial,
    MeshBasicMaterial,
    BufferGeometry,
    BufferAttribute,
    SphereBufferGeometry,
    Vector2,
    Vector3
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

    let radius = 50;
    let sphereGeometry = new SphereBufferGeometry( radius,50,50 );
    let pointGeometry = new SphereBufferGeometry( 5, 30,30 );

    let pointMeshes = [];

    let colors = [ 0xff0000, 0xffff00, 0x0000ff ];

    let spacing = 120;
    let mesh,container;
    let pointMesh,sphObj;

    for( let i = 0; i<3; i++ ){

        container = new Object3D();

        mesh = new Mesh(
            sphereGeometry,
            new MeshBasicMaterial( {
                color: 0x343434,
                transparent: true,
                opacity: 0.7
            })
        )

        container.add( mesh );
        container.position.x = ( i * spacing ) - ( ( spacing * 2 ) / 2 );

        scene.add( container );

        // create points

        for( let j = 0; j<10; j++ ){

            sphObj = {
                convType: i,
                phi: Math.PI * 0.05,
                theta: j * ( Math.PI * 2.0 / 10 ),
                radius: radius + 10
            }

            pointMesh = new Mesh(
                pointGeometry,
                new MeshBasicMaterial( {
                    color: colors[ i ],
                    transparent: true,
                    opacity: 0.2 + ( ( j / 10 ) * 0.8 )
                })
            )

            container.add( pointMesh );
            pointMesh.userData = sphObj;
            pointMeshes.push( pointMesh );

        }

    }

    let toCartesian1 = ( position, radius, phi, theta )=>{

        // adjusting phi squeezes to the top along the y axis..

        position.x = radius * Math.sin(phi) * Math.sin(theta);
        position.y = radius * Math.cos(phi);
        position.z = radius * Math.sin(phi) * Math.cos(theta);

    }

    let toCartesian2 = ( position, radius, phi, theta )=>{

        position.x = radius * Math.sin(phi) * Math.cos(theta);
        position.y = radius * Math.sin(phi) * Math.sin(theta);
        position.z = radius * Math.cos(phi);

    }

    let toCartesian3 = ( position, radius, phi, theta )=>{

        position.x = radius * Math.cos(phi);
        position.y = radius * Math.sin(phi) * Math.cos(theta);
        position.z = radius * Math.sin(phi) * Math.sin(theta);

    }

    let toSphere1 = ( position, x, y, z )=>{

        // radius
        let radius = position.length();
        position.x = radius;
        position.y = Math.acos( y / radius ); // phi
        position.z = Math.atan2( x,z ); // theta

    }

    let toSphere2 = ( position, x, y, z )=>{

        // radius
        let radius = position.length();
        position.x = radius;
        position.y = Math.asin( y / radius );
        position.z = Math.atan2( z,x );

    }

    let toSphere3 = ( position, x, y, z )=>{

        // radius
        let radius = position.length();
        position.x = radius;
        position.y = Math.asin( y / radius );
        position.z = Math.atan2( x,z );

    }

    let toCartesian = [ toCartesian1, toCartesian2, toCartesian3 ];
    let toSphere = [ toSphere1, toSphere2, toSphere3 ];

    let updatePointMeshes = ()=>{

        let mesh,sph,p;

        for( let i = 0; i<pointMeshes.length; i++ ){

            mesh = pointMeshes[ i ];
            p = mesh.position;
            sph = mesh.userData;

            toCartesian[ sph.convType ]( p, sph.radius, sph.phi, sph.theta );

            // convert back and forth to test.
            //toSphere[ sph.convType ]( p, p.x, p.y, p.z );
            //toCartesian[ sph.convType ]( p, p.x, p.y, p.z );

        }

    }

    updatePointMeshes();

    let time = 0;
    let camRadius = radius * 3.5;

    let render = ()=>{

        time+=0.01;

        camera.position.set(
            Math.cos( time ) * camRadius,
            300,
            Math.sin( time ) * camRadius
        );

        camera.position.set( 0,200,200 );

        camera.lookAt( scene.position );

        renderer.render( scene, camera );
        requestAnimationFrame( render );

    }

    let resize = ()=>{

        let w = window.innerWidth;
        let h = window.innerHeight;

        renderer.setSize( w,h );
        camera.aspect = w/h;
        camera.updateProjectionMatrix();

    }

    window.onresize = resize;
    window.onresize();

    render();

}
