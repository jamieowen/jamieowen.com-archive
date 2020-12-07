import Sketch from 'three-toolkit/quick-sketch';

import {
    Mesh,
    SphereBufferGeometry,
    MeshBasicMaterial
} from 'three';


import movingAverage from './lib/audio/movingAverage';


const createGraph = ( array,resize=true )=>{

    let canvas = document.createElement( 'canvas' );

    canvas.style.position = 'absolute';
    canvas.style.top = '0px'; canvas.style.left = '0px';

    let context = canvas.getContext( '2d' );

    let draw = ()=>{

        let dpr = 2;
        let w = window.innerWidth * dpr;
        let h = 40 * dpr;
        canvas.width = w
        canvas.height = h;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = 40 + 'px';

        context.clearRect(0,0,w,h);

        let padding = 1;
        let spacing = 1;
        let lineWidth = ( w - ( spacing*(array.length-1)) ) / array.length;

        context.strokeStyle = 'white';
        context.lineWidth = lineWidth;

        //let spacing = w / array.length;
        let x;

        for( let i = 0; i<array.length; i++ ){

            x = i*lineWidth + i*spacing
            context.moveTo( x,h );
            context.lineTo( x,h*( 1-array[i]) );

        }

        context.stroke();

    }

    let dpr = 2;

    if( resize ){
        window.addEventListener( 'resize', draw );
    }

    draw();

    return canvas;

}

Sketch( {

    opt1: 12,
    opt2: 'etc'

}, ( scene, camera, manager )=>{

    let ref = new Mesh(
        new SphereBufferGeometry(10,10,10),
        new MeshBasicMaterial({
            color: 0xffffff
        })
    );

    let rand = [];
    for( let i = 0; i<200; i++ ){

        //rand.push( Math.random() );
        //rand.push( Math.sin( Math.PI * 5.0 * ( i / 200 ) ) );
        rand.push( Math.cos( i / 200 ) );

    }

    let canvas = createGraph( rand );
    document.body.appendChild( canvas );

    let average = movingAverage.movingAverage( 10,rand );

    console.log( rand );
    console.log( 'OKOK' );
    console.log( average );

    canvas = createGraph( average );
    document.body.appendChild( canvas );
    canvas.style.top = '50px';

    scene.add( ref );

    let update = ()=>{

    }

    return { update };

});
