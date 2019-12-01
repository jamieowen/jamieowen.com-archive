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
      return glob.sync( '**/*.(js|ts)', {
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
      devtool: 'inline-source-map',
      output: {
        filename: path.basename( entry ),
        path: path.resolve(__dirname, 'build')
      },
      devServer: {
        hot: false        
      },
      resolve: {
        alias: {
          '@jamieowen/sketch': path.resolve( __dirname, 'packages/sketch' ),
          '@jamieowen/three-mesh-instancing': path.resolve( __dirname, 'packages/three-mesh-instancing' ),
          '@jamieowen/three-transform-geometry': path.resolve( __dirname, 'packages/three-transform-geometry' ),
          '@jamieowen/three-renderman': path.resolve( __dirname, 'packages/three-renderman/src' ),
          '@jamieowen/toy.gui': path.resolve( __dirname, 'packages/toy-ui' )
        },
        extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: [ 'babel-loader' ]
          },
          {
            test: /\.tsx?$/,
            use: 'ts-loader', 
            exclude: /node_modules/,
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin()
      ]  
    }

  })

}


