
import Sketch from 'three-toolkit/quick-sketch';
import ColorM from 'color-toolkit/Color';
import ColorPalette from 'color-toolkit/ColorPalette';

import pantoneRgb from 'color-toolkit/palettes/pantone/rgb';
import pantoneNames from 'color-toolkit/palettes/pantone/names';

import colorWheelRgb from 'color-toolkit/palettes/color-wheel/rgb';
import colorWheelNames from 'color-toolkit/palettes/color-wheel/names';

import DatGui from 'dat.gui';
import GuiMeta from 'three-toolkit/gui-meta';
import bindDatGui from 'three-toolkit/gui-meta/bindDatGui';

import RibbonsCpuSim from 'three-toolkit/objects/ribbons-cpusim';

import LightingRig from 'three-toolkit/objects/lighting-rig';

import {
    PlaneBufferGeometry,
    BoxBufferGeometry,
    SphereBufferGeometry,
    Mesh,
    Object3D,
    Vector3,
    MeshBasicMaterial,
    MeshLambertMaterial,
    AmbientLight,
    DirectionalLight,
    PointLight,
    DoubleSide,
    Color,
    TextureLoader
} from 'three';

let body = document.body;
let style = document.createElement( 'style' );
style.innerHTML = `

    body{
        margin: 0px; padding: 0px;
        overflow: hidden;
    }

    div.label{
        font-family: Arial;
        font-size: 12px;
        line-height: 18px;
        pointer-events: all;
        cursor: pointer;
        color: #ffffff;
    }

    div.palette-container{
        position: absolute;
        top: 0px; left: 10px;
        width: 128px;
        height: 100%;
        overflow: scroll;
    }

    div.color-container{
        line-height: 0px;
    }
    span.color-swatch{
        display: inline-block;
        width: 16px; height: 16px;
    }

    div.scroll-container{
        position: absolute;
        top: 0px; left: 0px;
        width: 100%; height: 100%;
        overflow: scroll;
    }

    div.scroll-contents{
        //position: relative;
        width: 100%;
        height: 1000%;
    }
`

body.innerHTML = `
    <div id="gl-container">
    </div>
    <div id="scroll-container" class="scroll-container">
        <div class="scroll-contents"></div>
    </div>
    <div id='container' class='palette-container'>
    </div>
`;
let paletteContainer = document.getElementById( 'container' );
body.appendChild( style );
let glContainer = document.getElementById( 'gl-container' );
let scrollContainer = document.getElementById( 'scroll-container' );
let scrollContents = document.getElementsByClassName( 'scroll-contents' )[0];

let drawColorPalette = ( name, palette, onLabelClick=()=>{} )=>{

    let container = document.createElement( 'div' );
    container.classList.add( 'color-container' );
    paletteContainer.appendChild( container );

    let label = document.createElement( 'div' );
    label.classList.add( 'label' );
    label.innerText = name;
    label.onclick = ()=>{
        onLabelClick( palette );
    }
    container.appendChild( label );

    palette.colors.forEach( (color)=>{

        let ele = document.createElement( 'span' );
        ele.style.backgroundColor = color.rgb().string();
        ele.classList.add( 'color-swatch' );
        container.appendChild( ele );

    });

}

