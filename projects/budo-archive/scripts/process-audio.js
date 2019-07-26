var glob = require( 'glob' );
var lame = require( 'lame' );

var fs = require( 'fs-extra' );
var path = require( 'path' );
var mm = require( 'musicmetadata' );

// create a new parser from a node ReadStream


var mp3Paths = glob.sync( './temp/audio-process/**/*.mp3' );
var id3Queue = mp3Paths.slice(0);

var mp3List = [];

var writeMp3 = function( input, output, next ){

    fs.createReadStream( input )
        .pipe(
            new lame.Decoder()
        )
        .pipe(
            new lame.Encoder( {

                // input
                //channels: 2,        // 2 channels (left and right)
                //bitDepth: 16,       // 16-bit samples
                //sampleRate: 44100,  // 44,100 Hz sample rate

                // output
                bitRate: 128,
                //outSampleRate: 22050,
                mode: lame.STEREO // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO

            } )
        )
        .pipe(
            fs.createWriteStream( output )
        )
        .on('close', function () {
            console.error('done!');
            next();
        });

}

var next = function(){

    if( id3Queue.length ){

        var item = id3Queue.pop();

        var readStream = fs.createReadStream( item );

        var parser = mm( readStream, function(err, metadata) {

            if (err) throw err;
            readStream.close();

            /**
            title: 'Home',
             artist: [ 'GoGo Penguin' ],
             albumartist: [ 'GoGo Penguin' ],
             album: 'v2.0',
             year: '2014',
             track: { no: 6, of: 0 },
             genre: [],
             disk: { no: 0, of: 0 },
             picture:
             */

            var meta = {
                artist: metadata.artist,
                title: metadata.title,
                albumartist: metadata.albumartist,
                album: metadata.album,
                year: metadata.year
            }

            var filename = ( meta.artist + '_' + meta.title + '.mp3' ).toLowerCase().replace( /\s/ig, '-' );
            var output = path.join( './static/audio', filename );

            meta.url = 'audio/' + filename;
            mp3List.push( meta );

            writeMp3( item, output, next );
            next();

        });


    }else{

        let outFolder = './static/audio';
        fs.writeFileSync( path.join( outFolder,'audio-list.json' ), JSON.stringify( mp3List ), { encoding: 'utf8' } );

    }

}

next();
