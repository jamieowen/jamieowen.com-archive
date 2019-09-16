import { Component } from 'react';

import CircleImage from './CircleImage';
import { metrics } from '../styles/typography';

export default class ProjectThumb extends Component{


    static defaultProps = {

        featured: true

    }

    constructor( props ){

        super( props );

    }

    render(){

        const className = this.props.featured ? 'featured' : 'non-featured';

        return (
            <div className={ className }>

                <style jsx>
                {`
                    div.featured{
                        margin: 0px; padding: 0px;
                        text-align: center;
                        display: inline-block;
                        margin-right: 32px;
                        width: ${metrics.columnWidth}px;
                    }

                    div.non-featured{
                        margin: 0px; padding: 0px;
                        text-align: center;
                        display: inline-block;
                        margin-right: 12px;
                        width: ${metrics.columnWidth * 0.25}px;
                    }

                    h1,h2{
                        text-transform: uppercase;
                        color: #666666;
                        // background-color: #333333;
                        // border-radius: ${metrics.lineHeight*0.5}px;
                        margin-top: ${metrics.lineHeight}px;
                        margin-bottom: ${metrics.lineHeight*2}px;
                        // min-height: ${metrics.lineHeight*2}px;                       
                    }
                `}
                </style>
            
                <CircleImage featured={this.props.featured} url={ this.props.project.images[0] }/>

                {/* <h1 className="fnt-smaller fnt-regular">{ this.props.project.title }</h1> */}
                {/* <h2 className="fnt-small fnt-heavy">{ this.props.project.agency }</h2>
                <h3 className="fnt-small fnt-regular">{ this.props.project.tech.join( ' / ' ) }</h3> */}



            </div>
        )

    }
}