
var scene, camera, renderer, geom, mat, mesh;

(function($){

	var self = this;
	
	var $canvas;

	// resources
	var texture = new THREE.ImageUtils.loadTexture('img/nano.png');

	// threejs
	var gridHelper;

	// constants
	var basisQuat 		= new THREE.Quaternion();

	// rotating view
	var cameraContainer = new THREE.Object3D();

	var isRotatingView = false;

	var cntMousePos  = new THREE.Vector2();
		lastMousePos = new THREE.Vector2();

	var viewDeltaEuler = new THREE.Euler();

	var viewCntQuat      = new THREE.Quaternion(),
		viewDeltaQuat 	 = new THREE.Quaternion(),
		viewInertialQuat = new THREE.Quaternion();

	// rotating 4D
	var objDeltaEuler	= new THREE.Euler();

	var objDeltaQuat	= new THREE.Quaternion(),
		objFrameQuat	= new THREE.Quaternion();

	objFrameQuat.setFromAxisAngle(
			new THREE.Vector3( 1, 0, 0 ),
			Math.PI / 180 / 10
		);

	// stats.js
	var stats;
	
	// ! properties
	this.distance = 1;
	this.segments = 20;
	this.type = '8-cell';
	this.stereograph = true;

	// shader settings
	/*this.color = {
		background: 0xd7dade,
		grid: 		0xf7eded,
		A0: 		0x00932b,
		A1: 		0x000000,
		B0: 		0x5c42d9,
		B1: 		0xff398a
	}
	this.opacity = 0.7;*/
	this.color = {
		background: 0x364196,
		grid: 		0xcd528c,
		A0: 		0x097a10,
		A1: 		0x000000,
		B0: 		0x5b00c3,
		B1: 		0xff0086,
	}
	this.opacity = 1;

	$(function() {

		$canvas = $('#canvas');

		self.init();
	});

	this.init = function(_) {

		self.initStats();
		self.initEvents();

		self.initShader();

		self.initScene();

		self.initGUI();
	}

	// ! init

	this.initStats = function() {
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = 0;
		stats.domElement.style.left = 0;
		$('body').append( stats.domElement );
	}

	this.initEvents = function() {

		$(window).on({
			'resize': self.onResize,
		});

		$canvas.on({
			'mousedown': self.startRotatingView,
			'mousewheel': self.rotate4D
		});
	}

	this.initShader = function() {

		mat = new THREE.ShaderMaterial4D({

			vertexShader: $('#4DVertexShader').html(),
			fragmentShader: $('#4DFragmentShader').html(),

			uniforms: {

				opacity: { type: 'f', value: null },

				// color
				colorA0: { type: 'c', value: new THREE.Color() },
				colorA1: { type: 'c', value: new THREE.Color() },
				colorB0: { type: 'c', value: new THREE.Color() },
				colorB1: { type: 'c', value: new THREE.Color() },

				// texture
				texture: { type: 't', value: texture }
			},

			transparent: true,
			depthTest: false,
			depthWrite: false,

			// blending
			blending: THREE.CustomBlending,
			blendEquation: THREE.AddEquation,
			blendDst: THREE.OneMinusDstColorFactor

		});
	}

	this.initScene = function() {

		// init three.js
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		renderer  = new THREE.WebGLRenderer4D({
			canvas: $canvas[0],
			antialias: false
		});
		renderer.setSize(window.innerWidth, window.innerHeight);

		camera.position.set( 0, 0, 5 );
		camera.lookAt( new THREE.Vector3(0,0,0) );

		cameraContainer.lookAt( new THREE.Vector3( 1, 0.5, 1 ) );
		cameraContainer.add( camera );
		scene.add( cameraContainer );

		var axisHelper = new THREE.AxisHelper( 1 );
		scene.add( axisHelper );

		gridHelper = new THREE.GridHelper(10, 1);
		scene.add( gridHelper );

		self.make();

		// setFPS
		createjs.Ticker.setFPS( 60 );
		createjs.Ticker.addEventListener( 'tick', self.draw );
	}

	this.initGUI = function() {

		var gui = new dat.GUI();
		gui.add( self, 'pause' );

		// color
		var colorFolder = gui.addFolder('color');

		colorFolder.add( self, 'opacity', 0, 1 );

		$.each( self.color, function(key, val) {
			colorFolder.addColor( self.color, key );
		} );

		// camera settings
		var cameraFolder = gui.addFolder('camera settings');
		cameraFolder.add(geom.projector, 'distance', 1, 2 );
		cameraFolder.add(geom.projector, 'stereograph');

		// make
		var makeFolder = gui.addFolder('make');
		makeFolder.add( self, 'segments', 1, 30 ).step( 1 );
		makeFolder.add( self, 'type', ['5-cell', '8-cell', '16-cell', '24-cell', '600-cell', 'clifford torus', 'triangle', 'rectangle'] );
		makeFolder.add( self, 'make' );
		makeFolder.open();
	}

	this.pause = function() {

		createjs.Ticker.setPaused( !createjs.Ticker.getPaused() );
	}

	// ! make
	this.make = function() {

		if ( mesh != undefined ) {

			scene.remove( mesh );
			geom.dispose();
		}

		switch ( self.type ) {
			case '5-cell':
				geom = new THREE.Regular5Cell( 1, Math.round( self.segments * 2 ) );
				break; 
			case '8-cell':
				geom = new THREE.Regular8Cell( 1, self.segments );
				break; 
			case '16-cell':
				geom = new THREE.Regular16Cell( 1, self.segments );
				break;
			case '24-cell':
				geom = new THREE.Regular24Cell( 1, self.segments );
				break;
			case '600-cell':
				geom = new THREE.Regular600Cell( 1, Math.ceil(self.segments / 2) );
				break;
			case 'clifford torus':
				geom = new THREE.CliffordTorus( self.segments * 4 );
				break;
			case 'triangle':
				vs = [ [0, 0, 2, 0], [2, 0, 0, 0], [0, 2, 0, 0] ];
				fs = [ [0, 1, 2] ];
				geom = new THREE.Geometry4D();
				geom.__buildGeometry( vs, fs, null, 1, 10 );
				break;
			case 'rectangle':
				vs = [ [-1, 1, 0, 0], [-1, -1, 0, 1], [1, -1, 0, 0], [1, 1, 0, 1] ];
				fs = [ [0, 1, 2, 3] ];
				geom = new THREE.Geometry4D();
				geom.__buildGeometry( vs, fs, null, 1, 30 );
				break;
		}

		//geom = new THREE.Regular120Cell( );
		mesh = new THREE.Mesh4D(geom, mat);

		scene.add( mesh );
	}

	this.onResize = function() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
	}


	// ! rotate view
	this.startRotatingView = function( e ) {

		$canvas.on({
			'mousemove': self.rotateView,
			'mouseup mouseout': self.endRotatingView
		});

		isRotatingView = true;

		// stop inertiai rotation
		viewInertialQuat.copy( basisQuat );

		// set cache
		lastMousePos.x = cntMousePos.x = e.clientX;
		lastMousePos.y = cntMousePos.y = e.clientY;
	}

	this.rotateView = function( e ) {

		cntMousePos.x = e.clientX;
		cntMousePos.y = e.clientY;

	}

	this.endRotatingView = function() {

		$canvas.off('mousemove mouseup mouseout');

		// calc inertial vel
		viewInertialQuat.copy( basisQuat );
		viewInertialQuat.slerp( viewDeltaQuat, 0.5 );

		isRotatingView = false;
	}

	// ! rotate 4D

	var objRotateSpeed = Math.PI / 10000;

	this.rotate4D = function( e ) {

		//console.log( e.deltaX, e.deltaY );

		objDeltaEuler.set( e.deltaX * objRotateSpeed,
						   e.deltaY * objRotateSpeed,
						   0,
						   'XYZ' );

		objDeltaQuat.setFromEuler( objDeltaEuler );

		geom.projector.quaternion.multiply( objDeltaQuat );

		return false;
	}


	// ! draw   
	this.draw = function() {

		// stats
		stats.update();

		// frame skip
		if ( createjs.Ticker.getPaused() ) {
			return;
		}

		// geom
		geom.projector.quaternion.multiply( objFrameQuat );

		// update camera rotation
		cameraContainer.quaternion.multiply( viewInertialQuat );
		viewInertialQuat.slerp( basisQuat, 0.03 );


		if ( isRotatingView ) {

			// calc Euler by mount of drag length, and convert Quat
			viewDeltaEuler.set( -(cntMousePos.y - lastMousePos.y) / window.innerHeight * Math.PI,
						   		-(cntMousePos.x - lastMousePos.x) / window.innerWidth  * Math.PI,
						   		0,
						   		'XYZ' );
			
			viewDeltaQuat.setFromEuler( viewDeltaEuler );

			// update prev frame cace
			lastMousePos.copy( cntMousePos );

			// rotate camera
			cameraContainer.quaternion.multiply( viewDeltaQuat );
		}

		// set shader uniforms
		mat.uniforms.opacity.value = self.opacity;

		mat.uniforms.colorA0.value.setHex( self.color.A0 );
		mat.uniforms.colorA1.value.setHex( self.color.A1 );
		mat.uniforms.colorB0.value.setHex( self.color.B0 );
		mat.uniforms.colorB1.value.setHex( self.color.B1 );


		// renderer settings
		renderer.setClearColor( self.color.background );

		gridHelper.setColors( self.color.grid, self.color.grid );

		// render
		renderer.render( scene, camera );
	}

})( jQuery );