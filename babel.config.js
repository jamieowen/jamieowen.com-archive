module.exports = {
  presets: [
    [ '@babel/preset-env', { 
      targets: {
        browsers: ["> 2%"]
      }
    }],   
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/proposal-class-properties',
  ]
}