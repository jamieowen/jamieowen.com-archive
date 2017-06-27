var argv = require('minimist')( process.argv.slice(2) );
var fs = require( 'fs-extra' );
var path = require( 'path' );

/**
 *
 * Generate a html file using the bundle file name in the dest path. so /output-path/index.html
 *
 * --dest
 * --bundle file ( relative to output folder )
 *
 */

if( !argv.dest ){
    throw new Error( 'No dest path specified' );
}

if( !argv.bundle ){
    throw new Error( 'No bundle specified' );
}

let templateHTML = fs.readFileSync( path.join( __dirname, 'template.html' ), { encoding: 'utf8' } );

let folder = argv.bundle.replace( '.js', '' );
let templateOutput = templateHTML.replace( '$bundle.js', argv.bundle );
fs.mkdirsSync( path.join( argv.dest,folder) );
fs.writeFileSync( path.join( argv.dest,folder,'index.html' ), templateOutput, { encoding: 'utf8' } );
