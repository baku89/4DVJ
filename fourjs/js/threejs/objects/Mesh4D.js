/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author jonobr1 / http://jonobr1.com/
 * @author baku89 http://baku89.com
 */

THREE.Mesh4D = function ( geometry, material ) {

	if ( !( geometry instanceof THREE.Geometry4D ) ||
		 !( material instanceof THREE.ShaderMaterial4D ) ) {

		console.log('THREE.Mesh4D: error');

		return null;
	}

	THREE.Mesh.call( this, geometry, material );
};

THREE.Mesh4D.prototype = Object.create( THREE.Mesh.prototype );