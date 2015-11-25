/**
* @author baku89 http://baku89.com
*/

THREE.Object4D = function() {

	THREE.Object3D.call( this );

	this.type = 'Object4D';

	this.up = THREE.Object4D.DefaultUp.clone();

	var position = new THREE.Vector4();
	var quaternionW	= new THREE.Quaternion();
	var scale = new THREE.Vector4( 1, 1, 1, 1);
}

THREE.Object4D.DefaultUp = new THREE.Vector4( 0, 1, 0, 0 );

THREE.Object4D.prototype = Object.create( THREE.Object3D.prototype );


