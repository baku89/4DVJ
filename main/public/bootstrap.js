/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"1":"app"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _loader = __webpack_require__(1);
	
	var loader = _interopRequireWildcard(_loader);
	
	var _loadingBar = __webpack_require__(3);
	
	var _loadingBar2 = _interopRequireDefault(_loadingBar);
	
	var _Detector = __webpack_require__(5);
	
	var _Detector2 = _interopRequireDefault(_Detector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	window.LoadingBar = _loadingBar2.default;
	
	// Delector
	/* global $ */
	
	if (!_Detector2.default.canvas || !_Detector2.default.webgl || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		// No supported devices
		$('body').attr('data-state', 'unsupported');
	} else {
	
		console.time('load assets');
	
		$.when(loader.loadJSON('graphs', './data/graphs.json'), loader.loadVideo('overlay_flash', './texture/overlay_flash.mp4'), loader.loadVideo('overlay_flicker', './texture/overlay_flicker.mp4'), loader.loadObj('dandruff_small_obj', './data/dandruff_small.obj'), loader.loadObj('dandruff_large_obj', './data/dandruff_large.obj'), loader.loadTexture('dandruff_small_tex', './texture/dandruff_small.png')).then(function () {
			console.timeEnd('load assets');
			__webpack_require__(6);
		});
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.loadJSON = loadJSON;
	exports.loadVideo = loadVideo;
	exports.loadObj = loadObj;
	exports.loadTexture = loadTexture;
	
	__webpack_require__(2);
	
	window.assets = {}; /* global THREE, LoadingBar, $ */
	
	var totalWeight = 0;
	var loadedWeight = 0;
	
	var loaderPercentage = 0.2;
	
	function loadJSON(id, url) {
		totalWeight += 1;
		var d = new $.Deferred();
		$.getJSON(url, function (data) {
			window.assets[id] = data;
			loadedWeight += 1;
			LoadingBar.update(loadedWeight / totalWeight * loaderPercentage);
			d.resolve();
		});
		return d.promise();
	}
	
	function loadVideo(id, url) {
		totalWeight += 1;
		var d = new $.Deferred();
		var video = document.createElement('video');
		video.src = url + '?.jpg';
	
		var checkLoad = function checkLoad() {
			if (video.readyState == 4) {
				window.assets[id] = video;
				loadedWeight += 1;
				LoadingBar.update(loadedWeight / totalWeight * loaderPercentage);
				d.resolve();
			} else {
				setTimeout(checkLoad, 100);
			}
		};
		setTimeout(checkLoad, 100);
		return d.promise();
	}
	
	function loadObj(id, url) {
		totalWeight += 1;
		var d = new $.Deferred();
		var loader = new THREE.OBJLoader();
		loader.load(url, function (obj) {
			window.assets[id] = obj;
			loadedWeight += 1;
			LoadingBar.update(loadedWeight / totalWeight * loaderPercentage);
			d.resolve();
		});
		return d.promise();
	}
	
	function loadTexture(id, url) {
		totalWeight += 1;
		var d = $.Deferred();
		var loader = new THREE.TextureLoader();
		loader.load(url, function (texture) {
			window.assets[id] = texture;
			loadedWeight += 1;
			LoadingBar.update(loadedWeight / totalWeight * loaderPercentage);
			d.resolve();
		});
		return d.promise();
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */
	
	THREE.OBJLoader = function ( manager ) {
	
		this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
	
	};
	
	THREE.OBJLoader.prototype = {
	
		constructor: THREE.OBJLoader,
	
		load: function ( url, onLoad, onProgress, onError ) {
	
			var scope = this;
	
			var loader = new THREE.XHRLoader( scope.manager );
			loader.setCrossOrigin( this.crossOrigin );
			loader.load( url, function ( text ) {
	
				onLoad( scope.parse( text ) );
	
			}, onProgress, onError );
	
		},
	
		setCrossOrigin: function ( value ) {
	
			this.crossOrigin = value;
	
		},
	
		parse: function ( text ) {
	
			// console.time( 'OBJLoader' );
	
			var object, objects = [];
			var geometry, material;
	
			function parseVertexIndex( value ) {
	
				var index = parseInt( value );
	
				return ( index >= 0 ? index - 1 : index + vertices.length / 3 ) * 3;
	
			}
	
			function parseNormalIndex( value ) {
	
				var index = parseInt( value );
	
				return ( index >= 0 ? index - 1 : index + normals.length / 3 ) * 3;
	
			}
	
			function parseUVIndex( value ) {
	
				var index = parseInt( value );
	
				return ( index >= 0 ? index - 1 : index + uvs.length / 2 ) * 2;
	
			}
	
			function addVertex( a, b, c ) {
	
				geometry.vertices.push(
					vertices[ a ], vertices[ a + 1 ], vertices[ a + 2 ],
					vertices[ b ], vertices[ b + 1 ], vertices[ b + 2 ],
					vertices[ c ], vertices[ c + 1 ], vertices[ c + 2 ]
				);
	
			}
	
			function addNormal( a, b, c ) {
	
				geometry.normals.push(
					normals[ a ], normals[ a + 1 ], normals[ a + 2 ],
					normals[ b ], normals[ b + 1 ], normals[ b + 2 ],
					normals[ c ], normals[ c + 1 ], normals[ c + 2 ]
				);
	
			}
	
			function addUV( a, b, c ) {
	
				geometry.uvs.push(
					uvs[ a ], uvs[ a + 1 ],
					uvs[ b ], uvs[ b + 1 ],
					uvs[ c ], uvs[ c + 1 ]
				);
	
			}
	
			function addFace( a, b, c, d,  ua, ub, uc, ud, na, nb, nc, nd ) {
	
				var ia = parseVertexIndex( a );
				var ib = parseVertexIndex( b );
				var ic = parseVertexIndex( c );
				var id;
	
				if ( d === undefined ) {
	
					addVertex( ia, ib, ic );
	
				} else {
	
					id = parseVertexIndex( d );
	
					addVertex( ia, ib, id );
					addVertex( ib, ic, id );
	
				}
	
				if ( ua !== undefined ) {
	
					ia = parseUVIndex( ua );
					ib = parseUVIndex( ub );
					ic = parseUVIndex( uc );
	
					if ( d === undefined ) {
	
						addUV( ia, ib, ic );
	
					} else {
	
						id = parseUVIndex( ud );
	
						addUV( ia, ib, id );
						addUV( ib, ic, id );
	
					}
	
				}
	
				if ( na !== undefined ) {
	
					ia = parseNormalIndex( na );
					ib = parseNormalIndex( nb );
					ic = parseNormalIndex( nc );
	
					if ( d === undefined ) {
	
						addNormal( ia, ib, ic );
	
					} else {
	
						id = parseNormalIndex( nd );
	
						addNormal( ia, ib, id );
						addNormal( ib, ic, id );
	
					}
	
				}
	
			}
	
			// create mesh if no objects in text
	
			if ( /^o /gm.test( text ) === false ) {
	
				geometry = {
					vertices: [],
					normals: [],
					uvs: []
				};
	
				material = {
					name: ''
				};
	
				object = {
					name: '',
					geometry: geometry,
					material: material
				};
	
				objects.push( object );
	
			}
	
			var vertices = [];
			var normals = [];
			var uvs = [];
	
			// v float float float
	
			var vertex_pattern = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
	
			// vn float float float
	
			var normal_pattern = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
	
			// vt float float
	
			var uv_pattern = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;
	
			// f vertex vertex vertex ...
	
			var face_pattern1 = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/;
	
			// f vertex/uv vertex/uv vertex/uv ...
	
			var face_pattern2 = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/;
	
			// f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...
	
			var face_pattern3 = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/;
	
			// f vertex//normal vertex//normal vertex//normal ...
	
			var face_pattern4 = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;
	
			//
	
			var lines = text.split( '\n' );
	
			for ( var i = 0; i < lines.length; i ++ ) {
	
				var line = lines[ i ];
				line = line.trim();
	
				var result;
	
				if ( line.length === 0 || line.charAt( 0 ) === '#' ) {
	
					continue;
	
				} else if ( ( result = vertex_pattern.exec( line ) ) !== null ) {
	
					// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
	
					vertices.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] ),
						parseFloat( result[ 3 ] )
					);
	
				} else if ( ( result = normal_pattern.exec( line ) ) !== null ) {
	
					// ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
	
					normals.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] ),
						parseFloat( result[ 3 ] )
					);
	
				} else if ( ( result = uv_pattern.exec( line ) ) !== null ) {
	
					// ["vt 0.1 0.2", "0.1", "0.2"]
	
					uvs.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] )
					);
	
				} else if ( ( result = face_pattern1.exec( line ) ) !== null ) {
	
					// ["f 1 2 3", "1", "2", "3", undefined]
	
					addFace(
						result[ 1 ], result[ 2 ], result[ 3 ], result[ 4 ]
					);
	
				} else if ( ( result = face_pattern2.exec( line ) ) !== null ) {
	
					// ["f 1/1 2/2 3/3", " 1/1", "1", "1", " 2/2", "2", "2", " 3/3", "3", "3", undefined, undefined, undefined]
	
					addFace(
						result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
						result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
					);
	
				} else if ( ( result = face_pattern3.exec( line ) ) !== null ) {
	
					// ["f 1/1/1 2/2/2 3/3/3", " 1/1/1", "1", "1", "1", " 2/2/2", "2", "2", "2", " 3/3/3", "3", "3", "3", undefined, undefined, undefined, undefined]
	
					addFace(
						result[ 2 ], result[ 6 ], result[ 10 ], result[ 14 ],
						result[ 3 ], result[ 7 ], result[ 11 ], result[ 15 ],
						result[ 4 ], result[ 8 ], result[ 12 ], result[ 16 ]
					);
	
				} else if ( ( result = face_pattern4.exec( line ) ) !== null ) {
	
					// ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3", undefined, undefined, undefined]
	
					addFace(
						result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
						undefined, undefined, undefined, undefined,
						result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
					);
	
				} else if ( /^o /.test( line ) ) {
	
					geometry = {
						vertices: [],
						normals: [],
						uvs: []
					};
	
					material = {
						name: ''
					};
	
					object = {
						name: line.substring( 2 ).trim(),
						geometry: geometry,
						material: material
					};
	
					objects.push( object )
	
				} else if ( /^g /.test( line ) ) {
	
					// group
	
				} else if ( /^usemtl /.test( line ) ) {
	
					// material
	
					material.name = line.substring( 7 ).trim();
	
				} else if ( /^mtllib /.test( line ) ) {
	
					// mtl file
	
				} else if ( /^s /.test( line ) ) {
	
					// smooth shading
	
				} else {
	
					// console.log( "THREE.OBJLoader: Unhandled line " + line );
	
				}
	
			}
	
			var container = new THREE.Object3D();
	
			for ( var i = 0, l = objects.length; i < l; i ++ ) {
	
				object = objects[ i ];
				geometry = object.geometry;
	
				var buffergeometry = new THREE.BufferGeometry();
	
				buffergeometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry.vertices ), 3 ) );
	
				if ( geometry.normals.length > 0 ) {
	
					buffergeometry.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( geometry.normals ), 3 ) );
	
				}
	
				if ( geometry.uvs.length > 0 ) {
	
					buffergeometry.addAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( geometry.uvs ), 2 ) );
	
				}
	
				material = new THREE.MeshLambertMaterial();
				material.name = object.material.name;
	
				var mesh = new THREE.Mesh( buffergeometry, material );
				mesh.name = object.name;
	
				container.add( mesh );
	
			}
	
			// console.timeEnd( 'OBJLoader' );
	
			return container;
	
		}
	
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _eventemitter = __webpack_require__(4);
	
	var _eventemitter2 = _interopRequireDefault(_eventemitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global $ */
	
	var LoadingBar = (function (_EventEmitter) {
		_inherits(LoadingBar, _EventEmitter);
	
		function LoadingBar() {
			_classCallCheck(this, LoadingBar);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LoadingBar).call(this));
	
			_this.$root = $('.loading');
			_this.$bar = $('.loading__bar');
			_this.$dot = $('.loading__dot');
			return _this;
		}
	
		_createClass(LoadingBar, [{
			key: 'update',
			value: function update(rate) {
				var _this2 = this;
	
				// console.log('loadingbar..', rate)
				var scale = rate;
				this.$bar.css('transform', 'scaleX(' + scale + ')');
	
				if (rate >= 1) {
	
					setTimeout(function () {
						_this2.emit('complete');
					}, 1000);
				}
			}
		}, {
			key: 'animate',
			value: function animate() {}
		}]);
	
		return LoadingBar;
	})(_eventemitter2.default);
	
	exports.default = new LoadingBar();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;
	
	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} once Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}
	
	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }
	
	/**
	 * Holds the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;
	
	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];
	
	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];
	
	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }
	
	  return ee;
	};
	
	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return false;
	
	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;
	
	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
	
	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }
	
	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }
	
	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;
	
	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
	
	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }
	
	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }
	
	  return true;
	};
	
	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Functon} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return this;
	
	  var listeners = this._events[evt]
	    , events = [];
	
	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }
	
	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }
	
	  return this;
	};
	
	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;
	
	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);
	
	  return this;
	};
	
	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};
	
	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;
	
	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author alteredq / http://alteredqualia.com/
	 * @author mr.doob / http://mrdoob.com/
	 */
	
	var Detector = {
	
		canvas: !! window.CanvasRenderingContext2D,
		webgl: ( function () {
	
			try {
	
				var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
	
			} catch ( e ) {
	
				return false;
	
			}
	
		} )(),
		workers: !! window.Worker,
		fileapi: window.File && window.FileReader && window.FileList && window.Blob,
	
		getWebGLErrorMessage: function () {
	
			var element = document.createElement( 'div' );
			element.id = 'webgl-error-message';
			element.style.fontFamily = 'monospace';
			element.style.fontSize = '13px';
			element.style.fontWeight = 'normal';
			element.style.textAlign = 'center';
			element.style.background = '#fff';
			element.style.color = '#000';
			element.style.padding = '1.5em';
			element.style.width = '400px';
			element.style.margin = '5em auto 0';
	
			if ( ! this.webgl ) {
	
				element.innerHTML = window.WebGLRenderingContext ? [
					'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
					'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
				].join( '\n' ) : [
					'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
					'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
				].join( '\n' );
	
			}
	
			return element;
	
		},
	
		addGetWebGLMessage: function ( parameters ) {
	
			var parent, id, element;
	
			parameters = parameters || {};
	
			parent = parameters.parent !== undefined ? parameters.parent : document.body;
			id = parameters.id !== undefined ? parameters.id : 'oldie';
	
			element = Detector.getWebGLErrorMessage();
			element.id = id;
	
			parent.appendChild( element );
	
		}
	
	};
	
	// browserify support
	if ( true ) {
	
		module.exports = Detector;
	
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var cbs = [], 
		data;
	module.exports = function(cb) {
		if(cbs) cbs.push(cb);
		else cb(data);
	}
	__webpack_require__.e/* nsure */(1, function(require) {
		data = __webpack_require__(7);
		var callbacks = cbs;
		cbs = null;
		for(var i = 0, l = callbacks.length; i < l; i++) {
			callbacks[i](data);
		}
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjlhMTgzNGZmY2NiOWZiNTg2OTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9hZGVyLmpzIiwid2VicGFjazovLy8uL3dlYl9tb2R1bGVzL09CSkxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9hZGluZy1iYXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ldmVudGVtaXR0ZXIzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3dlYl9tb2R1bGVzL0RldGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0VBQWdFLFVBQVU7QUFDMUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0tDdkZZLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FBSWxCLE9BQU0sQ0FBQyxVQUFVLHVCQUFhOzs7OztBQUc5QixLQUFJLENBQUMsbUJBQVMsTUFBTSxJQUFJLENBQUMsbUJBQVMsS0FBSyxJQUNuQyxnRUFBZ0UsQ0FBQyxJQUFJ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RUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSTs7QUFFSjs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLE1BQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxtQkFBa0Isa0JBQWtCOztBQUVwQztBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEtBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxLQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7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O0FBQzVDO0FBQ0E7QUFDQSxFQUFDLEUiLCJmaWxlIjoiYm9vdHN0cmFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGNodW5rSWRzLCBtb3JlTW9kdWxlcykge1xuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pXG4gXHRcdFx0XHRjYWxsYmFja3MucHVzaC5hcHBseShjYWxsYmFja3MsIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSk7XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGNodW5rSWRzLCBtb3JlTW9kdWxlcyk7XG4gXHRcdHdoaWxlKGNhbGxiYWNrcy5sZW5ndGgpXG4gXHRcdFx0Y2FsbGJhY2tzLnNoaWZ0KCkuY2FsbChudWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0fTtcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIFwiMFwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0Ly8gQXJyYXkgbWVhbnMgXCJsb2FkaW5nXCIsIGFycmF5IGNvbnRhaW5zIGNhbGxiYWNrc1xuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0MDowXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkLCBjYWxsYmFjaykge1xuIFx0XHQvLyBcIjBcIiBpcyB0aGUgc2lnbmFsIGZvciBcImFscmVhZHkgbG9hZGVkXCJcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKVxuIFx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKG51bGwsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIGFuIGFycmF5IG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSB1bmRlZmluZWQpIHtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0ucHVzaChjYWxsYmFjayk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtjYWxsYmFja107XG4gXHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuIFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRzY3JpcHQuYXN5bmMgPSB0cnVlO1xuXG4gXHRcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyAoe1wiMVwiOlwiYXBwXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCI7XG4gXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNjlhMTgzNGZmY2NiOWZiNTg2OTBcbiAqKi8iLCIvKiBnbG9iYWwgJCAqL1xuXG5pbXBvcnQgKiBhcyBsb2FkZXIgZnJvbSAnLi9sb2FkZXInXG5pbXBvcnQgTG9hZGluZ0JhciBmcm9tICcuL2xvYWRpbmctYmFyJ1xuaW1wb3J0IERldGVjdG9yIGZyb20gJ0RldGVjdG9yJ1xuXG53aW5kb3cuTG9hZGluZ0JhciA9IExvYWRpbmdCYXJcblxuLy8gRGVsZWN0b3JcbmlmICghRGV0ZWN0b3IuY2FudmFzIHx8ICFEZXRlY3Rvci53ZWJnbFxuXHR8fCAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcblx0Ly8gTm8gc3VwcG9ydGVkIGRldmljZXNcblx0JCgnYm9keScpLmF0dHIoJ2RhdGEtc3RhdGUnLCAndW5zdXBwb3J0ZWQnKVxuXG59IGVsc2Uge1xuXG5cdGNvbnNvbGUudGltZSgnbG9hZCBhc3NldHMnKVxuXG5cdCQud2hlbihcblx0XHRsb2FkZXIubG9hZEpTT04oJ2dyYXBocycsICcuL2RhdGEvZ3JhcGhzLmpzb24nKSxcblx0XHRsb2FkZXIubG9hZFZpZGVvKCdvdmVybGF5X2ZsYXNoJywgJy4vdGV4dHVyZS9vdmVybGF5X2ZsYXNoLm1wNCcpLFxuXHRcdGxvYWRlci5sb2FkVmlkZW8oJ292ZXJsYXlfZmxpY2tlcicsICcuL3RleHR1cmUvb3ZlcmxheV9mbGlja2VyLm1wNCcpLFxuXHRcdGxvYWRlci5sb2FkT2JqKCdkYW5kcnVmZl9zbWFsbF9vYmonLCAnLi9kYXRhL2RhbmRydWZmX3NtYWxsLm9iaicpLFxuXHRcdGxvYWRlci5sb2FkT2JqKCdkYW5kcnVmZl9sYXJnZV9vYmonLCAnLi9kYXRhL2RhbmRydWZmX2xhcmdlLm9iaicpLFxuXHRcdGxvYWRlci5sb2FkVGV4dHVyZSgnZGFuZHJ1ZmZfc21hbGxfdGV4JywgJy4vdGV4dHVyZS9kYW5kcnVmZl9zbWFsbC5wbmcnKVxuXHQpLnRoZW4oKCkgPT4ge1xuXHRcdGNvbnNvbGUudGltZUVuZCgnbG9hZCBhc3NldHMnKVxuXHRcdHJlcXVpcmUoJ2J1bmRsZT9uYW1lPWFwcCEuL2FwcC5qcycpXG5cdH0pXG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2Jvb3RzdHJhcC5qc1xuICoqLyIsIi8qIGdsb2JhbCBUSFJFRSwgTG9hZGluZ0JhciwgJCAqL1xuXG5pbXBvcnQgJ09CSkxvYWRlcidcblxud2luZG93LmFzc2V0cyA9IHt9XG5cbmxldCB0b3RhbFdlaWdodCA9IDBcbmxldCBsb2FkZWRXZWlnaHQgPSAwXG5cbmxldCBsb2FkZXJQZXJjZW50YWdlID0gMC4yXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSlNPTihpZCwgdXJsKSB7XG5cdHRvdGFsV2VpZ2h0ICs9IDFcblx0bGV0IGQgPSBuZXcgJC5EZWZlcnJlZCgpXG5cdCQuZ2V0SlNPTih1cmwsIChkYXRhKSA9PiB7XG5cdFx0d2luZG93LmFzc2V0c1tpZF0gPSBkYXRhXG5cdFx0bG9hZGVkV2VpZ2h0ICs9IDFcblx0XHRMb2FkaW5nQmFyLnVwZGF0ZSgobG9hZGVkV2VpZ2h0IC8gdG90YWxXZWlnaHQpICogbG9hZGVyUGVyY2VudGFnZSlcblx0XHRkLnJlc29sdmUoKVxuXHR9KVxuXHRyZXR1cm4gZC5wcm9taXNlKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRWaWRlbyhpZCwgdXJsKSB7XG5cdHRvdGFsV2VpZ2h0ICs9IDFcblx0bGV0IGQgPSBuZXcgJC5EZWZlcnJlZCgpXG5cdGxldCB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcblx0dmlkZW8uc3JjID0gYCR7dXJsfT8uanBnYFxuXG5cdGxldCBjaGVja0xvYWQgPSAoKSA9PiB7XG5cdFx0aWYgKHZpZGVvLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdFx0d2luZG93LmFzc2V0c1tpZF0gPSB2aWRlb1xuXHRcdFx0bG9hZGVkV2VpZ2h0ICs9IDFcblx0XHRcdExvYWRpbmdCYXIudXBkYXRlKChsb2FkZWRXZWlnaHQgLyB0b3RhbFdlaWdodCkgKiBsb2FkZXJQZXJjZW50YWdlKVxuXHRcdFx0ZC5yZXNvbHZlKClcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2V0VGltZW91dChjaGVja0xvYWQsIDEwMClcblx0XHR9XG5cdH1cblx0c2V0VGltZW91dChjaGVja0xvYWQsIDEwMClcblx0cmV0dXJuIGQucHJvbWlzZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkT2JqKGlkLCB1cmwpIHtcblx0dG90YWxXZWlnaHQgKz0gMVxuXHRsZXQgZCA9IG5ldyAkLkRlZmVycmVkKClcblx0bGV0IGxvYWRlciA9IG5ldyBUSFJFRS5PQkpMb2FkZXIoKVxuXHRsb2FkZXIubG9hZCh1cmwsIChvYmopID0+IHtcblx0XHR3aW5kb3cuYXNzZXRzW2lkXSA9IG9iaiBcblx0XHRsb2FkZWRXZWlnaHQgKz0gMVxuXHRcdExvYWRpbmdCYXIudXBkYXRlKChsb2FkZWRXZWlnaHQgLyB0b3RhbFdlaWdodCkgKiBsb2FkZXJQZXJjZW50YWdlKVxuXHRcdGQucmVzb2x2ZSgpXG5cdH0pXG5cdHJldHVybiBkLnByb21pc2UoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFRleHR1cmUoaWQsIHVybCkge1xuXHR0b3RhbFdlaWdodCArPSAxXG5cdGxldCBkID0gJC5EZWZlcnJlZCgpXG5cdGxldCBsb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpXG5cdGxvYWRlci5sb2FkKHVybCwgKHRleHR1cmUpID0+IHtcblx0XHR3aW5kb3cuYXNzZXRzW2lkXSA9IHRleHR1cmVcblx0XHRsb2FkZWRXZWlnaHQgKz0gMVxuXHRcdExvYWRpbmdCYXIudXBkYXRlKChsb2FkZWRXZWlnaHQgLyB0b3RhbFdlaWdodCkgKiBsb2FkZXJQZXJjZW50YWdlKVxuXHRcdGQucmVzb2x2ZSgpXG5cdH0pXG5cdHJldHVybiBkLnByb21pc2UoKVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbG9hZGVyLmpzXG4gKiovIiwiLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICovXG5cblRIUkVFLk9CSkxvYWRlciA9IGZ1bmN0aW9uICggbWFuYWdlciApIHtcblxuXHR0aGlzLm1hbmFnZXIgPSAoIG1hbmFnZXIgIT09IHVuZGVmaW5lZCApID8gbWFuYWdlciA6IFRIUkVFLkRlZmF1bHRMb2FkaW5nTWFuYWdlcjtcblxufTtcblxuVEhSRUUuT0JKTG9hZGVyLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogVEhSRUUuT0JKTG9hZGVyLFxuXG5cdGxvYWQ6IGZ1bmN0aW9uICggdXJsLCBvbkxvYWQsIG9uUHJvZ3Jlc3MsIG9uRXJyb3IgKSB7XG5cblx0XHR2YXIgc2NvcGUgPSB0aGlzO1xuXG5cdFx0dmFyIGxvYWRlciA9IG5ldyBUSFJFRS5YSFJMb2FkZXIoIHNjb3BlLm1hbmFnZXIgKTtcblx0XHRsb2FkZXIuc2V0Q3Jvc3NPcmlnaW4oIHRoaXMuY3Jvc3NPcmlnaW4gKTtcblx0XHRsb2FkZXIubG9hZCggdXJsLCBmdW5jdGlvbiAoIHRleHQgKSB7XG5cblx0XHRcdG9uTG9hZCggc2NvcGUucGFyc2UoIHRleHQgKSApO1xuXG5cdFx0fSwgb25Qcm9ncmVzcywgb25FcnJvciApO1xuXG5cdH0sXG5cblx0c2V0Q3Jvc3NPcmlnaW46IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHR0aGlzLmNyb3NzT3JpZ2luID0gdmFsdWU7XG5cblx0fSxcblxuXHRwYXJzZTogZnVuY3Rpb24gKCB0ZXh0ICkge1xuXG5cdFx0Ly8gY29uc29sZS50aW1lKCAnT0JKTG9hZGVyJyApO1xuXG5cdFx0dmFyIG9iamVjdCwgb2JqZWN0cyA9IFtdO1xuXHRcdHZhciBnZW9tZXRyeSwgbWF0ZXJpYWw7XG5cblx0XHRmdW5jdGlvbiBwYXJzZVZlcnRleEluZGV4KCB2YWx1ZSApIHtcblxuXHRcdFx0dmFyIGluZGV4ID0gcGFyc2VJbnQoIHZhbHVlICk7XG5cblx0XHRcdHJldHVybiAoIGluZGV4ID49IDAgPyBpbmRleCAtIDEgOiBpbmRleCArIHZlcnRpY2VzLmxlbmd0aCAvIDMgKSAqIDM7XG5cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBwYXJzZU5vcm1hbEluZGV4KCB2YWx1ZSApIHtcblxuXHRcdFx0dmFyIGluZGV4ID0gcGFyc2VJbnQoIHZhbHVlICk7XG5cblx0XHRcdHJldHVybiAoIGluZGV4ID49IDAgPyBpbmRleCAtIDEgOiBpbmRleCArIG5vcm1hbHMubGVuZ3RoIC8gMyApICogMztcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHBhcnNlVVZJbmRleCggdmFsdWUgKSB7XG5cblx0XHRcdHZhciBpbmRleCA9IHBhcnNlSW50KCB2YWx1ZSApO1xuXG5cdFx0XHRyZXR1cm4gKCBpbmRleCA+PSAwID8gaW5kZXggLSAxIDogaW5kZXggKyB1dnMubGVuZ3RoIC8gMiApICogMjtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGFkZFZlcnRleCggYSwgYiwgYyApIHtcblxuXHRcdFx0Z2VvbWV0cnkudmVydGljZXMucHVzaChcblx0XHRcdFx0dmVydGljZXNbIGEgXSwgdmVydGljZXNbIGEgKyAxIF0sIHZlcnRpY2VzWyBhICsgMiBdLFxuXHRcdFx0XHR2ZXJ0aWNlc1sgYiBdLCB2ZXJ0aWNlc1sgYiArIDEgXSwgdmVydGljZXNbIGIgKyAyIF0sXG5cdFx0XHRcdHZlcnRpY2VzWyBjIF0sIHZlcnRpY2VzWyBjICsgMSBdLCB2ZXJ0aWNlc1sgYyArIDIgXVxuXHRcdFx0KTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGFkZE5vcm1hbCggYSwgYiwgYyApIHtcblxuXHRcdFx0Z2VvbWV0cnkubm9ybWFscy5wdXNoKFxuXHRcdFx0XHRub3JtYWxzWyBhIF0sIG5vcm1hbHNbIGEgKyAxIF0sIG5vcm1hbHNbIGEgKyAyIF0sXG5cdFx0XHRcdG5vcm1hbHNbIGIgXSwgbm9ybWFsc1sgYiArIDEgXSwgbm9ybWFsc1sgYiArIDIgXSxcblx0XHRcdFx0bm9ybWFsc1sgYyBdLCBub3JtYWxzWyBjICsgMSBdLCBub3JtYWxzWyBjICsgMiBdXG5cdFx0XHQpO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYWRkVVYoIGEsIGIsIGMgKSB7XG5cblx0XHRcdGdlb21ldHJ5LnV2cy5wdXNoKFxuXHRcdFx0XHR1dnNbIGEgXSwgdXZzWyBhICsgMSBdLFxuXHRcdFx0XHR1dnNbIGIgXSwgdXZzWyBiICsgMSBdLFxuXHRcdFx0XHR1dnNbIGMgXSwgdXZzWyBjICsgMSBdXG5cdFx0XHQpO1xuXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYWRkRmFjZSggYSwgYiwgYywgZCwgIHVhLCB1YiwgdWMsIHVkLCBuYSwgbmIsIG5jLCBuZCApIHtcblxuXHRcdFx0dmFyIGlhID0gcGFyc2VWZXJ0ZXhJbmRleCggYSApO1xuXHRcdFx0dmFyIGliID0gcGFyc2VWZXJ0ZXhJbmRleCggYiApO1xuXHRcdFx0dmFyIGljID0gcGFyc2VWZXJ0ZXhJbmRleCggYyApO1xuXHRcdFx0dmFyIGlkO1xuXG5cdFx0XHRpZiAoIGQgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRhZGRWZXJ0ZXgoIGlhLCBpYiwgaWMgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRpZCA9IHBhcnNlVmVydGV4SW5kZXgoIGQgKTtcblxuXHRcdFx0XHRhZGRWZXJ0ZXgoIGlhLCBpYiwgaWQgKTtcblx0XHRcdFx0YWRkVmVydGV4KCBpYiwgaWMsIGlkICk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCB1YSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdGlhID0gcGFyc2VVVkluZGV4KCB1YSApO1xuXHRcdFx0XHRpYiA9IHBhcnNlVVZJbmRleCggdWIgKTtcblx0XHRcdFx0aWMgPSBwYXJzZVVWSW5kZXgoIHVjICk7XG5cblx0XHRcdFx0aWYgKCBkID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0XHRhZGRVViggaWEsIGliLCBpYyApO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRpZCA9IHBhcnNlVVZJbmRleCggdWQgKTtcblxuXHRcdFx0XHRcdGFkZFVWKCBpYSwgaWIsIGlkICk7XG5cdFx0XHRcdFx0YWRkVVYoIGliLCBpYywgaWQgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBuYSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdGlhID0gcGFyc2VOb3JtYWxJbmRleCggbmEgKTtcblx0XHRcdFx0aWIgPSBwYXJzZU5vcm1hbEluZGV4KCBuYiApO1xuXHRcdFx0XHRpYyA9IHBhcnNlTm9ybWFsSW5kZXgoIG5jICk7XG5cblx0XHRcdFx0aWYgKCBkID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0XHRhZGROb3JtYWwoIGlhLCBpYiwgaWMgKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0aWQgPSBwYXJzZU5vcm1hbEluZGV4KCBuZCApO1xuXG5cdFx0XHRcdFx0YWRkTm9ybWFsKCBpYSwgaWIsIGlkICk7XG5cdFx0XHRcdFx0YWRkTm9ybWFsKCBpYiwgaWMsIGlkICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHQvLyBjcmVhdGUgbWVzaCBpZiBubyBvYmplY3RzIGluIHRleHRcblxuXHRcdGlmICggL15vIC9nbS50ZXN0KCB0ZXh0ICkgPT09IGZhbHNlICkge1xuXG5cdFx0XHRnZW9tZXRyeSA9IHtcblx0XHRcdFx0dmVydGljZXM6IFtdLFxuXHRcdFx0XHRub3JtYWxzOiBbXSxcblx0XHRcdFx0dXZzOiBbXVxuXHRcdFx0fTtcblxuXHRcdFx0bWF0ZXJpYWwgPSB7XG5cdFx0XHRcdG5hbWU6ICcnXG5cdFx0XHR9O1xuXG5cdFx0XHRvYmplY3QgPSB7XG5cdFx0XHRcdG5hbWU6ICcnLFxuXHRcdFx0XHRnZW9tZXRyeTogZ2VvbWV0cnksXG5cdFx0XHRcdG1hdGVyaWFsOiBtYXRlcmlhbFxuXHRcdFx0fTtcblxuXHRcdFx0b2JqZWN0cy5wdXNoKCBvYmplY3QgKTtcblxuXHRcdH1cblxuXHRcdHZhciB2ZXJ0aWNlcyA9IFtdO1xuXHRcdHZhciBub3JtYWxzID0gW107XG5cdFx0dmFyIHV2cyA9IFtdO1xuXG5cdFx0Ly8gdiBmbG9hdCBmbG9hdCBmbG9hdFxuXG5cdFx0dmFyIHZlcnRleF9wYXR0ZXJuID0gL3YoICtbXFxkfFxcLnxcXCt8XFwtfGV8RV0rKSggK1tcXGR8XFwufFxcK3xcXC18ZXxFXSspKCArW1xcZHxcXC58XFwrfFxcLXxlfEVdKykvO1xuXG5cdFx0Ly8gdm4gZmxvYXQgZmxvYXQgZmxvYXRcblxuXHRcdHZhciBub3JtYWxfcGF0dGVybiA9IC92biggK1tcXGR8XFwufFxcK3xcXC18ZXxFXSspKCArW1xcZHxcXC58XFwrfFxcLXxlfEVdKykoICtbXFxkfFxcLnxcXCt8XFwtfGV8RV0rKS87XG5cblx0XHQvLyB2dCBmbG9hdCBmbG9hdFxuXG5cdFx0dmFyIHV2X3BhdHRlcm4gPSAvdnQoICtbXFxkfFxcLnxcXCt8XFwtfGV8RV0rKSggK1tcXGR8XFwufFxcK3xcXC18ZXxFXSspLztcblxuXHRcdC8vIGYgdmVydGV4IHZlcnRleCB2ZXJ0ZXggLi4uXG5cblx0XHR2YXIgZmFjZV9wYXR0ZXJuMSA9IC9mKCArLT9cXGQrKSggKy0/XFxkKykoICstP1xcZCspKCArLT9cXGQrKT8vO1xuXG5cdFx0Ly8gZiB2ZXJ0ZXgvdXYgdmVydGV4L3V2IHZlcnRleC91diAuLi5cblxuXHRcdHZhciBmYWNlX3BhdHRlcm4yID0gL2YoICsoLT9cXGQrKVxcLygtP1xcZCspKSggKygtP1xcZCspXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcLygtP1xcZCspKT8vO1xuXG5cdFx0Ly8gZiB2ZXJ0ZXgvdXYvbm9ybWFsIHZlcnRleC91di9ub3JtYWwgdmVydGV4L3V2L25vcm1hbCAuLi5cblxuXHRcdHZhciBmYWNlX3BhdHRlcm4zID0gL2YoICsoLT9cXGQrKVxcLygtP1xcZCspXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC8oLT9cXGQrKVxcLygtP1xcZCspKSggKygtP1xcZCspXFwvKC0/XFxkKylcXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcLygtP1xcZCspXFwvKC0/XFxkKykpPy87XG5cblx0XHQvLyBmIHZlcnRleC8vbm9ybWFsIHZlcnRleC8vbm9ybWFsIHZlcnRleC8vbm9ybWFsIC4uLlxuXG5cdFx0dmFyIGZhY2VfcGF0dGVybjQgPSAvZiggKygtP1xcZCspXFwvXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC9cXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcL1xcLygtP1xcZCspKSggKygtP1xcZCspXFwvXFwvKC0/XFxkKykpPy87XG5cblx0XHQvL1xuXG5cdFx0dmFyIGxpbmVzID0gdGV4dC5zcGxpdCggJ1xcbicgKTtcblxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0dmFyIGxpbmUgPSBsaW5lc1sgaSBdO1xuXHRcdFx0bGluZSA9IGxpbmUudHJpbSgpO1xuXG5cdFx0XHR2YXIgcmVzdWx0O1xuXG5cdFx0XHRpZiAoIGxpbmUubGVuZ3RoID09PSAwIHx8IGxpbmUuY2hhckF0KCAwICkgPT09ICcjJyApIHtcblxuXHRcdFx0XHRjb250aW51ZTtcblxuXHRcdFx0fSBlbHNlIGlmICggKCByZXN1bHQgPSB2ZXJ0ZXhfcGF0dGVybi5leGVjKCBsaW5lICkgKSAhPT0gbnVsbCApIHtcblxuXHRcdFx0XHQvLyBbXCJ2IDEuMCAyLjAgMy4wXCIsIFwiMS4wXCIsIFwiMi4wXCIsIFwiMy4wXCJdXG5cblx0XHRcdFx0dmVydGljZXMucHVzaChcblx0XHRcdFx0XHRwYXJzZUZsb2F0KCByZXN1bHRbIDEgXSApLFxuXHRcdFx0XHRcdHBhcnNlRmxvYXQoIHJlc3VsdFsgMiBdICksXG5cdFx0XHRcdFx0cGFyc2VGbG9hdCggcmVzdWx0WyAzIF0gKVxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCAoIHJlc3VsdCA9IG5vcm1hbF9wYXR0ZXJuLmV4ZWMoIGxpbmUgKSApICE9PSBudWxsICkge1xuXG5cdFx0XHRcdC8vIFtcInZuIDEuMCAyLjAgMy4wXCIsIFwiMS4wXCIsIFwiMi4wXCIsIFwiMy4wXCJdXG5cblx0XHRcdFx0bm9ybWFscy5wdXNoKFxuXHRcdFx0XHRcdHBhcnNlRmxvYXQoIHJlc3VsdFsgMSBdICksXG5cdFx0XHRcdFx0cGFyc2VGbG9hdCggcmVzdWx0WyAyIF0gKSxcblx0XHRcdFx0XHRwYXJzZUZsb2F0KCByZXN1bHRbIDMgXSApXG5cdFx0XHRcdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAoICggcmVzdWx0ID0gdXZfcGF0dGVybi5leGVjKCBsaW5lICkgKSAhPT0gbnVsbCApIHtcblxuXHRcdFx0XHQvLyBbXCJ2dCAwLjEgMC4yXCIsIFwiMC4xXCIsIFwiMC4yXCJdXG5cblx0XHRcdFx0dXZzLnB1c2goXG5cdFx0XHRcdFx0cGFyc2VGbG9hdCggcmVzdWx0WyAxIF0gKSxcblx0XHRcdFx0XHRwYXJzZUZsb2F0KCByZXN1bHRbIDIgXSApXG5cdFx0XHRcdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAoICggcmVzdWx0ID0gZmFjZV9wYXR0ZXJuMS5leGVjKCBsaW5lICkgKSAhPT0gbnVsbCApIHtcblxuXHRcdFx0XHQvLyBbXCJmIDEgMiAzXCIsIFwiMVwiLCBcIjJcIiwgXCIzXCIsIHVuZGVmaW5lZF1cblxuXHRcdFx0XHRhZGRGYWNlKFxuXHRcdFx0XHRcdHJlc3VsdFsgMSBdLCByZXN1bHRbIDIgXSwgcmVzdWx0WyAzIF0sIHJlc3VsdFsgNCBdXG5cdFx0XHRcdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAoICggcmVzdWx0ID0gZmFjZV9wYXR0ZXJuMi5leGVjKCBsaW5lICkgKSAhPT0gbnVsbCApIHtcblxuXHRcdFx0XHQvLyBbXCJmIDEvMSAyLzIgMy8zXCIsIFwiIDEvMVwiLCBcIjFcIiwgXCIxXCIsIFwiIDIvMlwiLCBcIjJcIiwgXCIyXCIsIFwiIDMvM1wiLCBcIjNcIiwgXCIzXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWRdXG5cblx0XHRcdFx0YWRkRmFjZShcblx0XHRcdFx0XHRyZXN1bHRbIDIgXSwgcmVzdWx0WyA1IF0sIHJlc3VsdFsgOCBdLCByZXN1bHRbIDExIF0sXG5cdFx0XHRcdFx0cmVzdWx0WyAzIF0sIHJlc3VsdFsgNiBdLCByZXN1bHRbIDkgXSwgcmVzdWx0WyAxMiBdXG5cdFx0XHRcdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAoICggcmVzdWx0ID0gZmFjZV9wYXR0ZXJuMy5leGVjKCBsaW5lICkgKSAhPT0gbnVsbCApIHtcblxuXHRcdFx0XHQvLyBbXCJmIDEvMS8xIDIvMi8yIDMvMy8zXCIsIFwiIDEvMS8xXCIsIFwiMVwiLCBcIjFcIiwgXCIxXCIsIFwiIDIvMi8yXCIsIFwiMlwiLCBcIjJcIiwgXCIyXCIsIFwiIDMvMy8zXCIsIFwiM1wiLCBcIjNcIiwgXCIzXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cblxuXHRcdFx0XHRhZGRGYWNlKFxuXHRcdFx0XHRcdHJlc3VsdFsgMiBdLCByZXN1bHRbIDYgXSwgcmVzdWx0WyAxMCBdLCByZXN1bHRbIDE0IF0sXG5cdFx0XHRcdFx0cmVzdWx0WyAzIF0sIHJlc3VsdFsgNyBdLCByZXN1bHRbIDExIF0sIHJlc3VsdFsgMTUgXSxcblx0XHRcdFx0XHRyZXN1bHRbIDQgXSwgcmVzdWx0WyA4IF0sIHJlc3VsdFsgMTIgXSwgcmVzdWx0WyAxNiBdXG5cdFx0XHRcdCk7XG5cblx0XHRcdH0gZWxzZSBpZiAoICggcmVzdWx0ID0gZmFjZV9wYXR0ZXJuNC5leGVjKCBsaW5lICkgKSAhPT0gbnVsbCApIHtcblxuXHRcdFx0XHQvLyBbXCJmIDEvLzEgMi8vMiAzLy8zXCIsIFwiIDEvLzFcIiwgXCIxXCIsIFwiMVwiLCBcIiAyLy8yXCIsIFwiMlwiLCBcIjJcIiwgXCIgMy8vM1wiLCBcIjNcIiwgXCIzXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWRdXG5cblx0XHRcdFx0YWRkRmFjZShcblx0XHRcdFx0XHRyZXN1bHRbIDIgXSwgcmVzdWx0WyA1IF0sIHJlc3VsdFsgOCBdLCByZXN1bHRbIDExIF0sXG5cdFx0XHRcdFx0dW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLFxuXHRcdFx0XHRcdHJlc3VsdFsgMyBdLCByZXN1bHRbIDYgXSwgcmVzdWx0WyA5IF0sIHJlc3VsdFsgMTIgXVxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCAvXm8gLy50ZXN0KCBsaW5lICkgKSB7XG5cblx0XHRcdFx0Z2VvbWV0cnkgPSB7XG5cdFx0XHRcdFx0dmVydGljZXM6IFtdLFxuXHRcdFx0XHRcdG5vcm1hbHM6IFtdLFxuXHRcdFx0XHRcdHV2czogW11cblx0XHRcdFx0fTtcblxuXHRcdFx0XHRtYXRlcmlhbCA9IHtcblx0XHRcdFx0XHRuYW1lOiAnJ1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdG9iamVjdCA9IHtcblx0XHRcdFx0XHRuYW1lOiBsaW5lLnN1YnN0cmluZyggMiApLnRyaW0oKSxcblx0XHRcdFx0XHRnZW9tZXRyeTogZ2VvbWV0cnksXG5cdFx0XHRcdFx0bWF0ZXJpYWw6IG1hdGVyaWFsXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0b2JqZWN0cy5wdXNoKCBvYmplY3QgKVxuXG5cdFx0XHR9IGVsc2UgaWYgKCAvXmcgLy50ZXN0KCBsaW5lICkgKSB7XG5cblx0XHRcdFx0Ly8gZ3JvdXBcblxuXHRcdFx0fSBlbHNlIGlmICggL151c2VtdGwgLy50ZXN0KCBsaW5lICkgKSB7XG5cblx0XHRcdFx0Ly8gbWF0ZXJpYWxcblxuXHRcdFx0XHRtYXRlcmlhbC5uYW1lID0gbGluZS5zdWJzdHJpbmcoIDcgKS50cmltKCk7XG5cblx0XHRcdH0gZWxzZSBpZiAoIC9ebXRsbGliIC8udGVzdCggbGluZSApICkge1xuXG5cdFx0XHRcdC8vIG10bCBmaWxlXG5cblx0XHRcdH0gZWxzZSBpZiAoIC9ecyAvLnRlc3QoIGxpbmUgKSApIHtcblxuXHRcdFx0XHQvLyBzbW9vdGggc2hhZGluZ1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCBcIlRIUkVFLk9CSkxvYWRlcjogVW5oYW5kbGVkIGxpbmUgXCIgKyBsaW5lICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHZhciBjb250YWluZXIgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcblxuXHRcdGZvciAoIHZhciBpID0gMCwgbCA9IG9iamVjdHMubGVuZ3RoOyBpIDwgbDsgaSArKyApIHtcblxuXHRcdFx0b2JqZWN0ID0gb2JqZWN0c1sgaSBdO1xuXHRcdFx0Z2VvbWV0cnkgPSBvYmplY3QuZ2VvbWV0cnk7XG5cblx0XHRcdHZhciBidWZmZXJnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuXG5cdFx0XHRidWZmZXJnZW9tZXRyeS5hZGRBdHRyaWJ1dGUoICdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoIG5ldyBGbG9hdDMyQXJyYXkoIGdlb21ldHJ5LnZlcnRpY2VzICksIDMgKSApO1xuXG5cdFx0XHRpZiAoIGdlb21ldHJ5Lm5vcm1hbHMubGVuZ3RoID4gMCApIHtcblxuXHRcdFx0XHRidWZmZXJnZW9tZXRyeS5hZGRBdHRyaWJ1dGUoICdub3JtYWwnLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCBuZXcgRmxvYXQzMkFycmF5KCBnZW9tZXRyeS5ub3JtYWxzICksIDMgKSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggZ2VvbWV0cnkudXZzLmxlbmd0aCA+IDAgKSB7XG5cblx0XHRcdFx0YnVmZmVyZ2VvbWV0cnkuYWRkQXR0cmlidXRlKCAndXYnLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCBuZXcgRmxvYXQzMkFycmF5KCBnZW9tZXRyeS51dnMgKSwgMiApICk7XG5cblx0XHRcdH1cblxuXHRcdFx0bWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCgpO1xuXHRcdFx0bWF0ZXJpYWwubmFtZSA9IG9iamVjdC5tYXRlcmlhbC5uYW1lO1xuXG5cdFx0XHR2YXIgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKCBidWZmZXJnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcblx0XHRcdG1lc2gubmFtZSA9IG9iamVjdC5uYW1lO1xuXG5cdFx0XHRjb250YWluZXIuYWRkKCBtZXNoICk7XG5cblx0XHR9XG5cblx0XHQvLyBjb25zb2xlLnRpbWVFbmQoICdPQkpMb2FkZXInICk7XG5cblx0XHRyZXR1cm4gY29udGFpbmVyO1xuXG5cdH1cblxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93ZWJfbW9kdWxlcy9PQkpMb2FkZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBnbG9iYWwgJCAqL1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudGVtaXR0ZXIzJ1xuXG5cbmNsYXNzIExvYWRpbmdCYXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKClcblxuXHRcdHRoaXMuJHJvb3QgPSAkKCcubG9hZGluZycpXG5cdFx0dGhpcy4kYmFyID0gJCgnLmxvYWRpbmdfX2JhcicpXG5cdFx0dGhpcy4kZG90ID0gJCgnLmxvYWRpbmdfX2RvdCcpXG5cdH1cblxuXHR1cGRhdGUocmF0ZSkge1xuXHRcdC8vIGNvbnNvbGUubG9nKCdsb2FkaW5nYmFyLi4nLCByYXRlKVxuXHRcdGxldCBzY2FsZSA9IHJhdGVcblx0XHR0aGlzLiRiYXIuY3NzKCd0cmFuc2Zvcm0nLCBgc2NhbGVYKCR7c2NhbGV9KWApXG5cblx0XHRpZiAocmF0ZSA+PSAxKSB7XG5cblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmVtaXQoJ2NvbXBsZXRlJylcblx0XHRcdH0sIDEwMDApXG5cdFx0fVxuXHR9XG5cblx0YW5pbWF0ZSgpIHtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgTG9hZGluZ0JhcigpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2FkaW5nLWJhci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLy9cbi8vIFdlIHN0b3JlIG91ciBFRSBvYmplY3RzIGluIGEgcGxhaW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIGV2ZW50IG5hbWVzLlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGB+YCB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdCBvdmVycmlkZGVuIG9yXG4vLyB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vLyBXZSBhbHNvIGFzc3VtZSB0aGF0IGBPYmplY3QuY3JlYXRlKG51bGwpYCBpcyBhdmFpbGFibGUgd2hlbiB0aGUgZXZlbnQgbmFtZVxuLy8gaXMgYW4gRVM2IFN5bWJvbC5cbi8vXG52YXIgcHJlZml4ID0gdHlwZW9mIE9iamVjdC5jcmVhdGUgIT09ICdmdW5jdGlvbicgPyAnficgOiBmYWxzZTtcblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBFdmVudEVtaXR0ZXIgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRXZlbnQgaGFuZGxlciB0byBiZSBjYWxsZWQuXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IENvbnRleHQgZm9yIGZ1bmN0aW9uIGV4ZWN1dGlvbi5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IGVtaXQgb25jZVxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEVFKGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHRoaXMuZm4gPSBmbjtcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5vbmNlID0gb25jZSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIEV2ZW50RW1pdHRlciBpbnRlcmZhY2UgdGhhdCBpcyBtb2xkZWQgYWdhaW5zdCB0aGUgTm9kZS5qc1xuICogRXZlbnRFbWl0dGVyIGludGVyZmFjZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHsgLyogTm90aGluZyB0byBzZXQgKi8gfVxuXG4vKipcbiAqIEhvbGRzIHRoZSBhc3NpZ25lZCBFdmVudEVtaXR0ZXJzIGJ5IG5hbWUuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBSZXR1cm4gYSBsaXN0IG9mIGFzc2lnbmVkIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIGV2ZW50cyB0aGF0IHNob3VsZCBiZSBsaXN0ZWQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGV4aXN0cyBXZSBvbmx5IG5lZWQgdG8ga25vdyBpZiB0aGVyZSBhcmUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0FycmF5fEJvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyhldmVudCwgZXhpc3RzKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBhdmFpbGFibGUgPSB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKGV4aXN0cykgcmV0dXJuICEhYXZhaWxhYmxlO1xuICBpZiAoIWF2YWlsYWJsZSkgcmV0dXJuIFtdO1xuICBpZiAoYXZhaWxhYmxlLmZuKSByZXR1cm4gW2F2YWlsYWJsZS5mbl07XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhdmFpbGFibGUubGVuZ3RoLCBlZSA9IG5ldyBBcnJheShsKTsgaSA8IGw7IGkrKykge1xuICAgIGVlW2ldID0gYXZhaWxhYmxlW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBFbWl0IGFuIGV2ZW50IHRvIGFsbCByZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHJldHVybnMge0Jvb2xlYW59IEluZGljYXRpb24gaWYgd2UndmUgZW1pdHRlZCBhbiBldmVudC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiBmYWxzZTtcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF1cbiAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGFyZ3NcbiAgICAsIGk7XG5cbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCFhcmdzKSBmb3IgKGogPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgYXJnc1tqIC0gMV0gPSBhcmd1bWVudHNbal07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBuZXcgRXZlbnRMaXN0ZW5lciBmb3IgdGhlIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rvbn0gZm4gQ2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IFRoZSBjb250ZXh0IG9mIHRoZSBmdW5jdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgdmFyIGxpc3RlbmVyID0gbmV3IEVFKGZuLCBjb250ZXh0IHx8IHRoaXMpXG4gICAgLCBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKSB0aGlzLl9ldmVudHMgPSBwcmVmaXggPyB7fSA6IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHRoaXMuX2V2ZW50c1tldnRdID0gbGlzdGVuZXI7XG4gIGVsc2Uge1xuICAgIGlmICghdGhpcy5fZXZlbnRzW2V2dF0uZm4pIHRoaXMuX2V2ZW50c1tldnRdLnB1c2gobGlzdGVuZXIpO1xuICAgIGVsc2UgdGhpcy5fZXZlbnRzW2V2dF0gPSBbXG4gICAgICB0aGlzLl9ldmVudHNbZXZ0XSwgbGlzdGVuZXJcbiAgICBdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZCBhbiBFdmVudExpc3RlbmVyIHRoYXQncyBvbmx5IGNhbGxlZCBvbmNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIENhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtNaXhlZH0gY29udGV4dCBUaGUgY29udGV4dCBvZiB0aGUgZnVuY3Rpb24uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgdGhpcywgdHJ1ZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpIHRoaXMuX2V2ZW50cyA9IHByZWZpeCA/IHt9IDogT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgdGhpcy5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lcjtcbiAgZWxzZSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XS5mbikgdGhpcy5fZXZlbnRzW2V2dF0ucHVzaChsaXN0ZW5lcik7XG4gICAgZWxzZSB0aGlzLl9ldmVudHNbZXZ0XSA9IFtcbiAgICAgIHRoaXMuX2V2ZW50c1tldnRdLCBsaXN0ZW5lclxuICAgIF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIGV2ZW50IHdlIHdhbnQgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIHRoYXQgd2UgbmVlZCB0byBmaW5kLlxuICogQHBhcmFtIHtNaXhlZH0gY29udGV4dCBPbmx5IHJlbW92ZSBsaXN0ZW5lcnMgbWF0Y2hpbmcgdGhpcyBjb250ZXh0LlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIE9ubHkgcmVtb3ZlIG9uY2UgbGlzdGVuZXJzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XVxuICAgICwgZXZlbnRzID0gW107XG5cbiAgaWYgKGZuKSB7XG4gICAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgICAgaWYgKFxuICAgICAgICAgICBsaXN0ZW5lcnMuZm4gIT09IGZuXG4gICAgICAgIHx8IChvbmNlICYmICFsaXN0ZW5lcnMub25jZSlcbiAgICAgICAgfHwgKGNvbnRleHQgJiYgbGlzdGVuZXJzLmNvbnRleHQgIT09IGNvbnRleHQpXG4gICAgICApIHtcbiAgICAgICAgZXZlbnRzLnB1c2gobGlzdGVuZXJzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAgbGlzdGVuZXJzW2ldLmZuICE9PSBmblxuICAgICAgICAgIHx8IChvbmNlICYmICFsaXN0ZW5lcnNbaV0ub25jZSlcbiAgICAgICAgICB8fCAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICAgKSB7XG4gICAgICAgICAgZXZlbnRzLnB1c2gobGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIFJlc2V0IHRoZSBhcnJheSwgb3IgcmVtb3ZlIGl0IGNvbXBsZXRlbHkgaWYgd2UgaGF2ZSBubyBtb3JlIGxpc3RlbmVycy5cbiAgLy9cbiAgaWYgKGV2ZW50cy5sZW5ndGgpIHtcbiAgICB0aGlzLl9ldmVudHNbZXZ0XSA9IGV2ZW50cy5sZW5ndGggPT09IDEgPyBldmVudHNbMF0gOiBldmVudHM7XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1tldnRdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9yIG9ubHkgdGhlIGxpc3RlbmVycyBmb3IgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIGV2ZW50IHdhbnQgdG8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMpIHJldHVybiB0aGlzO1xuXG4gIGlmIChldmVudCkgZGVsZXRlIHRoaXMuX2V2ZW50c1twcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XTtcbiAgZWxzZSB0aGlzLl9ldmVudHMgPSBwcmVmaXggPyB7fSA6IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gQWxpYXMgbWV0aG9kcyBuYW1lcyBiZWNhdXNlIHBlb3BsZSByb2xsIGxpa2UgdGhhdC5cbi8vXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcblxuLy9cbi8vIFRoaXMgZnVuY3Rpb24gZG9lc24ndCBhcHBseSBhbnltb3JlLlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBFeHBvc2UgdGhlIHByZWZpeC5cbi8vXG5FdmVudEVtaXR0ZXIucHJlZml4ZWQgPSBwcmVmaXg7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5pZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ldmVudGVtaXR0ZXIzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xuICogQGF1dGhvciBtci5kb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKi9cblxudmFyIERldGVjdG9yID0ge1xuXG5cdGNhbnZhczogISEgd2luZG93LkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcblx0d2ViZ2w6ICggZnVuY3Rpb24gKCkge1xuXG5cdFx0dHJ5IHtcblxuXHRcdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7IHJldHVybiAhISAoIHdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQgJiYgKCBjYW52YXMuZ2V0Q29udGV4dCggJ3dlYmdsJyApIHx8IGNhbnZhcy5nZXRDb250ZXh0KCAnZXhwZXJpbWVudGFsLXdlYmdsJyApICkgKTtcblxuXHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHR9XG5cblx0fSApKCksXG5cdHdvcmtlcnM6ICEhIHdpbmRvdy5Xb3JrZXIsXG5cdGZpbGVhcGk6IHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYixcblxuXHRnZXRXZWJHTEVycm9yTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdGVsZW1lbnQuaWQgPSAnd2ViZ2wtZXJyb3ItbWVzc2FnZSc7XG5cdFx0ZWxlbWVudC5zdHlsZS5mb250RmFtaWx5ID0gJ21vbm9zcGFjZSc7XG5cdFx0ZWxlbWVudC5zdHlsZS5mb250U2l6ZSA9ICcxM3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSAnbm9ybWFsJztcblx0XHRlbGVtZW50LnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9ICcjZmZmJztcblx0XHRlbGVtZW50LnN0eWxlLmNvbG9yID0gJyMwMDAnO1xuXHRcdGVsZW1lbnQuc3R5bGUucGFkZGluZyA9ICcxLjVlbSc7XG5cdFx0ZWxlbWVudC5zdHlsZS53aWR0aCA9ICc0MDBweCc7XG5cdFx0ZWxlbWVudC5zdHlsZS5tYXJnaW4gPSAnNWVtIGF1dG8gMCc7XG5cblx0XHRpZiAoICEgdGhpcy53ZWJnbCApIHtcblxuXHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSB3aW5kb3cuV2ViR0xSZW5kZXJpbmdDb250ZXh0ID8gW1xuXHRcdFx0XHQnWW91ciBncmFwaGljcyBjYXJkIGRvZXMgbm90IHNlZW0gdG8gc3VwcG9ydCA8YSBocmVmPVwiaHR0cDovL2tocm9ub3Mub3JnL3dlYmdsL3dpa2kvR2V0dGluZ19hX1dlYkdMX0ltcGxlbWVudGF0aW9uXCIgc3R5bGU9XCJjb2xvcjojMDAwXCI+V2ViR0w8L2E+LjxiciAvPicsXG5cdFx0XHRcdCdGaW5kIG91dCBob3cgdG8gZ2V0IGl0IDxhIGhyZWY9XCJodHRwOi8vZ2V0LndlYmdsLm9yZy9cIiBzdHlsZT1cImNvbG9yOiMwMDBcIj5oZXJlPC9hPi4nXG5cdFx0XHRdLmpvaW4oICdcXG4nICkgOiBbXG5cdFx0XHRcdCdZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc2VlbSB0byBzdXBwb3J0IDxhIGhyZWY9XCJodHRwOi8va2hyb25vcy5vcmcvd2ViZ2wvd2lraS9HZXR0aW5nX2FfV2ViR0xfSW1wbGVtZW50YXRpb25cIiBzdHlsZT1cImNvbG9yOiMwMDBcIj5XZWJHTDwvYT4uPGJyLz4nLFxuXHRcdFx0XHQnRmluZCBvdXQgaG93IHRvIGdldCBpdCA8YSBocmVmPVwiaHR0cDovL2dldC53ZWJnbC5vcmcvXCIgc3R5bGU9XCJjb2xvcjojMDAwXCI+aGVyZTwvYT4uJ1xuXHRcdFx0XS5qb2luKCAnXFxuJyApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cblx0fSxcblxuXHRhZGRHZXRXZWJHTE1lc3NhZ2U6IGZ1bmN0aW9uICggcGFyYW1ldGVycyApIHtcblxuXHRcdHZhciBwYXJlbnQsIGlkLCBlbGVtZW50O1xuXG5cdFx0cGFyYW1ldGVycyA9IHBhcmFtZXRlcnMgfHwge307XG5cblx0XHRwYXJlbnQgPSBwYXJhbWV0ZXJzLnBhcmVudCAhPT0gdW5kZWZpbmVkID8gcGFyYW1ldGVycy5wYXJlbnQgOiBkb2N1bWVudC5ib2R5O1xuXHRcdGlkID0gcGFyYW1ldGVycy5pZCAhPT0gdW5kZWZpbmVkID8gcGFyYW1ldGVycy5pZCA6ICdvbGRpZSc7XG5cblx0XHRlbGVtZW50ID0gRGV0ZWN0b3IuZ2V0V2ViR0xFcnJvck1lc3NhZ2UoKTtcblx0XHRlbGVtZW50LmlkID0gaWQ7XG5cblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblxuXHR9XG5cbn07XG5cbi8vIGJyb3dzZXJpZnkgc3VwcG9ydFxuaWYgKCB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyApIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IERldGVjdG9yO1xuXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd2ViX21vZHVsZXMvRGV0ZWN0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgY2JzID0gW10sIFxuXHRkYXRhO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjYikge1xuXHRpZihjYnMpIGNicy5wdXNoKGNiKTtcblx0ZWxzZSBjYihkYXRhKTtcbn1cbnJlcXVpcmUuZW5zdXJlKFtdLCBmdW5jdGlvbihyZXF1aXJlKSB7XG5cdGRhdGEgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvaW5kZXguanMhLi8uLi9ub2RlX21vZHVsZXMvZXNsaW50LWxvYWRlci9pbmRleC5qcyEuL2FwcC5qc1wiKTtcblx0dmFyIGNhbGxiYWNrcyA9IGNicztcblx0Y2JzID0gbnVsbDtcblx0Zm9yKHZhciBpID0gMCwgbCA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRjYWxsYmFja3NbaV0oZGF0YSk7XG5cdH1cbn0sIFwiYXBwXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9idW5kbGUtbG9hZGVyP25hbWU9YXBwIS4vc3JjL2FwcC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=