import {
  useState,
} from 'react';

import {
  World,
  Body,
  Vec3,
  Plane,
  Sphere,
  Trimesh
} from 'cannon';

const convertToTrimesh = ( geometry )=>{

  const positions = geometry.attributes.position.array;
  const index = geometry.index.array;
  const vertices = [];
  const indices = [];

  for( let i = 0; i<positions.length; i+=3 ){
    vertices.push( positions[i] );
    vertices.push( positions[i+2] );
    vertices.push( positions[i+1] );
  }

  for( let i = 0; i<index.length; i+=3 ){
    indices.push( index[i] );
    indices.push( index[i+2] );
    indices.push( index[i+1] );
  }

  return new Trimesh(vertices,indices);

}

const useCannon = (groundGeometry)=>{
  
  const [cannon] = useState(()=>{
    console.log( 'Initialise Cannon' );

    const world = new World();
    world.gravity.set(0,0,-9.82 * 2);

    world.allowSleep = true;
    world.solver.iterations = 20;
    // world.defaultContactMaterial.contactEquationStiffness = 1e10;
    // world.defaultContactMaterial.contactEquationRelaxation = 10;
    world.defaultContactMaterial.contactEquationStiffness = 1e7; // from sleep
    world.defaultContactMaterial.contactEquationRelaxation = 5;
    console.log( world ); 

    let groundShape;
    if( groundGeometry ){
      groundShape = convertToTrimesh(groundGeometry);
    }else{
      groundShape = new Plane();
    }

    const ground = new Body({
      mass: 0,
      shape: groundShape
    })
    world.addBody(ground);

    let done = false;

    const groundPlane = new Body({
      mass: 0,
      shape: new Plane(),
      position: new Vec3(0,0,-100)
    })
    world.addBody(groundPlane);

    const objects = [];
    let asleep = 0;
    const onSleep = (body)=>{
      // console.log('sleep');
      asleep++;
      if( asleep === objects.length ){
        console.log( 'DONE' );
        done = true;
      }
    }

    const onSleepy = ()=>{
      // console.log('sleepy');
    }

    const onWake = ()=>{
      // console.log( 'wake' );
      asleep--;
    }

    const api = {
      objects,
      addSphere: (object,radius=1,mass=5)=>{

        const body = new Body({
          mass: mass,
          position: new Vec3(object.position.x,object.position.z,object.position.y),
          shape: new Sphere(radius),
          fixedRotation: true
        })
        body.allowSleep = true; 
        body.sleepSpeedLimit = 0.05;
        body.sleepTimeLimit = 0.3;

        body.addEventListener( 'sleep', onSleep );
        body.addEventListener( 'sleepy', onSleepy );
        body.addEventListener( 'wakeup', onWake );
        
        world.addBody(body);

        objects.push({
          object,
          body
        });

      }
    }

    var fixedTimeStep = 1.0 / 60.0; // seconds
    var maxSubSteps = 3;

    // Start the simulation loop
    var lastTime;
    (function simloop(time){
      if( !done ){
        requestAnimationFrame(simloop);
      }else{
        console.log('kill loop');
      }      
      if(lastTime !== undefined){
        var dt = (time - lastTime) / 1000;
        world.step(fixedTimeStep, dt, maxSubSteps);
      }
      // console.log("Sphere z position: " + sphereBody.position.z);
      lastTime = time;

      objects.forEach( (e)=>{
        // debugger;
        e.object.position.x = e.body.position.x;
        e.object.position.y = e.body.position.z;
        e.object.position.z = e.body.position.y;
      })
    })();

    return api;

  });  

  return cannon;

}

export {
  useCannon
}