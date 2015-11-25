/**
* @author baku89 https://baku89.com
*/

// Geometry4D

THREE.Face3.prototype.toString = function() {

	return '[' + this.a + ', ' + this.b + ', ' + this.c + ']'; 
}

THREE.Geometry4D = function() {

	THREE.BufferGeometry.call( this );

	this.matrix4D = THREE.Matrix4();
	this.translate = THREE.Vector4();

	// about geometry
	this.vertices = [];
	this.faces = [];
	this.uvs = [];

	// for shader
	this.matrix4D = new THREE.Matrix4();

	// projector 4D -> 3D
	this.projector = {

		distance: 1,
		stereograph: true,
		translate: new THREE.Vector4(),
		quaternion: new THREE.Quaternion(),

	};

	this.geometryNeedUpdate = false;
}

THREE.Geometry4D.prototype = Object.create( THREE.BufferGeometry.prototype );


// ! buildGeometry
/*
* 分割数1の頂点, ポリゴン配列を, 細分化してセットする
*/
THREE.Geometry4D.prototype.__buildGeometry = function(vs, fs, uvs, scale, segments, mergeVertices ) {

	var scope = this;

	// this.verticesに保存
	var i, il, j, jl, face, offset,
		u, v, vl,
		fa, fb, fc, fd;

	var eu = new THREE.Vector4(),
		ev = new THREE.Vector4();

	var nv = new THREE.Vector4(),
		v0 = new THREE.Vector4(),
		v1 = new THREE.Vector4(),
		v2 = new THREE.Vector4(),
		v3 = new THREE.Vector4();

	var nuv = new THREE.Vector2(),
		uv0 = new THREE.Vector2(),
		uvU = new THREE.Vector2(),
		uvV = new THREE.Vector2();

	var m = new THREE.Vector4(),
		n = new THREE.Vector4();

	var needGenerateUv = ! uvs;

	if ( !needGenerateUv ) {
		this.uvs = uvs;
	}

	for ( i = 0, il = fs.length; i < il; i++ ) {

		face = fs[ i ];
		offset = this.vertices.length;

		switch ( face.length ) { 

			case 3: // 3角ポリゴンの時

				buildTriangle( face );
				break;

			case 4: // 4角ポリゴンの時

				buildTetragon( face );
				break;

			case 5: // 5角ポリゴンの時

				buildTetragon([ face[0], face[1], face[2], face[3] ]);
				buildTriangle([ face[3], face[4], face[0] ]);
				break;

			default:

				console.log( 'Geometry4D.__buildGeometry: invalid number of vertices' );
				break;
		}
	}

	if ( mergeVertices ) {
		this.mergeVertices();
	}

	this.geometryNeedUpdate = true;

	return;

	// add triangle polygon
	function buildTriangle( face ) {

		// convert to THREE.Vector4
		v0.fromArray( vs[ face[0] ] );
		v1.fromArray( vs[ face[1] ] );
		v2.fromArray( vs[ face[2] ] );

		// calc basis vectors
		ev.subVectors( v1, v0 );
		ev.divideScalar( segments );

		eu.subVectors( v2, v0 );
		eu.divideScalar( segments );

		if ( needGenerateUv ) {
			uv0.set( 0.5, 0 );
			uvV = (new THREE.Vector2( -0.5, 1 )).divideScalar( segments );
			uvU = (new THREE.Vector2(  0.5, 1 )).divideScalar( segments );
		}

		// j = sum of eu, ev
		for ( j = 0; j <= segments; j++ ) {

			v = j;

			for ( v = j; v >= 0; v-- ) {

				u = j - v;

				// add new vertex
				nv = v0.clone();
				nv.add( ev.clone().multiplyScalar( v ) );
				nv.add( eu.clone().multiplyScalar( u ) );
				scope.vertices.push( nv );

				// add new vertex uv
				if ( needGenerateUv ) {
					nuv = uv0.clone();
					nuv.add( uvV.clone().multiplyScalar( v ) );
					nuv.add( uvU.clone().multiplyScalar( u ) );
					scope.uvs.push( nuv );
				}

				// add new polygon
				if ( j < segments ) {

					fa = offset + j * (j+1) / 2 + u;
					fb = fa + 1;
					fc = offset + (j+1) * (j+2) / 2 + u;
					fd = fc + 1;

					// type '△'
					scope.faces.push( new THREE.Face3( fa, fc, fd ) );

					// type '▽'
					if ( v > 0 ) {
						scope.faces.push( new THREE.Face3( fd, fb, fa ) );
					}
				}
			}
		}
	}

	// add tetragon by two polygons
	function buildTetragon( face ) {

		// convert to THREE.Vector4
		v0.fromArray( vs[ face[0] ] );
		v1.fromArray( vs[ face[1] ] );
		v2.fromArray( vs[ face[2] ] );
		v3.fromArray( vs[ face[3] ] );

		if ( needGenerateUv ) {
			// calc uv basis
			uvV = (new THREE.Vector2( 0, 1 )).divideScalar( segments );
			uvU = (new THREE.Vector2( 1, 0 )).divideScalar( segments );
		}

		for ( v = 0; v <= segments; v++ ) {
			for ( u = 0; u <= segments; u++ ) {

				// calc internal division points of m: v0-v1, n: v3-v2, then nv: m-n
				m.copy( v0 );
				m.lerp( v1, v / segments );

				n.copy( v3 );
				n.lerp( v2, v / segments );

				nv = m.clone();
				nv.lerp( n, u / segments );

				scope.vertices.push( nv );

				if ( needGenerateUv ) {
					// add new vertex uv
					nuv = new THREE.Vector2();
					nuv.add( uvV.clone().multiplyScalar( v ) );
					nuv.add( uvU.clone().multiplyScalar( u ) );
					scope.uvs.push( nuv );
				}

				// add polygon
				if ( u < segments && v < segments ) {

					fa = offset + (segments+1) * v + u;
					fb = fa + 1;
					fc = fa + (segments+1);
					fd = fc + 1;

					scope.faces.push( new THREE.Face3( fa, fc, fd ) );
					scope.faces.push( new THREE.Face3( fd, fb, fa ) );
				}
			}
		}
	}
}

