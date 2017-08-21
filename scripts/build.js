//node scripts/generate-html.js --dest
//NODE_PATH=./node_modules browserify $npm_package_config_input -t [ babelify --presets [ es2015 ] ] -t glslify  | uglifyjs -cm > $npm_package_config_output

var argv = require('minimist')( process.argv.slice(2) );
var fs = require( 'fs-extra' );
var path = require( 'path' );
var cprocess = require( 'child_process' );
var getAllProjects = require( './getAllProjects' );

if( !argv.dest ){
    throw new Error( 'No destination specified' );
}

var fileList = [];


if( argv.input !== 'null' ){
    fileList.push( argv.input );
}else{
    fileList = getAllProjects();
}

console.log( 'File List : ', argv.input, fileList );

var templateHTML = fs.readFileSync( path.join( __dirname, 'templates', 'template.html' ), { encoding: 'utf8' } );

var next = function(){

    if( fileList.length ){

        var input = fileList.pop();
        var filename = input.split( '/' ).pop().replace('.js','');
        var outFolder = path.join( argv.dest, filename );
        var outFile = path.join( outFolder, filename + '.min.js' );
        var bundleJs = filename + '.min.js';
        var templateOutput = templateHTML.replace( '$bundle.js', bundleJs );

        fs.mkdirsSync( outFolder );
        fs.writeFileSync( path.join( outFolder,'index.html' ), templateOutput, { encoding: 'utf8' } );

        console.log( 'input:', input );
        console.log( 'output :', outFile );

        p = cprocess.spawn( 'sh', [ 'scripts/build-spawn.sh' ], {
            stdio: 'inherit',
            env: Object.assign( {}, process.env, {
                NODE_PATH: './node_modules',
                INPUT: input,
                OUTPUT: outFile
            } )
        } );

        p.on( 'close', function(){
            console.log( 'DONE' );
            console.log( '' );
            next();
        })


    }else{
        console.log( 'done...' );
    }

}

next();
