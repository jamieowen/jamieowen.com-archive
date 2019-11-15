var Compiler = require('glsl-transpiler');


window.onload = ()=>{

    var compile = Compiler({
    	uniform: function (name) {
    		return `uniforms.${name}`;
    	},
    	attribute: function (name) {
    		return `attributes.${name}`;
    	}
    });


    let res = compile(`
    	precision mediump float;
    	attribute vec2 uv;
    	attribute vec4 color;
    	varying vec4 fColor;
    	uniform vec2 uScreenSize;

    	void main(){
    		fColor = color;
    		vec2 position = vec2(uv.x, -uv.y) * 1.0;
    		position.x *= uScreenSize.y / uScreenSize.x;
    		gl_Position = vec4(position, 0, 1);
    	};
    `)

    console.log( res );
    console.log( compile );

    //☟
    /**
    `
    var uv = attributes.uv;
    var color = attributes.color;
    var fColor = [0, 0, 0, 0];
    var uScreenSize = uniforms.uScreenSize;

    function main () {
    	fColor = color;
    	var position = [uv[0], -uv[1]];
    	position[0] *= uScreenSize[1] / uScreenSize[0];
    	gl_Position = [position[0], position[1], 0, 1];
    };
    `
    **/
}
