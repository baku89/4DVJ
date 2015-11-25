'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('./common');

var App = (function () {
	function App() {
		_classCallCheck(this, App);

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

			window.addEventListener('resize', this.onResize.bind(this));
			window.addEventListener('click', this.onClick.bind(this));
		}
	}, {
		key: 'initObject',
		value: function initObject() {
			var geometry = new THREE.BoxGeometry(100, 100, 100);
			var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

			var cube = new THREE.Mesh(geometry, material);
			this.scene.add(cube);
		}
	}, {
		key: 'animate',
		value: function animate() {
			requestAnimationFrame(this.animate.bind(this));
			this.renderer.render(this.scene, this.camera);
		}
	}, {
		key: 'onResize',
		value: function onResize() {}
	}, {
		key: 'onClick',
		value: function onClick() {}
	}]);

	return App;
})();

window.app = new App();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7O0lBRWIsR0FBRztBQUVSLFVBRkssR0FBRyxHQUVNO3dCQUZULEdBQUc7O0FBR1AsTUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO0FBQ2hCLE1BQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtBQUNqQixNQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7RUFDZDs7Y0FOSSxHQUFHOzs4QkFRSTtBQUNYLE9BQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDOUYsT0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtBQUM1QixPQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFBO0FBQzlCLE9BQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDO0FBQ3ZDLFVBQU0sRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztJQUN2QyxDQUFDLENBQUE7QUFDRixPQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTs7QUFFNUQsU0FBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQzNELFNBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtHQUN6RDs7OytCQUVZO0FBQ1osT0FBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDbkQsT0FBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQTs7QUFFNUQsT0FBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUM3QyxPQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtHQUNwQjs7OzRCQUdTO0FBQ1Qsd0JBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUM5QyxPQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtHQUM3Qzs7OzZCQUVVLEVBRVY7Ozs0QkFFUyxFQUVUOzs7UUF6Q0ksR0FBRzs7O0FBOENULE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuL2NvbW1vbicpXG5cbmNsYXNzIEFwcCB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5pbml0U2NlbmUoKVxuXHRcdHRoaXMuaW5pdE9iamVjdCgpXG5cdFx0dGhpcy5hbmltYXRlKClcblx0fVxuXG5cdGluaXRTY2VuZSgpIHtcblx0XHR0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg2MCwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDEsIDEwMDApXG5cdFx0dGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IDMwMFxuXHRcdHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKVxuXHRcdHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG5cdFx0XHRjYW52YXM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJylcblx0XHR9KVxuXHRcdHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KVxuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSlcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSlcblx0fVxuXG5cdGluaXRPYmplY3QoKSB7XG5cdFx0bGV0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDEwMCwgMTAwLCAxMDApXG5cdFx0bGV0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtjb2xvcjoweDAwZmYwMH0pXG5cblx0XHRsZXQgY3ViZSA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbClcblx0XHR0aGlzLnNjZW5lLmFkZChjdWJlKVxuXHR9XG5cblxuXHRhbmltYXRlKCkge1xuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSlcblx0XHR0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSlcblx0fVxuXG5cdG9uUmVzaXplKCkge1xuXG5cdH1cblxuXHRvbkNsaWNrKCkge1xuXG5cdH1cblxufVxuXG5cbndpbmRvdy5hcHAgPSBuZXcgQXBwKClcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
