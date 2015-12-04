/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
	
	var app = __webpack_require__(1);
	var BrowserWindow = __webpack_require__(2);
	
	__webpack_require__(3).start();
	
	var mainWindow = null;
	
	app.on('window-all-closed', function () {
		app.quit();
	});
	
	app.on('ready', function () {
		mainWindow = new BrowserWindow({ width: 800, height: 600 });
		mainWindow.openDevTools();
		// mainWindow.loadUrl('file://' + __dirname + '/index.html')
		// mainWindow.loadUrl('file:///Volumes/MugiRAID1/Works/2015/29_chanel/0b/main/build/index.html')
		mainWindow.loadUrl('file:///Users/mugi/Works/2015/25_chanel/0b/main/build/index.html');
	
		mainWindow.on('closed', function () {
			mainWindow = null;
		});
	
		installMenu();
	});
	
	function installMenu() {
		var Menu = __webpack_require__(4);
		var menu = Menu.buildFromTemplate([{
			label: 'Electron',
			submenu: [{
				label: 'Quit',
				accelerator: 'Command+Q',
				click: function click() {
					app.quit();
				}
			}]
		}, {
			label: 'View',
			submenu: [{
				label: 'Reload',
				accelerator: 'Command+R',
				click: function click() {
					mainWindow.reload();
				}
			}, {
				label: 'Toggle Full Screen',
				accelerator: 'Ctrl+Command+F',
				click: function click() {
					mainWindow.setFullScreen(!mainWindow.isFullScreen());
				}
			}, {
				label: 'Toggle Developer Tools',
				accelerator: 'Alt+Command+I',
				click: function click() {
					mainWindow.toggleDevTools();
				}
			}, {
				label: 'Close',
				accelerator: 'Command+W',
				click: function click() {
					mainWindow.close();
				}
			}]
		}, {
			label: 'Edit',
			submenu: [{ label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' }, { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' }, { type: 'separator' }, { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' }, { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' }, { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' }, { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }]
		}]);
		Menu.setApplicationMenu(menu);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("app");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("browser-window");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("crash-reporter");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("menu");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmYxZWQ3OWExY2E1YWNlZjFhMTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZWN0cm9uLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJyb3dzZXItd2luZG93XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3Jhc2gtcmVwb3J0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZW51XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxLQUFJLEdBQUcsR0FBRyxtQkFBTyxDQUFDLENBQUssQ0FBQztBQUN4QixLQUFJLGFBQWEsR0FBRyxtQkFBTyxDQUFDLENBQWdCLENBQUM7O0FBRTdDLG9CQUFPLENBQUMsQ0FBZ0IsQ0FBQyxDQUFDLEtBQUssRUFBRTs7QUFFakMsS0FBSSxVQUFVLEdBQUcsSUFBSTs7QUFFckIsSUFBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFNO0FBQUMsS0FBRyxDQUFDLElBQUksRUFBRTtFQUFDLENBQUM7O0FBRS9DLElBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDckIsWUFBVSxHQUFHLElBQUksYUFBYSxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUM7QUFDekQsWUFBVSxDQUFDLFlBQVksRUFBRTs7O0FBR3pCLFlBQVUsQ0FBQyxPQUFPLENBQUMsa0VBQWtFLENBQUM7O0FBRXRGLFlBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQU07QUFDN0IsYUFBVSxHQUFHLElBQUk7R0FDakIsQ0FBQzs7QUFFRixhQUFXLEVBQUU7RUFDYixDQUFDOztBQUVGLFVBQVMsV0FBVyxHQUFHO0FBQ3RCLE1BQUksSUFBSSxHQUFHLG1CQUFPLENBQUMsQ0FBTSxDQUFDO0FBQzFCLE1BQUksSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUNqQztBQUNDLFFBQUssRUFBRSxVQUFVO0FBQ2pCLFVBQU8sRUFBRSxDQUNSO0FBQ0MsU0FBSyxFQUFFLE1BQU07QUFDYixlQUFXLEVBQUUsV0FBVztBQUN4QixTQUFLLEVBQUUsaUJBQU07QUFBRSxRQUFHLENBQUMsSUFBSSxFQUFFO0tBQUU7SUFDM0IsQ0FDRDtHQUNELEVBQ0Q7QUFDQyxRQUFLLEVBQUUsTUFBTTtBQUNiLFVBQU8sRUFBRSxDQUNSO0FBQ0MsU0FBSyxFQUFFLFFBQVE7QUFDZixlQUFXLEVBQUUsV0FBVztBQUN4QixTQUFLLEVBQUUsaUJBQU07QUFBRSxlQUFVLENBQUMsTUFBTSxFQUFFO0tBQUU7SUFDcEMsRUFDRDtBQUNDLFNBQUssRUFBRSxvQkFBb0I7QUFDM0IsZUFBVyxFQUFFLGdCQUFnQjtBQUM3QixTQUFLLEVBQUUsaUJBQU07QUFBRSxlQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQUU7SUFDckUsRUFDRDtBQUNDLFNBQUssRUFBRSx3QkFBd0I7QUFDL0IsZUFBVyxFQUFFLGVBQWU7QUFDNUIsU0FBSyxFQUFFLGlCQUFNO0FBQUUsZUFBVSxDQUFDLGNBQWMsRUFBRTtLQUFFO0lBQzVDLEVBQ0Q7QUFDQyxTQUFLLEVBQUUsT0FBTztBQUNkLGVBQVcsRUFBRSxXQUFXO0FBQ3hCLFNBQUssRUFBRSxpQkFBTTtBQUFDLGVBQVUsQ0FBQyxLQUFLLEVBQUU7S0FBQztJQUNqQyxDQUNEO0dBQ0QsRUFDRDtBQUNDLFFBQUssRUFBRSxNQUFNO0FBQ2IsVUFBTyxFQUFFLENBQ1IsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUNoRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFDdEUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFDOUQsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUNoRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQ2xFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsQ0FDM0U7R0FDRCxDQUNELENBQUM7QUFDRixNQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0FDMUU5QixpQzs7Ozs7O0FDQUEsNEM7Ozs7OztBQ0FBLDRDOzs7Ozs7QUNBQSxrQyIsImZpbGUiOiJlbGVjdHJvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZmYxZWQ3OWExY2E1YWNlZjFhMTNcbiAqKi8iLCJsZXQgYXBwID0gcmVxdWlyZSgnYXBwJylcbmxldCBCcm93c2VyV2luZG93ID0gcmVxdWlyZSgnYnJvd3Nlci13aW5kb3cnKVxuXG5yZXF1aXJlKCdjcmFzaC1yZXBvcnRlcicpLnN0YXJ0KClcblxubGV0IG1haW5XaW5kb3cgPSBudWxsXG5cbmFwcC5vbignd2luZG93LWFsbC1jbG9zZWQnLCAoKSA9PiB7YXBwLnF1aXQoKX0pXG5cbmFwcC5vbigncmVhZHknLCAoKSA9PiB7XG5cdG1haW5XaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7d2lkdGg6IDgwMCwgaGVpZ2h0OiA2MDB9KVxuXHRtYWluV2luZG93Lm9wZW5EZXZUb29scygpXG5cdC8vIG1haW5XaW5kb3cubG9hZFVybCgnZmlsZTovLycgKyBfX2Rpcm5hbWUgKyAnL2luZGV4Lmh0bWwnKVxuXHQvLyBtYWluV2luZG93LmxvYWRVcmwoJ2ZpbGU6Ly8vVm9sdW1lcy9NdWdpUkFJRDEvV29ya3MvMjAxNS8yOV9jaGFuZWwvMGIvbWFpbi9idWlsZC9pbmRleC5odG1sJylcblx0bWFpbldpbmRvdy5sb2FkVXJsKCdmaWxlOi8vL1VzZXJzL211Z2kvV29ya3MvMjAxNS8yNV9jaGFuZWwvMGIvbWFpbi9idWlsZC9pbmRleC5odG1sJylcblx0XG5cdG1haW5XaW5kb3cub24oJ2Nsb3NlZCcsICgpID0+IHtcblx0XHRtYWluV2luZG93ID0gbnVsbFxuXHR9KVxuXG5cdGluc3RhbGxNZW51KClcbn0pXG5cbmZ1bmN0aW9uIGluc3RhbGxNZW51KCkge1xuXHRsZXQgTWVudSA9IHJlcXVpcmUoJ21lbnUnKVxuXHRsZXQgbWVudSA9IE1lbnUuYnVpbGRGcm9tVGVtcGxhdGUoW1xuXHRcdHtcblx0XHRcdGxhYmVsOiAnRWxlY3Ryb24nLFxuXHRcdFx0c3VibWVudTogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFiZWw6ICdRdWl0Jyxcblx0XHRcdFx0XHRhY2NlbGVyYXRvcjogJ0NvbW1hbmQrUScsXG5cdFx0XHRcdFx0Y2xpY2s6ICgpID0+IHsgYXBwLnF1aXQoKSB9XG5cdFx0XHRcdH0sXG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRsYWJlbDogJ1ZpZXcnLFxuXHRcdFx0c3VibWVudTogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFiZWw6ICdSZWxvYWQnLFxuXHRcdFx0XHRcdGFjY2VsZXJhdG9yOiAnQ29tbWFuZCtSJyxcblx0XHRcdFx0XHRjbGljazogKCkgPT4geyBtYWluV2luZG93LnJlbG9hZCgpIH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhYmVsOiAnVG9nZ2xlIEZ1bGwgU2NyZWVuJyxcblx0XHRcdFx0XHRhY2NlbGVyYXRvcjogJ0N0cmwrQ29tbWFuZCtGJyxcblx0XHRcdFx0XHRjbGljazogKCkgPT4geyBtYWluV2luZG93LnNldEZ1bGxTY3JlZW4oIW1haW5XaW5kb3cuaXNGdWxsU2NyZWVuKCkpIH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhYmVsOiAnVG9nZ2xlIERldmVsb3BlciBUb29scycsXG5cdFx0XHRcdFx0YWNjZWxlcmF0b3I6ICdBbHQrQ29tbWFuZCtJJyxcblx0XHRcdFx0XHRjbGljazogKCkgPT4geyBtYWluV2luZG93LnRvZ2dsZURldlRvb2xzKCkgfVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFiZWw6ICdDbG9zZScsXG5cdFx0XHRcdFx0YWNjZWxlcmF0b3I6ICdDb21tYW5kK1cnLFxuXHRcdFx0XHRcdGNsaWNrOiAoKSA9PiB7bWFpbldpbmRvdy5jbG9zZSgpfVxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRsYWJlbDogJ0VkaXQnLFxuXHRcdFx0c3VibWVudTogW1xuXHRcdFx0XHR7IGxhYmVsOiAnVW5kbycsIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK1onLCBzZWxlY3RvcjogJ3VuZG86JyB9LFxuXHRcdFx0XHR7IGxhYmVsOiAnUmVkbycsIGFjY2VsZXJhdG9yOiAnU2hpZnQrQ21kT3JDdHJsK1onLCBzZWxlY3RvcjogJ3JlZG86JyB9LFxuXHRcdFx0XHR7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG5cdFx0XHRcdHsgbGFiZWw6ICdDdXQnLCBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtYJywgc2VsZWN0b3I6ICdjdXQ6JyB9LFxuXHRcdFx0XHR7IGxhYmVsOiAnQ29weScsIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK0MnLCBzZWxlY3RvcjogJ2NvcHk6JyB9LFxuXHRcdFx0XHR7IGxhYmVsOiAnUGFzdGUnLCBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtWJywgc2VsZWN0b3I6ICdwYXN0ZTonIH0sXG5cdFx0XHRcdHsgbGFiZWw6ICdTZWxlY3QgQWxsJywgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrQScsIHNlbGVjdG9yOiAnc2VsZWN0QWxsOicgfVxuXHRcdFx0XVxuXHRcdH1cblx0XSlcblx0TWVudS5zZXRBcHBsaWNhdGlvbk1lbnUobWVudSlcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2VsZWN0cm9uLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBwXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhcHBcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJyb3dzZXItd2luZG93XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJicm93c2VyLXdpbmRvd1wiXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3Jhc2gtcmVwb3J0ZXJcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImNyYXNoLXJlcG9ydGVyXCJcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZW51XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJtZW51XCJcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9