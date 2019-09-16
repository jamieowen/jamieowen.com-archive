import React from 'react';
import { metrics } from '../styles/typography';

export default class CircleImage extends React.Component{

    constructor( props ){

        super( props );

    }

    render(){

        const className = this.props.featured ? 'featured' : 'non-featured';

        return (
            <div className={ 'container ' + className }>
                
                <style jsx>
                {`
                    div{

                        margin: 0px; padding: 0px;                        
                        border-radius: 50%; 
                        position: absolute;
                        
                    }

                    div.container{
                        position: relative;
                        margin-right: 32px;
                        background-color: #121212;
                        // opacity: 0.5;
                    }

                    div.featured{
                        width: ${metrics.columnWidth}px;
                        height: ${metrics.columnWidth}px;
                    }

                    div.non-featured{
                        width: ${metrics.columnWidth * 0.25 }px;
                        height: ${metrics.columnWidth * 0.25 }px;
                    }

                    div.image{
                        background-color: #ff88ff;
                        background-image: url( '/static/selected-work/serpentine-mobiledigitaltours/main.jpg');
                        background-size: cover;
                        background-position: 50% 50%;
                        // opacity: 0.35;
                    }

                    div.cover{
                        // background-color: #333333;
                        // opacity: 0.95;
                    }
                `}
                </style>

                <style jsx>
                {`
                    div.image{
                        background-image: url( '${ this.props.url }');
                    }
                `}
                </style>    

                <div className={ 'image ' + className }/>
                <div className="cover"/>            

            </div>
        )

    }
}