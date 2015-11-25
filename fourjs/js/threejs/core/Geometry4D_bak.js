/**
* @author baku89 https://baku89.com
*/

// Geometry4D

THREE.Geometry4D = function() {

	THREE.Geometry.call( this );

	this.vertices4 = [];
	this.projectedVertices4 = [];
	this.matrix = mat4.create();
	this.translate = vec4.create();

	// Properties
	this.normalize = true;

	// X-W, Y-W, Z-W方向の回転を加える
	this.quaternion = new THREE.Quaternion( 1, 0, 0, 0 );
	this.euler = new THREE.Euler();
}

THREE.Geometry4D.prototype = Object.create( THREE.Geometry.prototype );


// ! buildGeometry
/*
* 分割数1の頂点, ポリゴン配列を, 細分化してセットする
*/
THREE.Geometry4D.prototype.__buildGeometry = function(vs, fs, scale, segments) {

	var scope = this;

	// this.vertices4に保存
	var i, il, j, jl, face, offset,
		nv, v0, v1, v2, v3,
		eu, ev, u, v, nv, vl,
		fa, fb, fc, fd;

	eu = vec4.create();
	ev = vec4.create();

	for ( i = 0, il = fs.length; i < il; i++ ) {

		face = fs[ i ];
		offset = this.vertices4.length;

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

	this.mergeVertices();

	this.__initVerticesCache();

	return;

	// 三角形を追加	
	function buildTriangle( face ) {

		// ベクトルに変換
		vc = vs[ face[0] ];
		v0 = vec4.fromValues( vc[0], vc[1], vc[2], vc[3] );
		vc = vs[ face[1] ];
		v1 = vec4.fromValues( vc[0], vc[1], vc[2], vc[3] );
		vc = vs[ face[2] ];
		v2 = vec4.fromValues( vc[0], vc[1], vc[2], vc[3] );

		// 各基底?ベクトルを求める
		vec4.sub( eu, v1, v0 );
		vec4.scale( eu, eu, 1 / segments );

		vec4.sub( ev, v2, v0 );
		vec4.scale( ev, ev, 1 / segments );

		// j = eu, evの合計数
		for ( j = 0; j <= segments; j++ ) {

			u = j;

			for ( u = j; u >= 0; u-- ) {

				v = j - u;

				nv = vec4.create();
				vec4.copy( nv, v0 );
				vec4.scaleAndAdd( nv, nv, eu, u );
				vec4.scaleAndAdd( nv, nv, ev, v );
				scope.vertices4.push( nv );

				// ポリゴンを追加
				fa = offset + j * (j+1) / 2 + v;
				fb = fa - 1;
				fc = offset + (j-1) * j / 2 + (v-1);
				fd = fc - 1;
				// ▽タイプ
				if ( v >= 2 ) {
					scope.faces.push( new THREE.Face3(fd, fc, fb) );
				}
				// △タイプ
				if ( v >= 1 ) {
					scope.faces.push( new THREE.Face3(fa, fb, fc) );
				}
			}
		}
	}

	// 四角形を追加
	function buildTetragon( face ) {

		// ベクトルに変換
		v0 = vs[ face[0] ];
		v1 = vs[ face[1] ];
		v2 = vs[ face[2] ];
		v3 = vs[ face[3] ];

		// 各基底ベクトルを求める
		for ( v = 0; v <= segments; v++ ) {
			for ( u = 0; u <= segments; u++ ) {

				// v0-v1, v2-v3の内分点m, nを更に内分
				m = vec4.create();
				vec4.scaleAndAdd( m, m, v0, (segments - v) / segments );
				vec4.scaleAndAdd( m, m, v3, v / segments );

				n = vec4.create();
				vec4.scaleAndAdd( n, n, v1, (segments - v) / segments );
				vec4.scaleAndAdd( n, n, v2, v / segments );

				nv = vec4.create();
				vec4.scaleAndAdd( nv, nv, m, (segments - u) / segments );
				vec4.scaleAndAdd( nv, nv, n, u / segments );

				scope.vertices4.push( nv );

				// ポリゴンを追加
				if ( u < segments && v < segments ) {

					fa = offset + (segments+1) * v + u;
					fb = fa + 1;
					fc = offset + (segments+1) * (v+1) + u;
					fd = fc + 1;

					scope.faces.push( new THREE.Face3(fa, fb, fc) );
					scope.faces.push( new THREE.Face3(fc, fb, fd) );
				}
			}
		}
	}
}

THREE.Geometry4D.prototype.__buildGeometryFromFrame = function( frame, scale, segments ) {

	this.__buildGeometry( frame.v, frame.f, scale, segments );
}

// init vertices, projectedVertices4
THREE.Geometry4D.prototype.__initVerticesCache = function() {

	for ( i = 0, il = this.vertices4.length; i < il; i++ ) {
		this.vertices.push( new THREE.Vector3() );
		this.projectedVertices4.push( vec4.create() );
	}
}

THREE.Geometry4D.prototype.__rotate = function() {

	this.euler.setFromQuaternion( this.quaternion, 'XYZ' );

	//console.log( this.euler );

	// 3つの回転行列を組み合わせる
	var c, s;

	c = Math.cos( this.euler.x );
	s = Math.sin( this.euler.x );
	var Rxw = mat4.create();
	Rxw[ 0 ] = c;
	Rxw[ 3 ] = -s;
	Rxw[ 12] = s;
	Rxw[ 15] = c;

	c = Math.cos( this.euler.y );
	s = Math.sin( this.euler.y );
	var Ryw = mat4.create();
	Ryw[ 5 ] = c;
	Ryw[ 7 ] = -s;
	Ryw[ 13] = s;
	Ryw[ 15] = c;

	c = Math.cos( this.euler.z );
	s = Math.sin( this.euler.z );
	var Rzw = mat4.create();
	Rzw[ 10] = c;
	Rzw[ 11] = -s;
	Rzw[ 14] = s;
	Rzw[ 15] = c;

	// R = RzwRywRxw
	mat4.mul( this.matrix, Ryw, Rxw );
	mat4.mul( this.matrix, Rzw, this.matrix );

	var i, il, pv;
	for ( i = 0, il = this.vertices.length; i < il; i++ ) {

		vec4.transformMat4( this.projectedVertices4[ i ],
							this.vertices4[ i ],
							this.matrix );
	}
}

THREE.Geometry4D.prototype.__normalize = function() {

	var i, il, v;

	for ( i = 0, il = this.vertices.length; i < il; i++ ) {

		v = this.projectedVertices4[ i ];
		vec4.normalize( v, v );
	}
}

/*
* this.vertices4を, w軸上の任意の点から3次元に投影する
*/ 
THREE.Geometry4D.prototype.projection = function( wp ) {

	// apply rotation
	this.__rotate();

	// normalize all vertices
	if ( this.normalize ) {
		this.__normalize();
	}

	// projection
	var i, il, d, A;

	for ( i = 0, il = this.projectedVertices4.length; i < il; i++ ) {

		A = - wp / ( this.projectedVertices4[ i ][ 3 ] - wp );

		this.vertices[ i ].x = A * this.projectedVertices4[ i ][ 0 ]
		this.vertices[ i ].y = A * this.projectedVertices4[ i ][ 1 ];
		this.vertices[ i ].z = A * this.projectedVertices4[ i ][ 2 ];
	}
}

THREE.Geometry4D.prototype.__getHashOfVertex = function( v ) {

	if ( this.precision == undefined ) {
		this.precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
		this.precision = Math.pow( 10, this.precisionPoints );
	}

	return Math.round( v[ 0 ] * this.precision ) + '_' +
		   Math.round( v[ 1 ] * this.precision ) + '_' +
		   Math.round( v[ 2 ] * this.precision ) + '_' +
		   Math.round( v[ 3 ] * this.precision );
}

// ! mergeVertices
/*
 * Checks for duplicate vertices with hashmap.
 * Duplicated vertices are removed
 * and faces' vertices are updated.
 */
THREE.Geometry4D.prototype.mergeVertices = function() {

	//console.log( "vertices=", this.vertices4.length, "faces=", this.faces.length );
 	
 	var verticesMap = {};	// Hashmap for looking up vertice by position coordinates 
 							// (and making sure they are unique)
	var unique = [], changes = [];

	var v, key;
	
	var i,il, face;
	var indices, k, j, jl, u;

	for ( i = 0, il = this.vertices4.length; i < il; i ++ ) {

		key = this.__getHashOfVertex( this.vertices4[ i ] );

		if ( verticesMap[ key ] === undefined ) {

			verticesMap[ key ] = i;
			unique.push( this.vertices4[ i ] );
			changes[ i ] = unique.length - 1;

		} else {

			//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
			changes[ i ] = changes[ verticesMap[ key ] ];

		}

	};


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

		for ( j = 0, jl = this.faceVertexUvs.length; j < jl; j ++ ) {

			this.faceVertexUvs[ j ].splice( idx, 1 );

		}

	}

	// Use unique set of vertices

	var diff = this.vertices4.length - unique.length;
	this.vertices4 = unique;

	//console.log( "vertices=", this.vertices4.length, "faces=", this.faces.length );
	return diff;

}