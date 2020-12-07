

let defaultOpts = {

    sampleRate: 30, // ( per sec ) a very low rate is needed fo trigger visuals
    ma: [ 13,50,100 ]

}

// https://stackoverflow.com/questions/21011701/offlineaudiocontext-fft-analysis-with-chrome

export default class MaAudioAnalyser{

    constructor( opts ){

        this.opts = Object.assign( {}, defaultOpts, opts );

    }

    load( url ){

        // new OfflineAudioContext(numOfChannels,length,sampleRate);

        let context = new OfflineAudioContext();

        let request = new XMLRequest();
        request.responseType = 'arraybuffer';
        request.open( 'GET', this.url, true );

        request.onload = ()=>{

            context.decodeAudioBuffer( request.response, ( buffer )=>{


            } )

        }


    }

}
