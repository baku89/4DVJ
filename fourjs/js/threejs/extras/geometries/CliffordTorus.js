/*
* @author baku89 / http://baku89.com
*/


THREE.CliffordTorus = function( segments ) {

	THREE.Geometry4D.call( this );

	this.segments = ( segments == undefined ) ? 20 : segments;

	var step = Math.PI * 2 / this.segments;

	var u, v,
		au, av,
		nv, nf, nuv,
		va, vb, vc, vd;

	var uvScale = 0.3;

	var uv0 = new THREE.Vector2( 0, 0 );
	var uvU = new THREE.Vector2( 1, 0 );
	var uvV = new THREE.Vector2( 0, 1 );

	uvU.divideScalar( segments * uvScale );
	uvV.divideScalar( segments * uvScale );

	var frame = new THREE.Frame4D();

	for ( v = 0; v < this.segments; v++ ) {
		for ( u = 0; u < this.segments; u++ ) {

			// add vertice
			au = step * u;
			av = step * v;

			nv = [ Math.cos( au ), Math.sin( au ),
				   Math.cos( av ), Math.sin( av ) ];

			frame.v.push( nv );

			// add uvs
			nuv = uv0.clone();
			nuv.add( uvU.clone().multiplyScalar( u ) );
			nuv.add( uvV.clone().multiplyScalar( v ) );
			frame.uv.push( nuv );

			// add face
			va = v * this.segments + u;
			vb = v * this.segments + (u+1) % this.segments;
			vc = (v+1) % this.segments * this.segments + u;
			vd = (v+1) % this.segments * this.segments + (u+1) % this.segments;

			frame.f.push([ va, vb, vd, vc ]);
		}
	}

	frame.normalize();

	this.__convertFromFrame( frame );
	//this.__buildGeometryFromFrame( frame, 1, 1, false );
}

THREE.CliffordTorus.prototype = Object.create( THREE.Geometry4D.prototype );