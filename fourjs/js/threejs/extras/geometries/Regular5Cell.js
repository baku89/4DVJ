/**
* @author baku89 https://baku89.com
*/
/* global THREE, console */

// 正5胞体を作成

THREE.Regular5Cell = function( radius, segments ) {

	THREE.Geometry4D.call( this );

	var scope = this;

	this.radius = radius || 1;
	this.segments = segments || 1;

	// 分割数1の単位形を生成
	var vs = []; // 頂点
	var fs = []; // 面 ( length = 4 )

	// 再帰的に求める
	generateUnit( 4 );

	/* 
	* 辺の長さ2のn次元正単体の重心から、facetの重心までの距離をdnと置くと
	* 次の漸化式で表される
	* 
	* d1 = 1
	* dn = √( 4 - ((n-1) * d[n-1])^2 ) / (n+1)
	*
	* generateUnit( n )は、dnを返す
	*/
	function generateUnit( n ) { 

		if ( n == 1 ) {

			vs.push( [+1], [-1] );

			return 1; // d1 = 1
		}

		var dp = generateUnit( n-1 ); // dp = d(n-1)

		var dn = Math.sqrt( 4 - Math.pow( (n-1)*dp, 2 ) ) / ( n+1 );

		// 現在の頂点を-d[n]軸方向にdn並行移動
		// 同時に新しい頂点を追加
		// コンビネーション用範囲も作成
		var nv = [];
		var range = [];

		for ( i = 0; i < vs.length; i++ ) {

			vs[ i ].push( -dn );
			nv.push( 0 );
			range.push( i );
		}
		nv[ n-1 ] = dn * n;
		vs.push( nv );

		// 新しい頂点に接するポリゴンを追加
		var cmb = Combinatorics.combination( range, 2 );


		while ( c = cmb.next() ) {

			fs.push([ c[0], c[1], n ]);
		}

		return dn;
	}

	// 半径を正規化
	var scale = 1 / Math.sqrt( vs[0][0]*vs[0][0] +
							   vs[0][1]*vs[0][1] +
						       vs[0][2]*vs[0][2] +
							   vs[0][3]*vs[0][3] );
	for ( i = 0; i < vs.length; i++ ) {

		vs[ i ][ 0 ] *= scale;
		vs[ i ][ 1 ] *= scale;
		vs[ i ][ 2 ] *= scale;
		vs[ i ][ 3 ] *= scale;
	}

	// 生成
	this.__buildGeometry(vs, fs, null, this.radius, this.segments);

	//this.__buildGeometry([[0,0,0,0],[1,0,0,0],[0,1,0,0]], [[0,1,2]], 1, 10);
}

THREE.Regular5Cell.prototype = Object.create( THREE.Geometry4D.prototype );