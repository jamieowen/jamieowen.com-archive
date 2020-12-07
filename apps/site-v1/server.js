const express = require( 'express' );
const next = require( 'next' );

const dev = process.env.NODE_ENV !== 'production';

const app = next({dev});
const handle = app.getRequestHandler();

const projects = require( './data/projects' );

app.prepare().then(()=>{

    const server = express();
    
    server.get( '/work/:id', (req,res)=>{

        const id = req.params.id;

        if( !id ){
            id = projects.data[0].id;
        }

        return app.render( req,res, '/work', { id } );
        
    });

    server.get( '*', (req,res)=>{

        return handle(req,res);

    });

    server.listen(3000, (err) => {

        if (err) throw err;
        console.log('Server ready on http://localhost:3000');

      });

})

