const projects = require( './projects.generated' );

module.exports = {
    
    data: projects,

    getProjectById: function( id ){

        const p = projects.filter( function( p, i ){

            return p.id === id;

        });

        if( p.length === 1 ){
            return p[0];
        }else{
            return null;
        }

    },

    getNextPreviousProject: function( id ){

        const project = this.getProjectById( id );
        const _projects = this.getPageOrderProjects();
        const mp = _projects.map( (p)=>{
            return p.id;
        })
        console.log( 'PAGE ORDER', mp );
        const idx = _projects.indexOf( project );

        if( idx >= 0 ){

            return {
                next: idx+1 >= _projects.length ? null : _projects[ idx+1 ],
                previous: idx-1 <= -1 ? null : _projects[ idx-1 ]
            }

        }else{

            return {
                next: null,
                previous: null
            }

        }
        
    },    

    getFeaturedProjects(){

        return projects.filter( ( p )=>{

            return p.featured;
            
        }).sort( ( a,b )=>{

            return a.order - b.order;

        });

    },

    getNonFeaturedProjects(){

        return projects.filter( ( p )=>{

            return !p.featured;

        }).sort( ( a,b )=>{

            return a.order - b.order;

        });

    },  

    getPageOrderProjects(){

        return projects.slice(0).sort( (a,b)=>{

            return a.pageOrder - b.pageOrder;

        });

    }

}
