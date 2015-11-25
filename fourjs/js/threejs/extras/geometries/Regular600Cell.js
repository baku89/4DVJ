/**
* @author baku89 https://baku89.com
*/

// 正600胞体を作成

THREE.Regular600Cell = function( radius, segments ) {

	THREE.Geometry4D.call( this );

	frame = new THREE.Regular600CellFrame();

	this.__buildGeometryFromFrame( frame, segments, segments );
}

THREE.Regular600Cell.prototype = Object.create( THREE.Geometry4D.prototype );


THREE.Regular120Cell = function( radius, segments ) {

	THREE.Geometry4D.call( this );

	// 600胞体の双対を求める
	//frame600 = new THREE.Regular600CellFrame();

	frame = new THREE.Frame4D();

	var T = Math.sqrt();

	frame.v.push( [ 1, T, 0 ] );
	frame.v.push( [ 1,-T, 0 ] );
	frame.v.push( [-1, T, 0 ] );
	frame.v.push( [-1,-T, 0 ] );

	frame.v.push( [ 0, 1, T ] );
	frame.v.push( [ 0, 1,-T ] );
	frame.v.push( [ 0,-1, T ] );
	frame.v.push( [ 0,-1,-T ] );

	frame.v.push( [ T, 0, 1 ] );
	frame.v.push( [-T, 0, 1 ] );
	frame.v.push( [ T, 0,-1 ] );
	frame.v.push( [-T, 0,-1 ] );

	console.log( '----------' );

	var frame120 = frame.generateFaces();

	console.log( 'vertices=', frame120.v.length );
	console.log( 'faces=', frame120.f.length );
	console.log( 'cells=', frame120.c.length );

	this.__buildGeometryFromFrame( frame120, radius, segments );
}

THREE.Regular120Cell.prototype = Object.create( THREE.Geometry4D.prototype );