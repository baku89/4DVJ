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
		mainWindow.loadUrl('file:///Volumes/MugiRAID1/Works/2015/29_chanel/0b/main/build/index.html');
		// mainWindow.loadUrl('file:///Users/mugi/Works/2015/25_chanel/0b/main/build/index.html')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzczMWFkYzQ5N2M3NmFhNGM2Y2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZWN0cm9uLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJyb3dzZXItd2luZG93XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3Jhc2gtcmVwb3J0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZW51XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxLQUFJLEdBQUcsR0FBRyxtQkFBTyxDQUFDLENBQUssQ0FBQztBQUN4QixLQUFJLGFBQWEsR0FBRyxtQkFBTyxDQUFDLENBQWdCLENBQUM7O0FBRTdDLG9CQUFPLENBQUMsQ0FBZ0IsQ0FBQyxDQUFDLEtBQUssRUFBRTs7QUFFakMsS0FBSSxVQUFVLEdBQUcsSUFBSTs7QUFFckIsSUFBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFNO0FBQUMsS0FBRyxDQUFDLElBQUksRUFBRTtFQUFDLENBQUM7O0FBRS9DLElBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDckIsWUFBVSxHQUFHLElBQUksYUFBYSxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUM7QUFDekQsWUFBVSxDQUFDLFlBQVksRUFBRTs7QUFFekIsWUFBVSxDQUFDLE9BQU8sQ0FBQyx5RUFBeUUsQ0FBQzs7QUFFN0YsWUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBTTtBQUM3QixhQUFVLEdBQUcsSUFBSTtHQUNqQixDQUFDOztBQUVGLGFBQVcsRUFBRTtFQUNiLENBQUM7O0FBRUYsVUFBUyxXQUFXLEdBQUc7QUFDdEIsTUFBSSxJQUFJLEdBQUcsbUJBQU8sQ0FBQyxDQUFNLENBQUM7QUFDMUIsTUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQ2pDO0FBQ0MsUUFBSyxFQUFFLFVBQVU7QUFDakIsVUFBTyxFQUFFLENBQ1I7QUFDQyxTQUFLLEVBQUUsTUFBTTtBQUNiLGVBQVcsRUFBRSxXQUFXO0FBQ3hCLFNBQUssRUFBRSxpQkFBTTtBQUFFLFFBQUcsQ0FBQyxJQUFJLEVBQUU7S0FBRTtJQUMzQixDQUNEO0dBQ0QsRUFDRDtBQUNDLFFBQUssRUFBRSxNQUFNO0FBQ2IsVUFBTyxFQUFFLENBQ1I7QUFDQyxTQUFLLEVBQUUsUUFBUTtBQUNmLGVBQVcsRUFBRSxXQUFXO0FBQ3hCLFNBQUssRUFBRSxpQkFBTTtBQUFFLGVBQVUsQ0FBQyxNQUFNLEVBQUU7S0FBRTtJQUNwQyxFQUNEO0FBQ0MsU0FBSyxFQUFFLG9CQUFvQjtBQUMzQixlQUFXLEVBQUUsZ0JBQWdCO0FBQzdCLFNBQUssRUFBRSxpQkFBTTtBQUFFLGVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7S0FBRTtJQUNyRSxFQUNEO0FBQ0MsU0FBSyxFQUFFLHdCQUF3QjtBQUMvQixlQUFXLEVBQUUsZUFBZTtBQUM1QixTQUFLLEVBQUUsaUJBQU07QUFBRSxlQUFVLENBQUMsY0FBYyxFQUFFO0tBQUU7SUFDNUMsRUFDRDtBQUNDLFNBQUssRUFBRSxPQUFPO0FBQ2QsZUFBVyxFQUFFLFdBQVc7QUFDeEIsU0FBSyxFQUFFLGlCQUFNO0FBQUMsZUFBVSxDQUFDLEtBQUssRUFBRTtLQUFDO0lBQ2pDLENBQ0Q7R0FDRCxFQUNEO0FBQ0MsUUFBSyxFQUFFLE1BQU07QUFDYixVQUFPLEVBQUUsQ0FDUixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQ2hFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUN0RSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUM5RCxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQ2hFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFDbEUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUMzRTtHQUNELENBQ0QsQ0FBQztBQUNGLE1BQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7QUN6RTlCLGlDOzs7Ozs7QUNBQSw0Qzs7Ozs7O0FDQUEsNEM7Ozs7OztBQ0FBLGtDIiwiZmlsZSI6ImVsZWN0cm9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3NzMxYWRjNDk3Yzc2YWE0YzZjYVxuICoqLyIsImxldCBhcHAgPSByZXF1aXJlKCdhcHAnKVxubGV0IEJyb3dzZXJXaW5kb3cgPSByZXF1aXJlKCdicm93c2VyLXdpbmRvdycpXG5cbnJlcXVpcmUoJ2NyYXNoLXJlcG9ydGVyJykuc3RhcnQoKVxuXG5sZXQgbWFpbldpbmRvdyA9IG51bGxcblxuYXBwLm9uKCd3aW5kb3ctYWxsLWNsb3NlZCcsICgpID0+IHthcHAucXVpdCgpfSlcblxuYXBwLm9uKCdyZWFkeScsICgpID0+IHtcblx0bWFpbldpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KHt3aWR0aDogODAwLCBoZWlnaHQ6IDYwMH0pXG5cdG1haW5XaW5kb3cub3BlbkRldlRvb2xzKClcblx0Ly8gbWFpbldpbmRvdy5sb2FkVXJsKCdmaWxlOi8vJyArIF9fZGlybmFtZSArICcvaW5kZXguaHRtbCcpXG5cdG1haW5XaW5kb3cubG9hZFVybCgnZmlsZTovLy9Wb2x1bWVzL011Z2lSQUlEMS9Xb3Jrcy8yMDE1LzI5X2NoYW5lbC8wYi9tYWluL2J1aWxkL2luZGV4Lmh0bWwnKVxuXHQvLyBtYWluV2luZG93LmxvYWRVcmwoJ2ZpbGU6Ly8vVXNlcnMvbXVnaS9Xb3Jrcy8yMDE1LzI1X2NoYW5lbC8wYi9tYWluL2J1aWxkL2luZGV4Lmh0bWwnKVxuXHRtYWluV2luZG93Lm9uKCdjbG9zZWQnLCAoKSA9PiB7XG5cdFx0bWFpbldpbmRvdyA9IG51bGxcblx0fSlcblxuXHRpbnN0YWxsTWVudSgpXG59KVxuXG5mdW5jdGlvbiBpbnN0YWxsTWVudSgpIHtcblx0bGV0IE1lbnUgPSByZXF1aXJlKCdtZW51Jylcblx0bGV0IG1lbnUgPSBNZW51LmJ1aWxkRnJvbVRlbXBsYXRlKFtcblx0XHR7XG5cdFx0XHRsYWJlbDogJ0VsZWN0cm9uJyxcblx0XHRcdHN1Ym1lbnU6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhYmVsOiAnUXVpdCcsXG5cdFx0XHRcdFx0YWNjZWxlcmF0b3I6ICdDb21tYW5kK1EnLFxuXHRcdFx0XHRcdGNsaWNrOiAoKSA9PiB7IGFwcC5xdWl0KCkgfVxuXHRcdFx0XHR9LFxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bGFiZWw6ICdWaWV3Jyxcblx0XHRcdHN1Ym1lbnU6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhYmVsOiAnUmVsb2FkJyxcblx0XHRcdFx0XHRhY2NlbGVyYXRvcjogJ0NvbW1hbmQrUicsXG5cdFx0XHRcdFx0Y2xpY2s6ICgpID0+IHsgbWFpbldpbmRvdy5yZWxvYWQoKSB9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsYWJlbDogJ1RvZ2dsZSBGdWxsIFNjcmVlbicsXG5cdFx0XHRcdFx0YWNjZWxlcmF0b3I6ICdDdHJsK0NvbW1hbmQrRicsXG5cdFx0XHRcdFx0Y2xpY2s6ICgpID0+IHsgbWFpbldpbmRvdy5zZXRGdWxsU2NyZWVuKCFtYWluV2luZG93LmlzRnVsbFNjcmVlbigpKSB9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsYWJlbDogJ1RvZ2dsZSBEZXZlbG9wZXIgVG9vbHMnLFxuXHRcdFx0XHRcdGFjY2VsZXJhdG9yOiAnQWx0K0NvbW1hbmQrSScsXG5cdFx0XHRcdFx0Y2xpY2s6ICgpID0+IHsgbWFpbldpbmRvdy50b2dnbGVEZXZUb29scygpIH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhYmVsOiAnQ2xvc2UnLFxuXHRcdFx0XHRcdGFjY2VsZXJhdG9yOiAnQ29tbWFuZCtXJyxcblx0XHRcdFx0XHRjbGljazogKCkgPT4ge21haW5XaW5kb3cuY2xvc2UoKX1cblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bGFiZWw6ICdFZGl0Jyxcblx0XHRcdHN1Ym1lbnU6IFtcblx0XHRcdFx0eyBsYWJlbDogJ1VuZG8nLCBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtaJywgc2VsZWN0b3I6ICd1bmRvOicgfSxcblx0XHRcdFx0eyBsYWJlbDogJ1JlZG8nLCBhY2NlbGVyYXRvcjogJ1NoaWZ0K0NtZE9yQ3RybCtaJywgc2VsZWN0b3I6ICdyZWRvOicgfSxcblx0XHRcdFx0eyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuXHRcdFx0XHR7IGxhYmVsOiAnQ3V0JywgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrWCcsIHNlbGVjdG9yOiAnY3V0OicgfSxcblx0XHRcdFx0eyBsYWJlbDogJ0NvcHknLCBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtDJywgc2VsZWN0b3I6ICdjb3B5OicgfSxcblx0XHRcdFx0eyBsYWJlbDogJ1Bhc3RlJywgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrVicsIHNlbGVjdG9yOiAncGFzdGU6JyB9LFxuXHRcdFx0XHR7IGxhYmVsOiAnU2VsZWN0IEFsbCcsIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK0EnLCBzZWxlY3RvcjogJ3NlbGVjdEFsbDonIH1cblx0XHRcdF1cblx0XHR9XG5cdF0pXG5cdE1lbnUuc2V0QXBwbGljYXRpb25NZW51KG1lbnUpXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9lbGVjdHJvbi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwcFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYXBwXCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJicm93c2VyLXdpbmRvd1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYnJvd3Nlci13aW5kb3dcIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyYXNoLXJlcG9ydGVyXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJjcmFzaC1yZXBvcnRlclwiXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWVudVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibWVudVwiXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==