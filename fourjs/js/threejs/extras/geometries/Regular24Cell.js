THREE.Regular24Cell = function( radius, segments ) {

	THREE.Geometry4D.call( this );

	var scope = this;

	this.radius = radius || 1;
	this.segments = segments || 1;

	// 分割数1の単位形を生成
	var vs = []; // 頂点
	var fs = []; // 面 ( length = 4 )
	var tetra, cmb, nv, fo;

	var products = Combinatorics.baseN( [+1, -1], 4);

	while ( p = products.next() ) {

		vo = vs.length;

		tetra = [ [p[0],   0,   0,   0 ],
				  [   0,p[1],   0,   0 ],
				  [   0,   0,p[2],   0 ],
				  [   0,   0,   0,p[3] ] ];

		// 正四面体に対応するする正八面体を追加
		cmb = Combinatorics.combination( [0, 1, 2, 3], 2);

		while ( c = cmb.next() ) {

			va = tetra[ c[0] ];
			vb = tetra[ c[1] ];
			nv = [];

			for ( i = 0; i < 4; i++ ) {

				nv.push( (va[i] + vb[i]) / 2 );
			}

			vs.push( nv );
		}

		// ポリゴンを追加
		fs.push( [  vo, vo+1, vo+2], [  vo, vo+3, vo+4],
				 [vo+1, vo+3, vo+5], [vo+2, vo+4, vo+5],
        		 [  vo, vo+1, vo+3], [  vo, vo+2, vo+4],
        		 [vo+1, vo+2, vo+5], [vo+3, vo+4, vo+5] );
	}

	// 生成
	this.__buildGeometry(vs, fs, null, this.radius, this.segments);
}

THREE.Regular24Cell.prototype = Object.create( THREE.Geometry4D.prototype );