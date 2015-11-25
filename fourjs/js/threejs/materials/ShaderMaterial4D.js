/**
* @author baku89 https://baku89.com
*/

THREE.ShaderMaterial4D = function( parameters ) {

	_.assign( parameters, {
		side: THREE.DoubleSide
	} );

	if ( parameters.uniforms === undefined ) {
		parameters.uniforms = {};
	}

	_.assign( parameters.uniforms, {
		translate4D: { type: 'v4', value: null },
		matrix4D:    { type: 'm4', value: null },
		distance:    { type: 'f' , value: null },
		stereograph: { type: 'i' , value: null }

	} );

	if ( parameters.attributes === undefined ) {
		parameters.attributes = {};
	}

	_.assign( parameters.attributes, {
		positionW: { type: 'f', value: null },
		vertexNormal: { type: 'v4', value: null }
	} );

	THREE.ShaderMaterial.call( this, parameters );


}

THREE.ShaderMaterial4D.prototype = Object.create( THREE.ShaderMaterial.prototype );