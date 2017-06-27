var glob = require( 'glob' );

module.exports = function(){

    return glob.sync( 'src/**/*.js' );

}
