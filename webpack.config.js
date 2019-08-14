const path = require('path');
const argv = require('yargs').argv;
const glob = require('fast-glob');
const inquirer = require('inquirer');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ()=>{

  return inquirer.prompt([{
    type: 'list',
    name: 'fileSelect',
    choices: ()=>{
      const ignore = [ 'node_modules/**', '**/node_modules/**' ];
      if( argv.sketch ){
        ignore.push( `!(**/*${argv.sketch}*)` );
      }
      return glob.sync( '**/*.js', {
        ignore: ignore
      });
    }
  }]).then( (res)=>{

    /**
     * Generate webpack config with specified entry point.
     */
    const entry = res[ 'fileSelect' ];

    if( !entry ){
      console.log( 'No entry file selected' );
      process.exit();
    }

    return {
      entry: path.join( __dirname, entry ),
      output: {
        filename: path.basename( entry ),
        path: path.resolve(__dirname, 'build')
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env','@babel/preset-react'],
                plugins: []
              }
            }
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin()
      ]  
    }

  })

}


