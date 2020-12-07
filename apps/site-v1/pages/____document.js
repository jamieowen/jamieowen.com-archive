
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import Navigation from '../components/Navigation';

export default class MyDocument extends Document{


    static getInitialProps(context){

        console.log( 'Doc get initial props....', Object.keys( context ) );

        const { html, head, errorHtml, chunks } = context.renderPage();
        const styles = flush();
        const query = context.query;
        const projectId = query.id;
        // console.log( 'QUERY ID :', query.id, query.pathname );
        return { html, head, errorHtml, chunks, styles, projectId };

    }

    render () {
        return (
            <html>
            <Head>
            </Head>
            <body>
                <Navigation projectId={ this.props.projectId }/>
                <Main />
                <NextScript />                
            </body>
            </html>
        )
    }
}