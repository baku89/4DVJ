/**
* @author baku89 https://baku89.com
*/
/* global THREE, console */

// 正8胞体を作成

THREE.Regular8Cell = function( radius, segments ) {

	THREE.Geometry4D.call( this );

	var scope = this;

	this.radius = radius || 1;
	this.segments = segments || 1;

	// 分割数1の単位形を生成
	var vs = []; // 頂点
	var ss = []; // 辺 ( length = 2 )
	var fs = []; // 面 ( length = 4 )

	var unit = this.radius / 2;

	var i, il, j, jl,
		v1, v2, vl,
		s, ns, sl,
		f, nf, fl;

	generateUnit( 4 );

	// 再帰的に求める
	function generateUnit( dim ) {

		if ( dim == 1 ) {

			vs.push( [ +unit ] );
			vs.push( [ -unit ] );

			ss.push( [0, 1] );

			return;
		}

		generateUnit( dim - 1 );

		// 次元を拡張
		vl = vs.length;
		sl = ss.length;
		fl = fs.length;

		// 頂点を2倍に, 対応する1辺を追加
		for ( i = 0; i < vl; i++ ) {

			v1 = vs[ i ];
			v2 = v1.concat();

			v1.push( +unit );
			v2.push( -unit );

			vs.push( v2 );

			ss.push( [i, vl+i] );
		}

		// 辺を2倍に, 対応する1面を追加
		for ( i = 0; i < sl; i++ ) {

			s = ss[ i ];

			// 前次元の頂点数だけシフトした辺を追加
			ns = [ s[0]+vl, s[1]+vl ];
			ss.push( ns );

			// 1→2→3→4象限の順で面を追加
			nf = [ s[0], s[1], s[1]+vl, s[0]+vl ];
			fs.push( nf );
		}

		// 面を2倍に
		for ( i = 0; i < fl; i++ ) {
			f = fs[ i ];

			// 前次元の頂点数だけシフトした面を追加
			nf = [ f[0]+vl, f[1]+vl, f[2]+vl, f[3]+vl ];
			fs.push( nf );
		}
	}

	// 生成
	this.__buildGeometry(vs, fs, null, this.radius, this.segments);
}

THREE.Regular8Cell.prototype = Object.create( THREE.Geometry4D.prototype );