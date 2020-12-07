
import {
    WebGLRenderer,
    Scene,
    Mesh,
    DoubleSide,
    PerspectiveCamera,
    RawShaderMaterial,
    BufferGeometry,
    BufferAttribute,
    Vector2,
    Vector3
} from 'three';

const A_BIG_TRIANGLE = new BufferGeometry();
A_BIG_TRIANGLE.addAttribute( 'position', new BufferAttribute( new Float32Array([-1,-1,0, -1,4,0, 4,-1,0 ]), 3 ) );


window.onload = ()=>{


    let renderer = new WebGLRenderer({
        antialias:true
    });

    renderer.setPixelRatio( 2 );
    document.body.style.margin = '0px';
    document.body.appendChild( renderer.domElement );

    let scene = new Scene();
    let camera = new PerspectiveCamera( 45, 4/3, 0.1, 1000 );

    let mesh = new Mesh( A_BIG_TRIANGLE, new RawShaderMaterial({
        uniforms: {
            resolution: { type: 'v2', value: new Vector2() }
        },
        vertexShader: `
        attribute vec3 position;
        varying vec2 uv;
        varying vec2 eye;

        uniform mat4 projectionMatrix;

        void main()
        {
            gl_Position = vec4(position,1.0);
            uv = 0.5 * (position.xy+1.0);

            eye = vec4( projectionMatrix * vec4( uv, 0.0, 0.0 ) ).xy;

        }
        `,
        fragmentShader:`

        precision mediump float;
        varying vec2 uv;
        varying vec2 eye;

        uniform vec2 resolution;

        float sphere(vec3 position, float radius) {
            return length(position) - radius;
        }

        void main(){

            float correct = resolution.x / resolution.y;
            vec2 ruv = ( uv * 2.0 - 1.0 ) * vec2( correct, 1.0);
            vec3 rd = normalize(vec3(ruv, 1.0));

            vec2 ey = ( eye * 2.0 - 1.0 );// * vec2( correct, 1.0);
            vec3 rdd = normalize( vec3( ey,1.0 ) );

            vec2 v = uv;

            // /gl_FragColor = vec4( eye.x,0.0,-eye.x,1.0 );

            //gl_FragColor.rb = eye;


            gl_FragColor.rgb = rd;
            //  gl_FragColor.r = sphere( rd, 10.0 );

            //gl_FragColor.rgb = rdd;

        }
        `,
        side: DoubleSide
    }))
    scene.add( mesh );

    let render = ()=>{

        renderer.render( scene, camera );
        requestAnimationFrame( render );

    }

    let resize = ()=>{

        let w = window.innerWidth;
        let h = window.innerHeight;

        mesh.material.uniforms.resolution.value.x = w * 2.0;
        mesh.material.uniforms.resolution.value.y = h * 2.0;

        renderer.setSize( w,h );
        camera.aspect = w/h;
        camera.updateProjectionMatrix();

    }

    window.onresize = resize;
    window.onresize();

    render();

}
