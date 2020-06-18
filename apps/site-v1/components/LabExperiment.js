// 

import React from 'react';
import { metrics } from '../styles/typography';

export default class LabExperiment extends React.Component{

    constructor( props ){

        super( props );

    }

    render(){

        return (
            <iframe src="http://192.168.0.16:9966/">

                <style jsx>
                {`
                    iframe {
                        width: 100%;
                        height: 100%;
                        position: fixed;
                    }
                `}
                </style>
                
                { this.props.children }

            </iframe>
        )

    }
}