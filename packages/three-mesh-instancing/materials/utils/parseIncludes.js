const parseIncludes = ( string, chunks, recursive )=>{

	var pattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

	function replace( match, include ) {

		var replace = chunks[ include ];
		if ( replace === undefined ) {
			throw new Error( 'Can not resolve #include <' + include + '>' );
		}
    return parseIncludes( replace );
    
	}

	return string.replace( pattern, replace );

}

export {
  parseIncludes
}