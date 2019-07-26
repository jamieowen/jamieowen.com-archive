
// Gpu Moving Average??
// plot the values to some texture buffer every frame.
// copy the values down through the texture.
//

export default {

    movingAverage( period, items ){

        let compute = [];
        let result = [];

        let value;

        for( let i = 0; i<items.length; i++ ){

            value = items[i];
            compute.push( value );

            if( compute.length > period ){
                compute.shift();
            }

            if( compute.length < period ){
                result.push( 0 );
            }else{

                // compute average.
                let average = 0;
                for( let j = 0; j<compute.length; j++ ){
                    average += compute[j];
                }
                result.push( average / compute.length );

            }

        }

        return result;

    },

    exponentialMovingAverage( period, items ){



    }
}
