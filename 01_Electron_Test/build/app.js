'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

require('./common');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

require('./lib/OrbitControls');

var _glslify = require('glslify');

var _glslify2 = _interopRequireDefault(_glslify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = (function () {
	function App() {
		_classCallCheck(this, App);

		var frag = (0, _glslify2.default)(__dirname + '/../src/shaders/basic.frag');

		console.log("Unco", frag);

		this.initScene();
		this.initObject();
		this.animate();
	}

	_createClass(App, [{
		key: 'initScene',
		value: function initScene() {
			this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
			this.camera.position.z = 300;
			this.scene = new THREE.Scene();
			this.renderer = new THREE.WebGLRenderer({
				canvas: document.getElementById('main')
			});
			this.renderer.setSize(window.innerWidth, window.innerHeight);

			this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

			window.addEventListener('resize', this.onResize.bind(this));
			window.addEventListener('click', this.onClick.bind(this));
		}
	}, {
		key: 'initObject',
		value: function initObject() {
			var geometry = new THREE.BoxGeometry(100, 100, 100);
			var material = new THREE.ShaderMaterial({
				uniforms: {},
				vertexShader: (0, _glslify2.default)('./shaders/basic.vert'),
				fragmentShader: (0, _glslify2.default)('./shaders/basic.frag')
			});

			var cube = new THREE.Mesh(geometry, material);
			this.scene.add(cube);

			{
				// generate helper
				this.scene.add(new THREE.GridHelper(1000, 20));
				this.scene.add(new THREE.AxisHelper(200));
			}
		}
	}, {
		key: 'animate',
		value: function animate() {
			requestAnimationFrame(this.animate.bind(this));
			this.renderer.render(this.scene, this.camera);
		}
	}, {
		key: 'onResize',
		value: function onResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
		}
	}, {
		key: 'onClick',
		value: function onClick() {}
	}]);

	return App;
})();

window.app = new App();
//# sourceMappingURL=data:application/json;base64,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TUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUE7QUFDM0QsT0FBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFBO0FBQ3BDLE9BQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0dBQzVEOzs7NEJBRVMsRUFFVDs7O1FBNURJLEdBQUc7OztBQWdFVCxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2NvbW1vbidcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCdcbmltcG9ydCAnLi9saWIvT3JiaXRDb250cm9scydcbmltcG9ydCBnbHNsaWZ5IGZyb20gJ2dsc2xpZnknXG5cbmNsYXNzIEFwcCB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRsZXQgZnJhZyA9IGdsc2xpZnkoX19kaXJuYW1lICsgJy8uLi9zcmMvc2hhZGVycy9iYXNpYy5mcmFnJylcblxuXHRcdGNvbnNvbGUubG9nKFwiVW5jb1wiLCBmcmFnKVxuXG5cdFx0dGhpcy5pbml0U2NlbmUoKVxuXHRcdHRoaXMuaW5pdE9iamVjdCgpXG5cdFx0dGhpcy5hbmltYXRlKClcblx0fVxuXG5cdGluaXRTY2VuZSgpIHtcblx0XHR0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg2MCwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDEsIDEwMDApXG5cdFx0dGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IDMwMFxuXHRcdHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKVxuXHRcdHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG5cdFx0XHRjYW52YXM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJylcblx0XHR9KVxuXHRcdHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuXG5cdFx0dGhpcy5jb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljay5iaW5kKHRoaXMpKVxuXHR9XG5cblx0aW5pdE9iamVjdCgpIHtcblx0XHRsZXQgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMTAwLCAxMDAsIDEwMClcblx0XHRsZXQgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoe1xuXHRcdFx0dW5pZm9ybXM6IHt9LFxuXHRcdFx0dmVydGV4U2hhZGVyOiBnbHNsaWZ5KCcuL3NoYWRlcnMvYmFzaWMudmVydCcpLFxuXHRcdFx0ZnJhZ21lbnRTaGFkZXI6IGdsc2xpZnkoJy4vc2hhZGVycy9iYXNpYy5mcmFnJylcblx0XHR9KVxuXG5cdFx0bGV0IGN1YmUgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpXG5cdFx0dGhpcy5zY2VuZS5hZGQoY3ViZSlcblxuXHRcdHtcblx0XHRcdC8vIGdlbmVyYXRlIGhlbHBlclxuXHRcdFx0dGhpcy5zY2VuZS5hZGQobmV3IFRIUkVFLkdyaWRIZWxwZXIoMTAwMCwgMjApKVxuXHRcdFx0dGhpcy5zY2VuZS5hZGQobmV3IFRIUkVFLkF4aXNIZWxwZXIoMjAwKSlcblxuXHRcdH1cblx0fVxuXG5cdGFuaW1hdGUoKSB7XG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZS5iaW5kKHRoaXMpKVxuXHRcdHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKVxuXHR9XG5cblx0b25SZXNpemUoKSB7XG5cdFx0dGhpcy5jYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHRcblx0XHR0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcblx0XHR0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodClcblx0fVxuXG5cdG9uQ2xpY2soKSB7XG5cblx0fVxuXG59XG5cbndpbmRvdy5hcHAgPSBuZXcgQXBwKClcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
