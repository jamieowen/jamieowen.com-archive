
import Browser from 'bowser';

const mobileProps = {
    lineHeight: 18,
    lineHeightDivisor: 4,
    columnWidth: 200
}

const desktopProps = {
    lineHeight: 32,
    lineHeightDivisor: 4,
    columnWidth: 200
}

let props;
if( Browser.mobile ){
    props = mobileProps;
}else{
    props = desktopProps;
}

const metrics = {

    get lineHeight(){
        return props.lineHeight;
    },

    get lineHeightDivisor(){
        return props.lineHeightDivisor;
    },

    get columnWidth(){
        return props.columnWidth;
    },

    get desktop(){
        return desktopProps;
    },

    get mobile(){
        return mobileProps;
    }

}

export { metrics };

const scaleLineHeight = ( val=1 )=>{

    const res = metrics.lineHeight * val;
    const resAdjust = Math.ceil( res / metrics.lineHeightDivisor ) * metrics.lineHeightDivisor;
    return metrics.lineHeight * val;

}

const calcPageMetrics = ()=>{

    const margin = window.innerWidth <= 768 ? metrics.lineHeight * 1.0 * 2.0 : metrics.lineHeight * 2 * 2.0;         
    const maxWidth = 1000 + metrics.lineHeight * 2;    
    const actualWidth = ( Math.min( maxWidth, window.innerWidth ) - margin );
    const cellSize = actualWidth * 0.25;
    
    return { margin, maxWidth, cellSize, actualWidth };

}

export { calcPageMetrics };

export default ()=>{

    return (

        <style jsx global>
        {`
    
            @import url('https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500');
    
            * {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
    
            .fnt-light{
                font-weight: 200;
            }
    
            .fnt-regular{
                font-weight: 300;
            }
    
            .fnt-heavy{
                font-weight: 400;
            } 

            .fnt-smallest{
                font-size: 11px;
                letter-spacing: 0.66px;
                user-select: none;
                line-height: ${ metrics.lineHeight }px;
            }

            .fnt-smaller{
                font-size: 16px;
                letter-spacing: 0.25px;
                line-height: ${ metrics.lineHeight }px;
            }

            .fnt-shadow{
                filter: drop-shadow(1px 1px 0px rgba(0,0,0,0.35));
            }

            .color-primary{
                color: #efeeef;
            }

            .color-secondary{
                color: #666666;
            }            

            .color-body{
                color: #ffffff;
            }    
            
            .color-content{
                color: #ffffff;
            } 

            p{
                font-size: 32px;
                line-height: ${ scaleLineHeight(1.5) }px;
                font-weight: 300;
            }
    
            .fnt-small, h2{
                font-size: 18px;
                line-height: ${ metrics.lineHeight }px;
                letter-spacing: 0.25px;
            }
    
            .fnt-medium, h1{
                font-size: 36px;
                line-height: ${ metrics.lineHeight }px;
                letter-spacing: 1.6px;
            }
    
            .fnt-large{
                font-size: 56px;
                letter-spacing: 1.6px;
                line-height: ${scaleLineHeight(2)}px;
            }

            .fnt-larger{
                font-size: 60px;
                letter-spacing: 1.6px;
                line-height: ${scaleLineHeight(2)}px;
            }

            @media( max-width: 767px ){

                p{
                    font-size: 20px;
                    line-height: ${ metrics.lineHeight }px;
                    font-weight: 300;
                }

                .fnt-smallest{
                    font-size: 10px;
                    letter-spacing: 0.66px;
                    line-height: ${ metrics.lineHeight }px;
                }

                .fnt-smaller{
                    font-size: 13px;
                    letter-spacing: 0.25px;
                    line-height: ${ metrics.lineHeight }px;
                }                
        
                .fnt-small, h2{
                    font-size: 14px;                    
                    letter-spacing: 0.25px;
                    line-height: ${ metrics.lineHeight }px;
                }
        
                .fnt-medium, h1{
                    font-size: 22px;
                    letter-spacing: 0.25px;
                    line-height: ${ metrics.lineHeight }px;
                }
        
                .fnt-large{
                    font-size: 34px;
                    letter-spacing: 0.25px;
                    line-height: ${ scaleLineHeight(1.5)}px;
                }

                .fnt-larger{
                    font-size: 40px;
                    letter-spacing: 0.25px;
                    line-height: ${ scaleLineHeight(1.5)}px;
                }

            }

        `}
        </style>

    )

}
