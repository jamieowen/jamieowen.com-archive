

/**
 *
 *
 * This is looking at testing how fast we can update matrices and quaternions
 * in a large graph.
 *
 * With the idea to enable nested graphs in the MeshInstancer.
 *
 */
import {
    Object3D
} from 'three';

/**
 * Extend the regular object 3d to benefit from the Euler, Matrix, and Quaternion implentation.
 * But add an additional property for instanced children that would exist in this element.
 *
 * When an objects updateMatricWorld is called we can update all the children's
 * position,scale and quaternion rotation accordingly.
 *
 */
class Object3DExtended extends Object3D{

    constructor(){

        super();
        this.instancedChildren = []; // or do we use children? Probably not depedning on child/instance type.

    }

    createInstancedChildren( count ){

        let child;
        for( let i = 0; i<count; i++ ){

            child = {
                position: {
                    x: 100,
                    y: 10,
                    z: 50
                },
                scale: {
                    x: 1.2,
                    y: 1.4,
                    z: 1.5
                },
                rotation:{
                    x: 0,
                    y: 0,
                    z: 0,
                    w: 0
                }

            }

            this.instancedChildren.push( child );

        }

    }


    updateMatrixWorld( force ){

        super.updateMatrixWorld( force );
        //console.log( 'update matrix world' );

        //if( )
        /**
        let child;
        for( let i = 0; i<this.instancedChildren.length; i++ ){

            child = this.instancedChildren[i];

            // apply matrix4 to position
            // apply matrix4 to scale
            // multiply quaternion to stored quat rotation

        }**/

    }


}
window.onload = ()=>{


    let maxChildren = 40;
    let maxDepth = 2;
    let maxInstancedChildren = 10;

    let then;
    let startTimer = ()=>{
        then = Date.now();
    }
    let endTimer = ( message )=>{
        let now = Date.now();
        let time = now - then;
        //console.log( message + ( time / 1000 ) + 's' );

        return message + ( time / 1000 ) + 's'
    }

    let buildGraph = ( depth, parent, count=0,icount=0 )=>{

        let obj;
        for( let i = 0; i<maxChildren; i++ ){

            let s = Math.random() * 1000;

            obj = new Object3DExtended();

            obj.position.set( Math.random() * s , Math.random() * s , Math.random() * s );
            obj.scale.set( Math.random() * s , Math.random() * s , Math.random() * s )
            obj.rotation.x = Math.random() * Math.PI * s;
            obj.rotation.y = Math.random() * Math.PI * s;
            obj.rotation.z = Math.random() * Math.PI * s;

            //obj.createInstancedChildren( maxInstancedChildren );
            //icount += maxInstancedChildren;

            parent.add( obj );
            count++;


            if( depth < maxDepth ){
                let res = buildGraph( depth+1, obj, count,icount );
                count = res.count;
                icount = res.icount;
            }

        }

        return { count,icount };

    }

    console.log( 'frame time : ', ( 1 / 60 ) );

    let test = new Object3DExtended();

    startTimer();
    let res = buildGraph( 0,test );
    endTimer( res.count + '/' + res.icount + ' objects created, build time : ' );

    startTimer();
    test.updateMatrixWorld(true);
    endTimer( 'updateMatrixWorldTime : ' );

    let out = document.createElement( 'div' );
    document.body.appendChild( out );

    let render = ()=>{

        startTimer();
        test.updateMatrixWorld(true);
        let msg = endTimer( 'Objects :' +  res.count  + ' :');
        out.innerText = msg;
        requestAnimationFrame( render );

    }

    render();


    console.log( 'built test : ', res );

}
