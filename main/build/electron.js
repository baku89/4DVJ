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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjkzMDcyMWMyNTRkOTlhMzk4ZmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZWN0cm9uLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJyb3dzZXItd2luZG93XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3Jhc2gtcmVwb3J0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZW51XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxLQUFJLEdBQUcsR0FBRyxtQkFBTyxDQUFDLENBQUssQ0FBQztBQUN4QixLQUFJLGFBQWEsR0FBRyxtQkFBTyxDQUFDLENBQWdCLENBQUM7O0FBRTdDLG9CQUFPLENBQUMsQ0FBZ0IsQ0FBQyxDQUFDLEtBQUssRUFBRTs7QUFFakMsS0FBSSxVQUFVLEdBQUcsSUFBSTs7QUFFckIsSUFBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFNO0FBQUMsS0FBRyxDQUFDLElBQUksRUFBRTtFQUFDLENBQUM7O0FBRS9DLElBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDckIsWUFBVSxHQUFHLElBQUksYUFBYSxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUM7QUFDekQsWUFBVSxDQUFDLFlBQVksRUFBRTs7QUFFekIsWUFBVSxDQUFDLE9BQU8sQ0FBQyx5RUFBeUUsQ0FBQztBQUM3RixZQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFNO0FBQzdCLGFBQVUsR0FBRyxJQUFJO0dBQ2pCLENBQUM7O0FBRUYsYUFBVyxFQUFFO0VBQ2IsQ0FBQzs7QUFFRixVQUFTLFdBQVcsR0FBRztBQUN0QixNQUFJLElBQUksR0FBRyxtQkFBTyxDQUFDLENBQU0sQ0FBQztBQUMxQixNQUFJLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FDakM7QUFDQyxRQUFLLEVBQUUsVUFBVTtBQUNqQixVQUFPLEVBQUUsQ0FDUjtBQUNDLFNBQUssRUFBRSxNQUFNO0FBQ2IsZUFBVyxFQUFFLFdBQVc7QUFDeEIsU0FBSyxFQUFFLGlCQUFNO0FBQUUsUUFBRyxDQUFDLElBQUksRUFBRTtLQUFFO0lBQzNCLENBQ0Q7R0FDRCxFQUNEO0FBQ0MsUUFBSyxFQUFFLE1BQU07QUFDYixVQUFPLEVBQUUsQ0FDUjtBQUNDLFNBQUssRUFBRSxRQUFRO0FBQ2YsZUFBVyxFQUFFLFdBQVc7QUFDeEIsU0FBSyxFQUFFLGlCQUFNO0FBQUUsZUFBVSxDQUFDLE1BQU0sRUFBRTtLQUFFO0lBQ3BDLEVBQ0Q7QUFDQyxTQUFLLEVBQUUsb0JBQW9CO0FBQzNCLGVBQVcsRUFBRSxnQkFBZ0I7QUFDN0IsU0FBSyxFQUFFLGlCQUFNO0FBQUUsZUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUFFO0lBQ3JFLEVBQ0Q7QUFDQyxTQUFLLEVBQUUsd0JBQXdCO0FBQy9CLGVBQVcsRUFBRSxlQUFlO0FBQzVCLFNBQUssRUFBRSxpQkFBTTtBQUFFLGVBQVUsQ0FBQyxjQUFjLEVBQUU7S0FBRTtJQUM1QyxFQUNEO0FBQ0MsU0FBSyxFQUFFLE9BQU87QUFDZCxlQUFXLEVBQUUsV0FBVztBQUN4QixTQUFLLEVBQUUsaUJBQU07QUFBQyxlQUFVLENBQUMsS0FBSyxFQUFFO0tBQUM7SUFDakMsQ0FDRDtHQUNELEVBQ0Q7QUFDQyxRQUFLLEVBQUUsTUFBTTtBQUNiLFVBQU8sRUFBRSxDQUNSLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFDaEUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQ3RFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQzlELEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFDaEUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUNsRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLENBQzNFO0dBQ0QsQ0FDRCxDQUFDO0FBQ0YsTUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQzs7Ozs7OztBQ3hFOUIsaUM7Ozs7OztBQ0FBLDRDOzs7Ozs7QUNBQSw0Qzs7Ozs7O0FDQUEsa0MiLCJmaWxlIjoiZWxlY3Ryb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGY5MzA3MjFjMjU0ZDk5YTM5OGZlXG4gKiovIiwibGV0IGFwcCA9IHJlcXVpcmUoJ2FwcCcpXG5sZXQgQnJvd3NlcldpbmRvdyA9IHJlcXVpcmUoJ2Jyb3dzZXItd2luZG93JylcblxucmVxdWlyZSgnY3Jhc2gtcmVwb3J0ZXInKS5zdGFydCgpXG5cbmxldCBtYWluV2luZG93ID0gbnVsbFxuXG5hcHAub24oJ3dpbmRvdy1hbGwtY2xvc2VkJywgKCkgPT4ge2FwcC5xdWl0KCl9KVxuXG5hcHAub24oJ3JlYWR5JywgKCkgPT4ge1xuXHRtYWluV2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coe3dpZHRoOiA4MDAsIGhlaWdodDogNjAwfSlcblx0bWFpbldpbmRvdy5vcGVuRGV2VG9vbHMoKVxuXHQvLyBtYWluV2luZG93LmxvYWRVcmwoJ2ZpbGU6Ly8nICsgX19kaXJuYW1lICsgJy9pbmRleC5odG1sJylcblx0bWFpbldpbmRvdy5sb2FkVXJsKCdmaWxlOi8vL1ZvbHVtZXMvTXVnaVJBSUQxL1dvcmtzLzIwMTUvMjlfY2hhbmVsLzBiL21haW4vYnVpbGQvaW5kZXguaHRtbCcpXG5cdG1haW5XaW5kb3cub24oJ2Nsb3NlZCcsICgpID0+IHtcblx0XHRtYWluV2luZG93ID0gbnVsbFxuXHR9KVxuXG5cdGluc3RhbGxNZW51KClcbn0pXG5cbmZ1bmN0aW9uIGluc3RhbGxNZW51KCkge1xuXHRsZXQgTWVudSA9IHJlcXVpcmUoJ21lbnUnKVxuXHRsZXQgbWVudSA9IE1lbnUuYnVpbGRGcm9tVGVtcGxhdGUoW1xuXHRcdHtcblx0XHRcdGxhYmVsOiAnRWxlY3Ryb24nLFxuXHRcdFx0c3VibWVudTogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFiZWw6ICdRdWl0Jyxcblx0XHRcdFx0XHRhY2NlbGVyYXRvcjogJ0NvbW1hbmQrUScsXG5cdFx0XHRcdFx0Y2xpY2s6ICgpID0+IHsgYXBwLnF1aXQoKSB9XG5cdFx0XHRcdH0sXG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRsYWJlbDogJ1ZpZXcnLFxuXHRcdFx0c3VibWVudTogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFiZWw6ICdSZWxvYWQnLFxuXHRcdFx0XHRcdGFjY2VsZXJhdG9yOiAnQ29tbWFuZCtSJyxcblx0XHRcdFx0XHRjbGljazogKCkgPT4geyBtYWluV2luZG93LnJlbG9hZCgpIH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhYmVsOiAnVG9nZ2xlIEZ1bGwgU2NyZWVuJyxcblx0XHRcdFx0XHRhY2NlbGVyYXRvcjogJ0N0cmwrQ29tbWFuZCtGJyxcblx0XHRcdFx0XHRjbGljazogKCkgPT4geyBtYWluV2luZG93LnNldEZ1bGxTY3JlZW4oIW1haW5XaW5kb3cuaXNGdWxsU2NyZWVuKCkpIH1cblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhYmVsOiAnVG9nZ2xlIERldmVsb3BlciBUb29scycsXG5cdFx0XHRcdFx0YWNjZWxlcmF0b3I6ICdBbHQrQ29tbWFuZCtJJyxcblx0XHRcdFx0XHRjbGljazogKCkgPT4geyBtYWluV2luZG93LnRvZ2dsZURldlRvb2xzKCkgfVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFiZWw6ICdDbG9zZScsXG5cdFx0XHRcdFx0YWNjZWxlcmF0b3I6ICdDb21tYW5kK1cnLFxuXHRcdFx0XHRcdGNsaWNrOiAoKSA9PiB7bWFpbldpbmRvdy5jbG9zZSgpfVxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRsYWJlbDogJ0VkaXQnLFxuXHRcdFx0c3VibWVudTogW1xuXHRcdFx0XHR7IGxhYmVsOiAnVW5kbycsIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK1onLCBzZWxlY3RvcjogJ3VuZG86JyB9LFxuXHRcdFx0XHR7IGxhYmVsOiAnUmVkbycsIGFjY2VsZXJhdG9yOiAnU2hpZnQrQ21kT3JDdHJsK1onLCBzZWxlY3RvcjogJ3JlZG86JyB9LFxuXHRcdFx0XHR7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG5cdFx0XHRcdHsgbGFiZWw6ICdDdXQnLCBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtYJywgc2VsZWN0b3I6ICdjdXQ6JyB9LFxuXHRcdFx0XHR7IGxhYmVsOiAnQ29weScsIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK0MnLCBzZWxlY3RvcjogJ2NvcHk6JyB9LFxuXHRcdFx0XHR7IGxhYmVsOiAnUGFzdGUnLCBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtWJywgc2VsZWN0b3I6ICdwYXN0ZTonIH0sXG5cdFx0XHRcdHsgbGFiZWw6ICdTZWxlY3QgQWxsJywgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrQScsIHNlbGVjdG9yOiAnc2VsZWN0QWxsOicgfVxuXHRcdFx0XVxuXHRcdH1cblx0XSlcblx0TWVudS5zZXRBcHBsaWNhdGlvbk1lbnUobWVudSlcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2VsZWN0cm9uLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBwXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhcHBcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJyb3dzZXItd2luZG93XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJicm93c2VyLXdpbmRvd1wiXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3Jhc2gtcmVwb3J0ZXJcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImNyYXNoLXJlcG9ydGVyXCJcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZW51XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJtZW51XCJcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9