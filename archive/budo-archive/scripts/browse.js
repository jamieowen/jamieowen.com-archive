var fs = require( 'fs-extra' );
var path = require( 'path' );
var getAllProjects = require( './getAllProjects' );

var templateHTML = fs.readFileSync( path.join( __dirname, 'templates', 'browse.html' ), { encoding: 'utf8' } );

var projects = getAllProjects();
var links = projects.map( function(p){

    var url = p.replace( 'src', '' ).replace( '.js', '' );
    var name = p.replace( '.js', '' ).split( '/' ).pop();

    console.log( url, '....', name );
    return '<a href="' + url + '" class="link" target="frame">' + name + '</a>';

});

var outFolder = 'deploy';
var templateOutput = templateHTML.replace( '${links}', links.join('') );

fs.writeFileSync( path.join( outFolder,'browse.html' ), templateOutput, { encoding: 'utf8' } );
