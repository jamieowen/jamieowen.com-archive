
import { metrics } from './typography';

export default ()=>{

    return (

        <style jsx global>
        {`
    
            h1,h2,h3{
                // background-color: rgba( 255,255,255,0.1 );
            }

            p{
                // background-color: rgba( 255,255,255,0.05 );
                margin-bottom: ${metrics.lineHeight}px;
            }

            .hide{
                visibility: hidden;
            }

            .hide-op{
                opacity: 0;
            }

            hr{
                // margin-top:${metrics.lineHeight*3}px;
                // margin-bottom:${metrics.lineHeight*3}px;
                height: 0px;
                border: solid 0px;
                // opacity: 0.2;
            }

            .break-1{
                margin-bottom: ${metrics.lineHeight * 1}px;
            }

            .break-1-5{
                margin-bottom: ${metrics.lineHeight * 1.5}px;
            }

            .break-2{
                margin-bottom: ${metrics.lineHeight * 2}px;
            }

            .break-3{
                margin-bottom: ${metrics.lineHeight * 3}px;
            }

            .break-4{
                margin-bottom: ${metrics.lineHeight * 4}px;
            }

            .break-5{
                margin-bottom: ${metrics.lineHeight * 5}px;
            }    
            
            .break-6{
                margin-bottom: ${metrics.lineHeight * 6}px;
            }   

            .break-7{
                margin-bottom: ${metrics.lineHeight * 7}px;
            }   

            .break-8{
                margin-bottom: ${metrics.lineHeight * 8}px;
            }               

            .break-9{
                margin-bottom: ${metrics.lineHeight * 9}px;
            }                           
            
            .break-10{
                margin-bottom: ${metrics.lineHeight * 10}px;
            }   


        `}
        </style>

    )

}
