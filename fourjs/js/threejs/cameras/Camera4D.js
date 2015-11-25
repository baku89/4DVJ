/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
 * @author baku89 / http://baku89.com
*/

THREE.Camera4D = function() {

	THREE.Camera.call( this );

	this.positionW = 1.0;

	this.stereograph = true;
}

THREE.Camera4D.prototype = Object.create( THREE.Camera.prototype );