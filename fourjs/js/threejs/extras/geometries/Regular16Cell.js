THREE.Regular16Cell = function( radius, segments ) {

	THREE.Geometry4D.call( this );

	var scope = this;

	this.radius = radius || 1;
	this.segments = segments || 1;

	// 分割数1の単位形を生成
	var vs = []; // 頂点
	var fs = []; // 面 ( length = 4 )
	var vertexIndices = {};

	// 頂点を追加
	for ( var i = 0; i < 4; i++ ) {

		var nvp = [0, 0, 0, 0], nvm = [0, 0, 0, 0];
		nvp[ i ] = +1;
		nvm[ i ] = -1;

		vs.push( nvp );
		vertexIndices[i + '+'] = vs.length - 1;

		vs.push( nvm );
		vertexIndices[i + '-'] = vs.length - 1;
	}

	// ポリゴンを追加
	var vx, vy, vz, vw;
	var cmb = Combinatorics.baseN(['+', '-'], 4);

	while ( c = cmb.next() ) {

		vx = vertexIndices[ '0' + c[0] ];
		vy = vertexIndices[ '1' + c[1] ];
		vz = vertexIndices[ '2' + c[2] ];
		vw = vertexIndices[ '3' + c[3] ];

		fs.push([ vx, vy, vz ]);
		fs.push([ vx, vy, vw ]);
		fs.push([ vx, vz, vw ]);
		fs.push([ vy, vz, vw ]);
	}

	this.__buildGeometry(vs, fs, null, this.radius, this.segments);
}

THREE.Regular16Cell.prototype = Object.create( THREE.Geometry4D.prototype );