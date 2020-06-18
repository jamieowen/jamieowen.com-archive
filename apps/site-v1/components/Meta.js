import React from 'react';
import Head from 'next/head'

export default class Meta extends React.Component{

    constructor( props ){

        super( props );

    }

    render(){

        return (
            <Head key={0}>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />
                <meta charSet="utf-8" />
            </Head>
        )

    }
}