window.onload = ()=>{

    // Set up Color Palettes.
    //
    let pantone = new ColorPalette( 'pantone', pantoneRgb, pantoneNames );
    let colorWheel = new ColorPalette( 'color-wheel', colorWheelRgb, colorWheelNames )

    let pantoneMapped = pantone.map( colorWheel );

    // show some palettes
    drawColorPalette( 'color-wheel', colorWheel );

    //drawColorPalette( 'pantone-all', pantone );

    let palette;
    let paletteMap = {};
    for( let i = 0; i<pantoneMapped.length; i++ ){

        palette = pantoneMapped[i];
        paletteMap[ palette.name ] = palette;
        drawColorPalette( palette.name, palette );

    }

    // Global access.
    let cameraAngle = 0;
    let meshes = [];

    let sketch = new Sketch( glContainer, {

        background: 0x111111,
        near: 0.1,
        far: 2000,

        init:( scene, camera, manager, sketch )=>{

            let boxGeometry = new BoxBufferGeometry(1,1,1,1);
            let planeGeometry = new PlaneBufferGeometry(1,1,1,1);
            let sphereGeometry = new SphereBufferGeometry(0.5,20,20);

            // Objects.

            let container = new Object3D();

            let createMeshWithGeometry = ( geometry, count, uniformScale )=>{

                let mesh,material;

                for( let i = 0; i<count; i++ ){

                    material = new MeshLambertMaterial( {
                        color: 0xffffff,
                        side: DoubleSide
                    })

                    mesh = new Mesh( geometry,material );
                    mesh.position.y = -( Math.random() * 2000 );

                    let rot = Math.PI;
                    mesh.rotation.y = ( rot * Math.random() ) - ( rot / 2 );

                    mesh.userData = {
                        rand: Math.random()
                    };

                    if( uniformScale ){

                        let s = Math.random() * 100;
                        mesh.scale.set( s,s,s );

                    }else{
                        mesh.scale.set( ( Math.random() * 500 ) + 50,100,100 );
                    }

                    let x = 400;
                    mesh.position.x = ( Math.random() * x ) - ( x/2 );

                    container.add( mesh );
                    meshes.push( mesh );

                }

            }

            let count = 10;
            createMeshWithGeometry( boxGeometry, count );
            //createMeshWithGeometry( planeGeometry, 50 );
            createMeshWithGeometry( sphereGeometry, count, true );

            let ref;
            let refColors = [ 0xffffff, 0x000000, 0xff0000, 0x00ff00, 0x0000ff ];
            for( let i = 0; i<refColors.length; i++ ){

                ref = new Mesh(
                    sphereGeometry,
                    new MeshLambertMaterial( {
                        color: refColors[i]
                    })
                )

                scene.add( ref );
                ref.scale.set( 40,40,40 );
                ref.position.x = ( i * 45 ) - ( 225 / 2 );

            }

            scene.add( container );

            let textureLoader = new TextureLoader();
            let texture = textureLoader.load( '../src-static/selected-work/project-thumbs/adidas-verticals-thumb.jpg', ()=>{
                texture.needsUpdate = true;
                let s = 0.25;
                textureRef.scale.set( texture.image.naturalWidth * s , texture.image.naturalHeight * s , 1 );
                textureRef.position.y = 100;
            } );

            let textureRef = new Mesh(
                planeGeometry,
                new MeshLambertMaterial( {
                    color: 0xffffff,
                    map: texture,
                    side: DoubleSide
                })
            )
            scene.add( textureRef );
            textureRef.scale.set( 100,100,1 );
            //camera.position.z = 800;

            let lightingRig = new LightingRig({
                debug: true
            });

            //lightingRig.enable( 'key', false );
            //lightingRig.enable( 'ambient', false );
            lightingRig.meta( 'fill' ).theta = Math.PI * 0.5;
            lightingRig.meta( 'fill' ).phi = -Math.PI * 0.7;

            scene.add( lightingRig );

            scrollContainer.onscroll = (ev)=>{

                let scrollTop = ev.target.scrollTop;
                container.position.y = scrollTop;

            }

            let props = {

                colorPalette: 'red',
                useEmissive: false,
                emissiveColorAngle: 180, // complementary color
                emissiveIntensity: 0.2,

                cameraAngle: 90,

                backgroundColorAngle: 180,

                meta: {

                    cameraAngle: { min: -180, max: 180, step: 0.5 },
                    colorPalette: { values: colorWheel.colorNames },
                    emissiveColorAngle: { min: -180,max:180, step: 1 },
                    emissiveIntensity: { min:0.0, max:1.0, step: 0.01 }

                }

            };

            let addFilterProps = ( name, channel )=>{

                let prop = 'filter' + name;
                let groupName = 'Filter ' + name;

                props[ prop ] = false;
                props[ prop + 'Operator' ] = 'gte';
                props[ prop + 'Threshold' ] = 0.5;

                props.meta[ prop ] = { group: groupName };
                props.meta[ prop + 'Operator' ] = { values: [ 'lte', 'gte' ], group: groupName };
                props.meta[ prop + 'Threshold' ] = { min: 0.0, max: 1.0, step: 0.001, group: groupName };

            }

            addFilterProps( 'Luma', 'luma' );
            addFilterProps( 'Saturation', 'saturation' );
            addFilterProps( 'Value', 'value' );

            let addLightProps = ( name, group )=>{

                let light = lightingRig.light( name );
                let lightName = name[0].toUpperCase() + name.slice(1);

                props[ 'use' + lightName ] = light.visible;

                if( !( light instanceof AmbientLight ) ){

                    props[ name + 'Phi' ] = lightingRig.meta( name ).phi;
                    props[ name + 'Theta' ] = lightingRig.meta( name ).theta;
                    props[ name + 'Radius' ] = lightingRig.meta( name ).radius;

                }

                props[ name + 'Intensity' ] = light.intensity;

                if( light.isPointLight ){
                    props[ name + 'Decay' ] = light.decay;
                    props[ name + 'Distance' ] = light.distance;
                    props.meta[ name + 'Decay' ] = { min: 0, max: 5, step: 0.01, group: group };
                    props.meta[ name + 'Distance' ] = { min: 0, max: 2000, step: 1, group: group };
                }




                props[ name + 'ColorAngle' ] = 180;

                props[ name + 'SaturationAdjust' ] = 0;
                props[ name + 'ValueAdjust' ] = 0;

                props.meta[ 'use' + lightName ] = { group: group };

                props.meta[ name + 'Phi' ] = { min: -Math.PI, max: Math.PI, step: 0.001, group: group };
                props.meta[ name + 'Theta' ] = { min: -Math.PI, max: Math.PI, step: 0.001, group: group };
                props.meta[ name + 'Radius' ] = { min: 0, max: 1000, step: 1, group: group };

                props.meta[ name + 'Intensity' ] = { min: 0, max: 8, step: 0.01, group: group };

                //props.meta[ name + 'ColorAverageCalc' ] = { values: [ 'normal', 'high-luma'], group: group },
                props.meta[ name + 'ColorAngle' ] = { min: -180, max: 180, step: 0.5, group: group };

                props.meta[ name + 'SaturationAdjust' ] = { min: -1.0, max: 1.0, step: 0.01, group: group };
                props.meta[ name + 'ValueAdjust' ] = { min: -1.0, max: 1.0, step: 0.01, group: group };

            }

            let updateLightProps = ( name, palette )=>{

                let light = lightingRig.light( name );
                let lightName = name[0].toUpperCase() + name.slice(1);

                let averageColor = palette.averageColor();
                let rotatedColor = averageColor.rotate( guiProps.values[ name + 'ColorAngle' ] );

                let saturationAdjust = guiProps.values[ name + 'SaturationAdjust' ];
                let valueAdjust = guiProps.values[ name + 'ValueAdjust' ];

                let saturation = rotatedColor.saturationv();
                let value = rotatedColor.value();

                if( !( light instanceof AmbientLight ) ){

                    lightingRig.meta( name ).phi = guiProps.values[ name + 'Phi' ];
                    lightingRig.meta( name ).theta = guiProps.values[ name + 'Theta' ];
                    lightingRig.meta( name ).radius = guiProps.values[ name + 'Radius' ];

                }

                let addSat = saturationAdjust < 0 ? saturation*saturationAdjust : ( 100 - saturation ) * saturationAdjust;
                let addVal = valueAdjust < 0 ? value*valueAdjust : ( 100 - value ) * valueAdjust;

                rotatedColor = rotatedColor.saturationv( saturation + addSat );
                rotatedColor = rotatedColor.value( value + addVal );

                light.color.set( rotatedColor.rgbNumber() );

                light.visible = guiProps.values[ 'use' + lightName ];
                light.intensity = guiProps.values[ name + 'Intensity' ];

                if( light.isPointLight ){
                    light.decay = guiProps.values[ name + 'Decay' ];
                    light.distance = guiProps.values[ name + 'Distance' ];
                }

            }

            addLightProps( 'ambient', 'Amb Light' );
            addLightProps( 'fill', 'Fill/Point Light' );
            addLightProps( 'key', 'Key/Directional Light' );

            let guiProps = new GuiMeta( props );
            bindDatGui( DatGui, guiProps );

            let currentPalette = paletteMap[ props.colorPalette ];
            let filteredPalette = null;

            let minThickness = 2;

            let ribbonsData = [];
            let r,s;

            const SPHERE_RADIUS = 300;
            const RIBBON_COUNT = 40;
            const RIBBON_LENGTH = 20;

            // + Sphere radius
            const RIBBON_RADIUS_MIN = 8.0;
            const RIBBON_RADIUS_RAND = 30.0;

            const RIBBON_RADIUS_MIN_VR = 25.0;
            const RIBBON_RADIUS_RAND_VR = 35.0;

            let vecA = new Vector3();

            for( let i = 0; i<50; i++ ){

                r = {

                    position: new Vector3(), // x,y,z : theta,phi,radius
                    target: new Vector3(), // as above
                    velocity: new Vector3(),
                    steer: new Vector3(),
                    thickness: ( Math.random() * minThickness ) + minThickness,
                    color: new Color(),
                    time: 1.0,

                    // calculated on step.
                    x: 0,
                    y: 0,
                    z: 0,

                    r: null, // set below
                    g: null,
                    b: null

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

                r.r = r.color.r;
                r.g = r.color.g;
                r.b = r.color.b;

                ribbonsData.push( r );

            }

            let ribbons = new RibbonsCpuSim( ribbonsData, ( ribbonData )=>{

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


                ribbonData.x = r * Math.sin(p.y) * Math.sin(p.x);
                ribbonData.y = r * Math.cos(p.y);
                ribbonData.z = r * Math.sin(p.y) * Math.cos(p.x);

                ribbonData.r = ribbonData.color.r;
                ribbonData.g = ribbonData.color.g;
                ribbonData.b = ribbonData.color.b;

                // ribbonData.x += 0.1;
                // ribbonData.y += 0.1;
                // ribbonData.z += 0.0;

            }, {
                precomputeHistory: true,
                useColor: true,
                ribbonLength: 50//,
                //addDebugLines: true
            })

            // add ribbons...
            scene.add( ribbons );
            ribbons.frustumCulled = false;

            guiProps.onChange = ( prop,value )=>{

                if( prop === 'cameraAngle' ){
                    return;
                }

                let props = guiProps.values;
                let filtered;
                let applyFilter = false;

                if( prop === 'colorPalette' ){

                    currentPalette = paletteMap[ props.colorPalette ];
                    applyFilter = props.filterLuma || props.filterValue || props.filterSaturation;

                }

                let palette = currentPalette;

                if( ( prop && prop.indexOf( 'filter' ) === 0 ) || applyFilter ){

                    let filters = [];
                    if( props.filterLuma ){
                        filters.push( {
                            channel: 'luma',
                            threshold: props.filterLumaThreshold,
                            operator: props.filterLumaOperator
                        })
                    }
                    if( props.filterValue ){
                        filters.push( {
                            channel: 'value',
                            threshold: props.filterValueThreshold,
                            operator: props.filterValueOperator
                        })
                    }
                    if( props.filterSaturation ){
                        filters.push( {
                            channel: 'saturation',
                            threshold: props.filterSaturationThreshold,
                            operator: props.filterSaturationOperator
                        })
                    }

                    if( filters.length ){
                        console.log( 'Applying Filter..', filters.length );
                        console.log( `${ palette.name } - before : `, palette.colors.length );
                        filteredPalette = palette.filter( filters );
                        console.log( `${ filteredPalette.name } - after : `, filteredPalette.colors.length );
                    }else{
                        console.log( 'Clear Filter' );
                        filteredPalette = null;
                    }

                }

                if( filteredPalette ){
                    palette = filteredPalette;
                }

                //console.log( 'Using palette : ', palette.name, palette.colors.length );

                let averageColor = palette.averageColor();
                let ambColor = averageColor.rotate( props.ambientColorAngle );
                let keyColor = averageColor.rotate( props.dirLightColorAngle );
                let fillColor = averageColor.rotate( props.pointLightColorAngle );

                sketch.manager.renderer.setClearColor( averageColor.rgbNumber() );

                updateLightProps( 'ambient', palette );
                updateLightProps( 'key', palette );
                updateLightProps( 'fill', palette );

                let l = palette.colors.length;

                meshes.forEach( ( mesh, i )=>{

                    let color = palette.colors[i %l];

                    if( !color ){
                        mesh.material.color.set( 0xffffff );
                        mesh.material.emissive.set( 0xffffff );
                        mesh.material.emissiveIntensity = 1.0;
                        return;
                    }

                    mesh.material.color.set( color.rgbNumber() );

                    if( props.useEmissive ){
                        let emissive = color.rotate( props.emissiveColorAngle );
                        mesh.material.emissive.set( emissive.rgbNumber() );
                    }else{
                        mesh.material.emissive.set( 0x000000 );
                    }

                    mesh.material.emissiveIntensity = props.emissiveIntensity;


                });

                ribbonsData.forEach( ( ribbon,i )=>{

                    let color = palette.colors[i %l];
                    ribbon.color.set( color.rgbNumber() );

                })

            }

            guiProps.onChange();


            let update = ()=>{

                //container.rotation.y += 0.001;

                /**
                meshes.forEach( ( mesh, i )=>{

                    mesh.rotation.x += 0.003;
                    mesh.rotation.z += 0.003;

                })
                **/

                //lightingRig.rotation.y += 0.005;

                ribbons.update();

                let r = 1000;

                camera.position.x = Math.cos( guiProps.values.cameraAngle * ( Math.PI / 180 ) ) * r;
                camera.position.z = Math.sin( guiProps.values.cameraAngle * ( Math.PI / 180 ) ) * r;
                camera.position.y = 0;

                camera.lookAt( scene.position );

                requestAnimationFrame( update );

            }

            window.addEventListener( 'click', ()=>{
                //console.log( ribbons );
            })

            update();

        },

        render: ( renderer )=>{


        },

        pointer: ( x,y,w,h, )=>{

            //console.log( 'pointer' );
            //cameraAngle = Math.PI / 180 * ( ( x - ( w / 2 ) ) * 0.8 );

        }

    } );

}
