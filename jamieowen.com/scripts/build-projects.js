var fs = require( 'fs' );
var glob = require( 'glob' );
var markdown = require( 'markdown' ).markdown;
var imageSize = require( 'image-size' );

var sourceProjectImages = './static/selected-work/**/*.{png,jpg,jpeg}';
var sourceProjectMarkdown = './static/selected-work/**/*.md';

var defaultMarkdown = 'Text';

var sourceProjectMeta = require( './source-projects' );
var outputProjects = './data/projects.generated.json';


sourceProjectMeta = sourceProjectMeta.filter( function(p){
    return p.enabled;
});

var projectImages = glob.sync( sourceProjectImages );
var projectMarkdown = glob.sync( sourceProjectMarkdown );

var filteredProjects = [];
var projectMap = {};

for( var i = 0; i<sourceProjectMeta.length; i++ ){

    var project = sourceProjectMeta[i];

    // Source Project Images

    for( var j = 0; j<projectImages.length; j++ ){

        if( projectImages[j].indexOf(project.id) > 0 ){

            // Create Hash Lookup
            if( !projectMap[ project.id ] ){

                projectMap[ project.id ] = Object.assign( {}, project, { images: [] } );
                filteredProjects.push( projectMap[project.id] );

            }

            const meta = imageSize( projectImages[j] );
            meta.url = projectImages[j];

            if( projectImages[j].indexOf( 'thumb' ) > -1 ){
                projectMap[ project.id ].thumb = meta;
            }else{
                projectMap[ project.id ].images.push( meta );    
            }            

        }

    }

    // Source Markdown

    for( var j = 0; j<projectMarkdown.length; j++ ){

        if( projectMarkdown[j].indexOf( project.id ) > 0 ){
            
            // Create Hash Lookup
            if( !projectMap[ project.id ] ){

                projectMap[ project.id ] = Object.assign( {}, project, { images: [] } );
                filteredProjects.push( projectMap[project.id] );

            }
            
            const content = markdown.toHTML( fs.readFileSync( projectMarkdown[j], { encoding: 'utf8' } ) );

            projectMap[ project.id ].content = content;
            projectMap[ project.id ].contentPath = projectMarkdown[j];

        }
    }


}

fs.writeFileSync( outputProjects, JSON.stringify( filteredProjects, null, 4 ), { encoding: 'utf8' } );

// console.log( sourceProjectMarkdown );
// console.log( filteredProjects );