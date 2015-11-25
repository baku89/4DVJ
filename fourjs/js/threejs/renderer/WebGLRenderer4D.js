/**
 * @author baku89 http://baku89.com
 */

 THREE.WebGLRenderer4D = function( parameters ) {

 	console.log( 'THREE.WebGLRenderer4D', THREE.REVISION );

 	// disable console.log temmporary
 	var logFunc = console.log;
 	console.log = function( ) { };

 	THREE.WebGLRenderer.call( this, parameters );

 	// enable console.log
 	console.log = logFunc;

 	// override render()
 	var superRender = this.render;

 	this.render = function( scene, camera, renderTarget, forceClear ) {

 		initObject4D( scene );

 		var geometry, material;

 		_.forEach( scene.__objects4D, function( object ) {

 			material = object.material;
 			geometry = object.geometry;

 			// update uniforms

 			geometry.updateMatrix4D();

 			material.uniforms.matrix4D.value = geometry.matrix4D;
 			material.uniforms.distance.value = geometry.projector.distance;
 			material.uniforms.stereograph.value = geometry.projector.stereograph;

 			// update attributes in geometry
 			if ( geometry.geometryNeedUpdate ) {

 				updateGeometry4D( geometry );
 				geometry.geometryNeedUpdate = false;

 			}

 		} );

 		// call super method
 		superRender.call( this, scene, camera, renderTarget, forceClear );

 		// refresh 4d object list
 		function initObject4D( scene ) {

 			if ( ! scene.__objects4D ) {
 				scene.__objects4D = {}
 			}

	 		for ( i = 0; i < scene.__objectsAdded.length; i++ ) {
	 			if ( scene.__objectsAdded[ i ] instanceof THREE.Mesh4D ) {
	 				scene.__objects4D[ scene.__objectsAdded[ i ].uuid ] = scene.__objectsAdded[ i ];
	 			}
	 		}

	 		for ( i = 0; i < scene.__objectsRemoved.length; i++ ) {
	 			if ( scene.__objectsRemoved[ i ] instanceof THREE.Mesh4D ) {
	 				delete scene.__objects4D[ scene.__objectsRemoved[ i ].uuid ];
	 			}
	 		}
	 	}

	 	// update buffer of vertices, indices, and so on,
	 	function updateGeometry4D( geometry ) {

	 		var i;

	 		var enabledUv = geometry.vertices.length == geometry.uvs.length;

	 		// update positions & uv
	 		var positions  = new Float32Array( geometry.vertices.length * 3 );
	 		var positionsW = new Float32Array( geometry.vertices.length );

	 		if ( enabledUv ) {
	 			var uvs 	   = new Float32Array( geometry.vertices.length * 2 );
	 		}

	 		for ( i = 0; i < geometry.vertices.length; i++ ) {

	 			positions[ i*3 + 0 ] = geometry.vertices[ i ].x;
				positions[ i*3 + 1 ] = geometry.vertices[ i ].y;
				positions[ i*3 + 2 ] = geometry.vertices[ i ].z;
				positionsW[ i ] = geometry.vertices[ i ].w;

				if ( enabledUv ) {
					uvs[ i*2 + 0 ] = geometry.uvs[ i ].x;
					uvs[ i*2 + 1 ] = geometry.uvs[ i ].y;
				}
	 		}

 			geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
 			geometry.addAttribute( 'positionW', new THREE.BufferAttribute( positionsW, 1 ) );

 			if ( enabledUv ) {
 				geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
 			}

 			// update indices and Uvs
 			var indices = new Int16Array( geometry.faces.length * 3 );

 			for ( i = 0; i < geometry.faces.length; i++ ) {

 				indices[ i*3 + 0 ] = geometry.faces[ i ].a;
 				indices[ i*3 + 1 ] = geometry.faces[ i ].b;
 				indices[ i*3 + 2 ] = geometry.faces[ i ].c;
 			}

 			geometry.addAttribute( 'index', new THREE.BufferAttribute( indices, 3 ) );

	 	}

 	}

 }

THREE.WebGLRenderer4D.prototype = Object.create( THREE.WebGLRenderer.prototype );