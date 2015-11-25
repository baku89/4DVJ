/**
* @author baku89 https://baku89.com
*/

THREE.Regular600CellFrame = function() {

	THREE.Frame4D.call( this );

	var scope = this;

	var T  = ( 1 + Math.sqrt(5) ) / 2; 	// 黄金比
	var T2 = T * 2;
	var Ti = 1 / T;
	var vo = [0, 0, 0, 0];

	var i, j;

	// ここを参考に
	// http://mixedmoss.com/4dimensionGeometry/600-cells/presentation.pdf

	// 頂点:cap
	var cmb = Combinatorics.baseN( [ -1, +1 ], 4 );

	while ( c = cmb.next() ) {

		this.addVertex( c );
	}

	for ( i = 0; i < 4; i++ ) {
		for ( var sgn = 1; sgn >= -1; sgn -= 2 ) {

			nv = vo.concat();
			nv.splice( i, 1, sgn * 2 );

			this.addVertex( nv );
		}
	}

	// 頂点:base [T, 1, Ti, 0]の偶置換
	perm = Combinatorics.permutation([ 1, 2, 3, 4 ]);
	evenPerm = [];

	while ( p = perm.next() ) {

		if ( (p[3]-p[0]) * (p[3]-p[1]) * (p[3]-p[2]) *
			 (p[2]-p[0]) * (p[2]-p[1]) *
			 (p[1]-p[0]) > 0 ) {

			evenPerm.push([ p[0]-1, p[1]-1, p[2]-1, p[3]-1 ]);
		}
	}

	var coord = [ T, 1, Ti, 0 ];

	var sgns = Combinatorics.baseN( [ -1, +1 ], 3 );

	while ( sgn = sgns.next() ) {

		modCoord = [ coord[0] * sgn[0],
					 coord[1] * sgn[1],
					 coord[2] * sgn[2],
					 coord[3] ];

		for ( i = 0; i < 12; i++ ) {

			ep = evenPerm[ i ];

			nv = [ modCoord[ ep[0] ],
				   modCoord[ ep[1] ],
				   modCoord[ ep[2] ],
				   modCoord[ ep[3] ] ];

			this.addVertex( nv );
		}
	}

	// 正8面体を求め、それをベースに胞を生成する
	var ovs, nov, baseVertices;

	// (0) デバッグ用
	/*ovs = [ [ T, 0, 0,-T ], [-T, 0, 0,-T],
			[ 0, T, 0,-T ], [ 0,-T, 0,-T],
			[ 0, 0, T,-T ], [ 0, 0,-T,-T],
			[ 0, 0, 0,-2 ] ];


	appendFacetsByOctahedron.apply( this, ovs );*/

	
	// (1) 超平面 d[i] = ±T上の正8面体 (8パターン)
	baseVertices = [ [ +T, 0, 0 ], [ -T, 0, 0 ],
					 [  0,+T, 0 ], [  0,-T, 0 ],
					 [  0, 0,+T ], [  0, 0,-T ] ];

	for ( i = 0; i < 4; i += 1) {
		for ( var sgn = +1; sgn >= -1; sgn -= 2 ) {

			// 正8面体の6頂点を求める
			ovs = [];

			for ( j = 0; j < 6; j++ ) {

				nov = baseVertices[ j ].concat();
				nov.splice( i, 0, sgn * T );
				ovs.push( nov );
			}

			// capを求める
			var cap = vo.concat();
			cap[ i ] = sgn * 2;
			ovs.push( cap );

			// 交換(内分の向きを変える)
			if ( i % 2 == 0 ) {
				var cache = [ ovs[0], ovs[1] ];

				ovs[0] = ovs[2];
				ovs[1] = ovs[3];

				ovs[2] = cache[0];
				ovs[3] = cache[1];
			}

			appendFacetsByOctahedron.apply( this, ovs );
		}
	}

	// (2) 超平面  ± x ± y ± z ± w = 2T 上の正8面体 ( 16パターン )
	// x + y + z + w = 2T で出来る正20面体の各符号を反転させる
	var signatures = Combinatorics.baseN( [ +1, -1 ], 4 );

	// 8面体 + キャップ
	baseVertices = [ [ T, 0, T, 0 ], [ 0, T, 0, T ],
		    		 [ T, T, 0, 0 ], [ 0, 0, T, T ],
		    		 [ T, 0, 0, T ], [ 0, T, T, 0 ],
		    		 [ 1, 1, 1, 1 ] ];

	while ( sgn = signatures.next() ) {

		ovs = [];

		// 軸にそって反転
		for ( i = 0; i < 7; i++ ) {

			ovs.push( [ sgn[ 0 ] * baseVertices[ i ][ 0 ],
						sgn[ 1 ] * baseVertices[ i ][ 1 ],
						sgn[ 2 ] * baseVertices[ i ][ 2 ],
						sgn[ 3 ] * baseVertices[ i ][ 3 ] ] );
		}

		appendFacetsByOctahedron.apply( this, ovs );
	}
	// 正規化

	this.normalize();

	console.log( 'vertex length=', this.v.length );
	console.log( 'face length=', this.f.length );
	console.log( 'cell length=', this.c.length );
	
	return;

	// 正八面体とCapを元に、内接する正二十面体とcapとを結ぶ正4面体胞を追加
	function appendFacetsByOctahedron( xp, xm, yp, ym, zp, zm, cap ) {

		var i;

		var vArray = [],
			fArray = [],
			cArray = [];

		// Type1: 正20面体の各面+capで出来る四面体を追加

		vArray  = [ divT( yp, xp ), // 20 cap
					divT( zp, yp ), // 20 base upper 
					divT( xp, zp ),
					divT( xp, zm ),
					divT( zm, yp ),
					divT( yp, xm ),
					divT( zp, ym ), // 20 base lower
					divT( ym, xp ),
					divT( zm, ym ),
					divT( xm, zm ),
					divT( xm, zp ), 
					divT( ym, xm ), // 20 cap
					cap ];

		var viCap = 12;	// キャップのindex

		// 正20面体の各面
		var base20Faces  = [ [ 0, 1, 2], [ 0, 2, 3], [ 0, 3, 4], [ 0, 4, 5], [ 0, 5, 1],
				 			 [ 1, 6, 2], [ 2, 7, 3], [ 3, 8, 4], [ 4, 9, 5], [ 5,10, 1],
							 [ 6, 7, 2], [ 7, 8, 3], [ 8, 9, 4], [ 9,10, 5], [10, 6, 1],
							 [11, 7, 6], [11, 8, 7], [11, 9, 8], [11,10, 9], [11, 6,10] ];

		for ( i = 0; i < base20Faces.length; i++ ) {

			vi0 = base20Faces[ i ][ 0 ];
			vi1 = base20Faces[ i ][ 1 ];
			vi2 = base20Faces[ i ][ 2 ];

			fArray.push( [vi0, vi1, vi2   ],
					  	 [vi0, vi1, viCap ],
					 	 [vi1, vi2, viCap ],
						 [vi2, vi0, viCap ] );

			cArray.push([ vi0, vi1, vi2, viCap ]);
		}

		// Type2-1: V*3 + V'*1
		
		var type21BaseFaces = [ 1, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 18 ];
		var type21NewCaps =   [];

		// 全頂点を検索し、新しいキャップの座標をnvsに追加
		for ( i = 0; i < type21BaseFaces.length; i++ ) {

			baseFace = base20Faces[ type21BaseFaces[ i ] ];

			// 底面の座標
			vBase0 = vArray[ baseFace[0] ];
			vBase1 = vArray[ baseFace[1] ];
			vBase2 = vArray[ baseFace[2] ];

			distance = getDistance( vBase0, vBase1 );

			for ( newCapIndex = 0; newCapIndex < this.v.length; newCapIndex++ ) {

				if ( isSameDistance( distance, vBase0, this.v[ newCapIndex ] ) &&
					 isSameDistance( distance, vBase1, this.v[ newCapIndex ] ) &&
					 isSameDistance( distance, vBase2, this.v[ newCapIndex ] ) &&
					 !isSameDistance( 0, cap, this.v[ newCapIndex ] ) ) {

					break;
				}
			}

			// nvsに追加
			type21NewCaps[ i ] = vArray.push( this.v[ newCapIndex ] ) - 1;

			fArray.push( [ baseFace[0], baseFace[1], type21NewCaps[i] ],
						 [ baseFace[1], baseFace[2], type21NewCaps[i] ],
						 [ baseFace[2], baseFace[0], type21NewCaps[i] ] );

			cArray.push([ baseFace[0], baseFace[1], baseFace[2], type21NewCaps[i] ]);
		}

		// Type2-2: ( V*3 ) * 4
		// 正20面体から2点、Type2-1で生成した新しい頂点から2点を持ってきて新しい胞を作る
		// X+ X- Y+ Y- Z+ Z-の順で。

		type22Cells = [
			{ v20: [ 2, 3 ], v21Cap: [ 0, 4 ] },
			{ v20: [ 9,10 ], v21Cap: [ 7,11 ] },
			{ v20: [ 0, 5 ], v21Cap: [ 1, 2 ] },
			{ v20: [ 7,11 ], v21Cap: [ 9,10 ] },
			{ v20: [ 1, 6 ], v21Cap: [ 3, 8 ] },
			{ v20: [ 4, 8 ], v21Cap: [ 5, 6 ] }
		];

		for ( i = 0; i < type22Cells.length; i++ ) {

			nc = type22Cells[ i ];

			v21Cap = [ type21NewCaps[ nc.v21Cap[0] ],
					   type21NewCaps[ nc.v21Cap[1] ] ];

			fArray.push( [ nc.v20[0], v21Cap[0], v21Cap[1] ],
						 [ nc.v20[1], v21Cap[0], v21Cap[1] ] );

			cArray.push( [ nc.v20[0], nc.v20[1], v21Cap[0], v21Cap[1] ] );
		}

		// nvs, nfs, ncsを追加
		scope.addGeometryArray( vArray, fArray, cArray );
	}

	// AB間の距離がdistanceと等しいか
	function isSameDistance(  distance, a, b ) {

		if ( this.precision == undefined ) {
			this.precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
			this.precision = Math.pow( 10, this.precisionPoints );

			this.count = 0;
		}
		//console.log(this.count++);

		return Math.abs(getDistance( a, b ) - distance) * this.precision < 1;
	}

	// 距離を求める
	function getDistance( a, b ) {

		return Math.sqrt( Math.pow( a[0]-b[0], 2) +
						  Math.pow( a[1]-b[1], 2) + 
						  Math.pow( a[2]-b[2], 2) + 
						  Math.pow( a[3]-b[3], 2) );
	}

	// ab間を1:Tで内分
	function divT( a, b ) {

		var as = T / (T+1),
			bs = 1 / (T+1),
			p = [];

		p[0] = a[0]*as + b[0]*bs;
		p[1] = a[1]*as + b[1]*bs;
		p[2] = a[2]*as + b[2]*bs;
		p[3] = a[3]*as + b[3]*bs;

		return p;
	}

}

THREE.Regular600CellFrame.prototype = Object.create( THREE.Frame4D.prototype );