THREE.Geometry4D.prototype.__buildGeometryFromFrame = function( frame, scale, segments, mergeVertices ) {

	uvs = null;

	if ( frame.uv.length == frame.v.length ) {
		uvs = frame.uv;
	}

	this.__buildGeometry( frame.v, frame.f, uvs, scale, segments, mergeVertices );
}

THREE.Geometry4D.prototype.__convertFromFrame = function( frame ) {

	var i, vertex, face, uv;

	for ( i = 0; i < frame.v.length; i++ ) {

		vertex = new THREE.Vector4( frame.v[ i ][ 0 ], frame.v[ i ][ 1 ], frame.v[ i ][ 2 ], frame.v[ i ][ 3 ] );
		this.vertices.push( vertex );

		if ( frame.uv[ i ] !== undefined ) {

			this.uvs.push( frame.uv[ i ] );
		}
	}

	for ( i = 0; i < frame.f.length; i++ ) {

		switch ( frame.f[ i ].length ) {

			case 3:
				this.faces.push( new THREE.Face3(
					frame.f[ i ][ 0 ], 
					frame.f[ i ][ 1 ], 
					frame.f[ i ][ 2 ]
				));
				break;

			case 4:
				this.faces.push( new THREE.Face3(
					frame.f[ i ][ 0 ], 
					frame.f[ i ][ 1 ], 
					frame.f[ i ][ 2 ]
				));
				this.faces.push( new THREE.Face3(
					frame.f[ i ][ 2 ], 
					frame.f[ i ][ 3 ], 
					frame.f[ i ][ 0 ]
				));
				break;

		}
	}

	this.geometryNeedUpdate = true;

}

THREE.Geometry4D.prototype.updateMatrix4D = function( wp ) {

	// calc D-W rotation matrix
	var euler = new THREE.Euler();
	euler.setFromQuaternion( this.projector.quaternion, 'XYZ' );

	var c, s;

	c = Math.cos( euler.x );
	s = Math.sin( euler.x );
	var Rxw = new THREE.Matrix4(
		c, 0, 0,-s,
		0, 1, 0, 0,
		0, 0, 1, 0,
		s, 0, 0, c
	);

	c = Math.cos( euler.y );
	s = Math.sin( euler.y );
	var Ryw = new THREE.Matrix4(
		1, 0, 0, 0,
		0, c, 0,-s,
		0, 0, 1, 0,
		0, s, 0, c
	);

	c = Math.cos( euler.z );
	s = Math.sin( euler.z );
	var Rzw = new THREE.Matrix4(
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, c,-s,
		0, 0, s, c
	);

	this.matrix4D.multiplyMatrices( Ryw, Rxw );
	this.matrix4D.multiplyMatrices( Rzw, this.matrix4D );
}


THREE.Geometry4D.prototype.__getHashOfVertex = function( v ) {

	if ( this.precision == undefined ) {
		this.precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
		this.precision = Math.pow( 10, this.precisionPoints );
	}

	return Math.round( v.x * this.precision ) + '_' +
		   Math.round( v.y * this.precision ) + '_' +
		   Math.round( v.z * this.precision ) + '_' +
		   Math.round( v.w * this.precision );
}

// ! mergeVertices
/*
 * Checks for duplicate vertices with hashmap.
 * Duplicated vertices are removed
 * and faces' vertices are updated.
 */
THREE.Geometry4D.prototype.mergeVertices = function() {

	//console.log( "vertices=", this.vertices.length, "faces=", this.faces.length );
 	
 	var verticesMap = {};	// Hashmap for looking up vertice by position coordinates 
 							// (and making sure they are unique)
	var unique = [], changes = [];

	var v, key;
	
	var i,il, face;
	var indices, k, j, jl, u;

	for ( i = 0, il = this.vertices.length; i < il; i ++ ) {

		key = this.__getHashOfVertex( this.vertices[ i ] );

		if ( verticesMap[ key ] === undefined ) {

			verticesMap[ key ] = i;
			unique.push( this.vertices[ i ] );
			changes[ i ] = unique.length - 1;

		} else {

			//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
			changes[ i ] = changes[ verticesMap[ key ] ];

		}
	}

	// if faces are completely degenerate after merging vertices, we
	// have to remove them from the geometry.
	var faceIndicesToRemove = [];

	for ( i = 0, il = this.faces.length; i < il; i ++ ) {

		face = this.faces[ i ];

		face.a = changes[ face.a ];
		face.b = changes[ face.b ];
		face.c = changes[ face.c ];

		indices = [ face.a, face.b, face.c ];

		var dupIndex = - 1;

		// if any duplicate vertices are found in a Face3
		// we have to remove the face as nothing can be saved
		for ( var n = 0; n < 3; n ++ ) {
			if ( indices[ n ] == indices[ ( n + 1 ) % 3 ] ) {

				dupIndex = n;
				faceIndicesToRemove.push( i );
				break;

			}
		}

	}

	for ( i = faceIndicesToRemove.length - 1; i >= 0; i -- ) {
		var idx = faceIndicesToRemove[ i ];

		this.faces.splice( idx, 1 );
	}

	// Use unique set of vertices

	var diff = this.vertices.length - unique.length;
	this.vertices = unique;

	//console.log( "vertices=", this.vertices.length, "faces=", this.faces.length );
	return diff;

}