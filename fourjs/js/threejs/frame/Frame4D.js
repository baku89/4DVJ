/**
* @author baku89 https://baku89.com
*/

// 超球に内接する多胞体の, 頂点, 面, 胞の繋がり

THREE.Frame4D = function() {

	var scope = this;

	// data
	this.v = [];
	this.f = [];
	this.c = [];
	this.uv = [];

	// inner variables
	this.vMap = {};
	this.fMap = {};
	this.cMap = {};

	this.precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
	this.precision = Math.pow( 10, this.precisionPoints );
}

THREE.Frame4D.prototype = {

	// ハッシュを求める関数
	getHashOfVertex: function( vertex ) {

		return Math.round( vertex[ 0 ] * this.precision ) + '_' +
			   Math.round( vertex[ 1 ] * this.precision ) + '_' +
			   Math.round( vertex[ 2 ] * this.precision ) + '_' +
			   Math.round( vertex[ 3 ] * this.precision );
	},

	getHashOfFace: function( face ) {

		face.sort( this.sortFunc );

		var hash = '';

		for ( var i = 0; i < face.length; i++ ) {

			hash += face[ i ] + '_';
		}

		return hash;
	},

	getHashOfCell: function( cell ) {

		cell.sort( this.sortFunc );

		var hash = '';

		for ( var i = 0; i < cell.length; i++ ) {

			hash += cell[ i ] + '_';
		}

		return hash;
	},

	sortFunc: function( a, b ) {

		if ( a < b ) return -1;
		if ( a > b ) return 1;
		return 0;
	},

	// データの重複無く追加する
	addVertex: function( vertex, uv ) {

		var hash = this.getHashOfVertex( vertex ),
			index = this.vMap[ hash ];

		if ( index == undefined ) {
			
			this.vMap[ hash ] = this.v.push( vertex ) - 1;

			if ( !uv ) this.uv.push( uv );

			return this.vMap[ hash ]; 

		} else {

			return index;
		}
	},

	addFace: function( face ) {

		var hash = this.getHashOfFace( face ),
			index = this.fMap[ hash ];

		if ( index == undefined ) { 

			this.fMap[ hash ] = this.f.push( face ) - 1;

			return this.fMap[ hash ];

		} else {

			return index;
		}
	},

	addCell: function( cell ) {

		var hash = this.getHashOfCell( cell ),
			index = this.cMap[ hash ];

		if ( index == undefined ) { 

			this.cMap[ hash ] = this.c.push( cell ) - 1;

			return this.cMap[ hash ];

		} else {

			return index;
		}
	},

	addGeometryArray: function( vArray, fArray, cArray ) {

		var changes = {}, newFace, newCell, i;

		for ( i = 0; i < vArray.length; i++ ) {

			changes[ i ] = this.addVertex( vArray[ i ] );
		}

		for ( i = 0; i < fArray.length; i++ ) {

			newFace = fArray[ i ];

			this.addFace( [ changes[ newFace[0] ],
					 	    changes[ newFace[1] ],
					 	    changes[ newFace[2] ] ] );
		}

		for ( i = 0; i < cArray.length; i++ ) {

			newCell = cArray[ i ];

			this.addCell( [ changes[ newCell[0] ],
					   		changes[ newCell[1] ],
					   		changes[ newCell[2] ] ,
					   		changes[ newCell[3] ] ] );
		}
	},

	// 超球に内接するよう正規化する, 必ず呼び出す
	normalize: function() {

		for ( var i = 0; i < this.v.length; i++ ) {

			var v = this.v[ i ];
			var length = Math.sqrt( v[0]*v[0] + v[1]*v[1] + v[2]*v[2] + v[3]*v[3] );

			v[0] /= length;
			v[1] /= length;
			v[2] /= length;
			v[3] /= length;
		}
	},

	// 頂点と胞から面を算出する
	generateFaces: function() {

		var i, j, d;
		var cell;
		var center;
		var dot;
		var angle;
		var v, v0, v1, v2, v3;
		var vertices;

		var normalGlobal = [0, 0, 0, 1]; // 最終的に合わせる法線
		var normalDim;	// 平面に投影した後の法線

		for ( i = 0; i < this.c.length; i++ ) {

			cell = this.c[ i ];

			// 胞の頂点を配列に
			vertices = [];
			for ( j = 0; j < cell.length; j++ ) {
				vertices.push( this.v[ cell[j] ] );
			}

			// (1) 中心点を原点に移動する
			center = this.getCenterOfCell( i );

			for ( j = 0; j < vertices.length; j++ ) {

				vec4.sub( vertices[i], vertices[i], center );
			}

			// (2) 回転させて、XYZ超平面に胞が並行になるようにする

			// XW, YW, ZW平面に投影し、順に法線をW+方面に合わせていく
			for ( d = 0; d < 3; d++ ) {

				console.log( ['X','Y','Z'][d] + 'W Plane --------' );

				// 法線を取得し, 平面に投影
				normalDim = getNormal( vertices[0], vertices[1], vertices[3], vertices[4] );
				for ( j = 0; j < 3; j++ ) {

					if ( j != d ) normalDim[j] = 0;
				}
				vec4.normalize( normalDim, normalDim );

				console.log('normalDim = ', normalDim );

				// 投影した法線とグローバル法線とのなす角度を求める
				dot = vec4.dot( normalGlobal, normalDim );
				angle = Math.acos( dot );
				if ( normalDim[ d ] < 0 ) {
					angle *= -1;
				}

				console.log('angle = ', angle / Math.PI * 180);

				// 頂点を回転
				var s = Math.sin( angle );
				var c = Math.cos( angle );

				console.log( s, c );

				for ( j = 0; j < vertices.length; j++ ) {

					v = vertices[ j ].concat();

					vertices[ j ][ d ] = v[ d ] * c + v[ 3 ] * -s;
					vertices[ j ][ 3 ] = v[ d ] * s + v[ 3 ] * c;
				}
			}

			// W=0に投影
			for ( j = 0; j < vertices.length; j++ ) {

				vertices[ j ] = vec3.fromValues( vertices[ j ][ 0 ],
												 vertices[ j ][ 1 ],
												 vertices[ j ][ 2 ] );
			}

			switch ( vertices.length ) {

				case 20:

					getConvexHull12( vertices );
					break;

				default:

					console.log( 'invalid number of vertices' );
					break;
			}

			console.log( vertices );

		}

		// 4点より法線を求める
		// https://ef.gy/linear-algebra:normal-vectors-in-higher-dimensional-spaces
		function getNormal( v0, v1 ,v2 ,v3 ) {

			var a = vec4.fromValues( v1[0]-v0[0], v1[1]-v0[1], v1[2]-v0[2], v1[3]-v0[3] );
			var b = vec4.fromValues( v2[0]-v0[0], v2[1]-v0[1], v2[2]-v0[2], v2[3]-v0[3] );
			var c = vec4.fromValues( v3[0]-v0[0], v3[1]-v0[1], v3[2]-v0[2], v3[3]-v0[3] );

			var h = vec4.create();

			var m;

			h[0] = mat3.determinant([
				a[1], b[1], c[1],
				a[2], b[2], c[2],
				a[3], b[3], c[3]
			]);

			h[1] = mat3.determinant([
				a[0], b[0], c[0],
				a[2], b[2], c[2],
				a[3], b[3], c[3] 
			]);

			h[2] = mat3.determinant([
				a[0], b[0], c[0],
				a[1], b[1], c[1],
				a[3], b[3], c[3] 
			]);

			h[3] = mat3.determinant([
				a[0], b[0], c[0],
				a[1], b[1], c[1],
				a[2], b[2], c[2] 
			]);

			return h;
		}

		// 原点を中心とする正12面体の面を求める
		function getConvexHull12( vertices ) {

			var i, v;
			var axis, dot, rad, q;

			// 辺となる2組を求める
			var distance, edgeLen, edgeIdx;

			distance = vec3.distance( vertices[ 1 ], vertices[ 0 ] );
			edgeLen = distance;
			edgeIdx = 1;

			for ( i = 2; i < vertices.length; i++ ) {

				distance = vec3.distance( vertices[ i ], vertices[ 0 ] );

				if ( distance < edgeMin ) {

					edgeMin = distance;
					edgeIdx = i;
				}
			}

			// 2辺の中点を求める
			var mid = vec3.create();
			vec3.lerp( mid, vertices[ edgeIdx ], vertices[ 0 ] );
			vertices.push( mid );

			// 中点がX+方向に合うように多面体全体を回転させる
			var xp = vec3.fromValues( 1, 0, 0 )

			axis = vec3.create();	 			// 正規化された回転軸を求める
			vec3.cross( axis, mid, xp );
			vec3.normalize( axis );

			dot = vec3.dot( axis, xp );			// 回転角度を求める
			rad = Math.acos( dot );
					
			quat.setAxisAngle( q, axis, rad ); 	// クォータニオンを用いて回転

			for ( i = 0; i < vertices.length; i++ ) {

				v = vertices[ i ];
				vec3.transformQuat( v, v, q );
			}

			// vertices[ 0 ]が、Y+方向と並行になるようにセットする
			var dir = vec3.create();
			var yp = vec3.create( 0, 1, 0 );

			vec3.sub( dir, vertices[ 0 ], vertices[ vertices.length-1 ] );

			vec3.cross( axis, dir, yp );		// 正規化された回転軸を求める
			vec3.normalize( axis );

			dot = vec3.dot( dir, yp );			// 回転角度を求める
			rad = Math.acos( dot );

			quat.setAxisAngle( q, axis, rad ); 	// クォータニオンを用いて回転

			for ( i = 0; i < vertices.length; i++ ) {

				v = vertices[ i ];
				vec3.transformQuat( v, v, q );
			}

			// 中点を削除
			vertices.splice( vertices.length-1, 1 );

			// verticesを整列する
			

		}
	},

	// 胞の中心を求める
	getCenterOfCell: function( index ) {

		var cell = this.c[ index ];
		var scale = 1 / cell.length;
		var center = vec4.create();

		for ( var i = 0; i < cell.length; i++ ) {

			var v = this.v[ cell[ i ] ];

			for ( d = 0; d < 4; d++ ) {

				center[ d ] += v[ d ] * scale;
			}
		}

		return center;
	},

	// 双対多胞体を作る
	makeDualGeometry4D: function() {

		var i;
		var dual = new THREE.Frame4D();

		// オリジナルの各胞の中心を求め、新しい頂点としてセット

		for ( i = 0; i < this.c.length; i++ ) {

			center = this.getCenterOfCell( i );

			dual.addVertex( center );
		}

		// オリジナルの各頂点を囲む胞のセットを求め、その各中心を結んで新しい胞を作る
		var i, j, newCell;

		for ( i = 0; i < this.v.length; i++ ) {

			newCell = [];

			for ( j = 0; j < this.c.length; j++ ) {

				if ( this.c[ j ].indexOf( i ) != -1 ) {

					newCell.push( j );
				}
			}

			if ( newCell.length > 0 ) {

				dual.addCell( newCell );
			}
		}

		// 面を作る
		dual.generateFaces();

		return dual;

	}
}