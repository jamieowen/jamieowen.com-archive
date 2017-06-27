echo $INPUT
echo $OUTPUT
browserify --version
browserify $INPUT -t [ babelify --presets [ es2015 ] ] -t glslify  | uglifyjs -cm > $OUTPUT
