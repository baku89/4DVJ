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
		mainWindow.loadUrl('file:///Volumes/MugiRAID1/Works/2015/29_chanel/0b/01_Electron_Test/build/main.html');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2U3MDdhZGU1ZDAyMGE1MDVjY2IiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZWN0cm9uLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFwcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJyb3dzZXItd2luZG93XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3Jhc2gtcmVwb3J0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZW51XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxLQUFJLEdBQUcsR0FBRyxtQkFBTyxDQUFDLENBQUssQ0FBQztBQUN4QixLQUFJLGFBQWEsR0FBRyxtQkFBTyxDQUFDLENBQWdCLENBQUM7O0FBRTdDLG9CQUFPLENBQUMsQ0FBZ0IsQ0FBQyxDQUFDLEtBQUssRUFBRTs7QUFFakMsS0FBSSxVQUFVLEdBQUcsSUFBSTs7QUFFckIsSUFBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFNO0FBQUMsS0FBRyxDQUFDLElBQUksRUFBRTtFQUFDLENBQUM7O0FBRS9DLElBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDckIsWUFBVSxHQUFHLElBQUksYUFBYSxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUM7QUFDekQsWUFBVSxDQUFDLFlBQVksRUFBRTs7QUFFekIsWUFBVSxDQUFDLE9BQU8sQ0FBQyxvRkFBb0YsQ0FBQztBQUN4RyxZQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFNO0FBQzdCLGFBQVUsR0FBRyxJQUFJO0dBQ2pCLENBQUM7O0FBRUYsYUFBVyxFQUFFO0VBQ2IsQ0FBQzs7QUFFRixVQUFTLFdBQVcsR0FBRztBQUN0QixNQUFJLElBQUksR0FBRyxtQkFBTyxDQUFDLENBQU0sQ0FBQztBQUMxQixNQUFJLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FDakM7QUFDQyxRQUFLLEVBQUUsVUFBVTtBQUNqQixVQUFPLEVBQUUsQ0FDUjtBQUNDLFNBQUssRUFBRSxNQUFNO0FBQ2IsZUFBVyxFQUFFLFdBQVc7QUFDeEIsU0FBSyxFQUFFLGlCQUFNO0FBQUUsUUFBRyxDQUFDLElBQUksRUFBRTtLQUFFO0lBQzNCLENBQ0Q7R0FDRCxFQUNEO0FBQ0MsUUFBSyxFQUFFLE1BQU07QUFDYixVQUFPLEVBQUUsQ0FDUjtBQUNDLFNBQUssRUFBRSxRQUFRO0FBQ2YsZUFBVyxFQUFFLFdBQVc7QUFDeEIsU0FBSyxFQUFFLGlCQUFNO0FBQUUsZUFBVSxDQUFDLE1BQU0sRUFBRTtLQUFFO0lBQ3BDLEVBQ0Q7QUFDQyxTQUFLLEVBQUUsb0JBQW9CO0FBQzNCLGVBQVcsRUFBRSxnQkFBZ0I7QUFDN0IsU0FBSyxFQUFFLGlCQUFNO0FBQUUsZUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUFFO0lBQ3JFLEVBQ0Q7QUFDQyxTQUFLLEVBQUUsd0JBQXdCO0FBQy9CLGVBQVcsRUFBRSxlQUFlO0FBQzVCLFNBQUssRUFBRSxpQkFBTTtBQUFFLGVBQVUsQ0FBQyxjQUFjLEVBQUU7S0FBRTtJQUM1QyxFQUNEO0FBQ0MsU0FBSyxFQUFFLE9BQU87QUFDZCxlQUFXLEVBQUUsV0FBVztBQUN4QixTQUFLLEVBQUUsaUJBQU07QUFBQyxlQUFVLENBQUMsS0FBSyxFQUFFO0tBQUM7SUFDakMsQ0FDRDtHQUNELEVBQ0Q7QUFDQyxRQUFLLEVBQUUsTUFBTTtBQUNiLFVBQU8sRUFBRSxDQUNSLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFDaEUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQ3RFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQzlELEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFDaEUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUNsRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLENBQzNFO0dBQ0QsQ0FDRCxDQUFDO0FBQ0YsTUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQzs7Ozs7OztBQ3hFOUIsaUM7Ozs7OztBQ0FBLDRDOzs7Ozs7QUNBQSw0Qzs7Ozs7O0FDQUEsa0MiLCJmaWxlIjoiZWxlY3Ryb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDNlNzA3YWRlNWQwMjBhNTA1Y2NiXG4gKiovIiwibGV0IGFwcCA9IHJlcXVpcmUoJ2FwcCcpXG5sZXQgQnJvd3NlcldpbmRvdyA9IHJlcXVpcmUoJ2Jyb3dzZXItd2luZG93JylcblxucmVxdWlyZSgnY3Jhc2gtcmVwb3J0ZXInKS5zdGFydCgpXG5cbmxldCBtYWluV2luZG93ID0gbnVsbFxuXG5hcHAub24oJ3dpbmRvdy1hbGwtY2xvc2VkJywgKCkgPT4ge2FwcC5xdWl0KCl9KVxuXG5hcHAub24oJ3JlYWR5JywgKCkgPT4ge1xuXHRtYWluV2luZG93ID0gbmV3IEJyb3dzZXJXaW5kb3coe3dpZHRoOiA4MDAsIGhlaWdodDogNjAwfSlcblx0bWFpbldpbmRvdy5vcGVuRGV2VG9vbHMoKVxuXHQvLyBtYWluV2luZG93LmxvYWRVcmwoJ2ZpbGU6Ly8nICsgX19kaXJuYW1lICsgJy9pbmRleC5odG1sJylcblx0bWFpbldpbmRvdy5sb2FkVXJsKCdmaWxlOi8vL1ZvbHVtZXMvTXVnaVJBSUQxL1dvcmtzLzIwMTUvMjlfY2hhbmVsLzBiLzAxX0VsZWN0cm9uX1Rlc3QvYnVpbGQvbWFpbi5odG1sJylcblx0bWFpbldpbmRvdy5vbignY2xvc2VkJywgKCkgPT4ge1xuXHRcdG1haW5XaW5kb3cgPSBudWxsXG5cdH0pXG5cblx0aW5zdGFsbE1lbnUoKVxufSlcblxuZnVuY3Rpb24gaW5zdGFsbE1lbnUoKSB7XG5cdGxldCBNZW51ID0gcmVxdWlyZSgnbWVudScpXG5cdGxldCBtZW51ID0gTWVudS5idWlsZEZyb21UZW1wbGF0ZShbXG5cdFx0e1xuXHRcdFx0bGFiZWw6ICdFbGVjdHJvbicsXG5cdFx0XHRzdWJtZW51OiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsYWJlbDogJ1F1aXQnLFxuXHRcdFx0XHRcdGFjY2VsZXJhdG9yOiAnQ29tbWFuZCtRJyxcblx0XHRcdFx0XHRjbGljazogKCkgPT4geyBhcHAucXVpdCgpIH1cblx0XHRcdFx0fSxcblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdGxhYmVsOiAnVmlldycsXG5cdFx0XHRzdWJtZW51OiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsYWJlbDogJ1JlbG9hZCcsXG5cdFx0XHRcdFx0YWNjZWxlcmF0b3I6ICdDb21tYW5kK1InLFxuXHRcdFx0XHRcdGNsaWNrOiAoKSA9PiB7IG1haW5XaW5kb3cucmVsb2FkKCkgfVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFiZWw6ICdUb2dnbGUgRnVsbCBTY3JlZW4nLFxuXHRcdFx0XHRcdGFjY2VsZXJhdG9yOiAnQ3RybCtDb21tYW5kK0YnLFxuXHRcdFx0XHRcdGNsaWNrOiAoKSA9PiB7IG1haW5XaW5kb3cuc2V0RnVsbFNjcmVlbighbWFpbldpbmRvdy5pc0Z1bGxTY3JlZW4oKSkgfVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFiZWw6ICdUb2dnbGUgRGV2ZWxvcGVyIFRvb2xzJyxcblx0XHRcdFx0XHRhY2NlbGVyYXRvcjogJ0FsdCtDb21tYW5kK0knLFxuXHRcdFx0XHRcdGNsaWNrOiAoKSA9PiB7IG1haW5XaW5kb3cudG9nZ2xlRGV2VG9vbHMoKSB9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsYWJlbDogJ0Nsb3NlJyxcblx0XHRcdFx0XHRhY2NlbGVyYXRvcjogJ0NvbW1hbmQrVycsXG5cdFx0XHRcdFx0Y2xpY2s6ICgpID0+IHttYWluV2luZG93LmNsb3NlKCl9XG5cdFx0XHRcdH1cblx0XHRcdF1cblx0XHR9LFxuXHRcdHtcblx0XHRcdGxhYmVsOiAnRWRpdCcsXG5cdFx0XHRzdWJtZW51OiBbXG5cdFx0XHRcdHsgbGFiZWw6ICdVbmRvJywgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrWicsIHNlbGVjdG9yOiAndW5kbzonIH0sXG5cdFx0XHRcdHsgbGFiZWw6ICdSZWRvJywgYWNjZWxlcmF0b3I6ICdTaGlmdCtDbWRPckN0cmwrWicsIHNlbGVjdG9yOiAncmVkbzonIH0sXG5cdFx0XHRcdHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcblx0XHRcdFx0eyBsYWJlbDogJ0N1dCcsIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK1gnLCBzZWxlY3RvcjogJ2N1dDonIH0sXG5cdFx0XHRcdHsgbGFiZWw6ICdDb3B5JywgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrQycsIHNlbGVjdG9yOiAnY29weTonIH0sXG5cdFx0XHRcdHsgbGFiZWw6ICdQYXN0ZScsIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK1YnLCBzZWxlY3RvcjogJ3Bhc3RlOicgfSxcblx0XHRcdFx0eyBsYWJlbDogJ1NlbGVjdCBBbGwnLCBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtBJywgc2VsZWN0b3I6ICdzZWxlY3RBbGw6JyB9XG5cdFx0XHRdXG5cdFx0fVxuXHRdKVxuXHRNZW51LnNldEFwcGxpY2F0aW9uTWVudShtZW51KVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZWxlY3Ryb24uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcHBcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFwcFwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYnJvd3Nlci13aW5kb3dcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJyb3dzZXItd2luZG93XCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcmFzaC1yZXBvcnRlclwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiY3Jhc2gtcmVwb3J0ZXJcIlxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1lbnVcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIm1lbnVcIlxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=