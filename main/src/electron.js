let app = require('app')
let BrowserWindow = require('browser-window')

require('crash-reporter').start()

let mainWindow = null

app.on('window-all-closed', () => {app.quit()})

app.on('ready', () => {
	mainWindow = new BrowserWindow({width: 800, height: 600})
	mainWindow.openDevTools()
	// mainWindow.loadUrl('file://' + __dirname + '/index.html')
	// mainWindow.loadUrl('file:///Volumes/MugiRAID1/Works/2015/29_chanel/0b/main/build/index.html')
	mainWindow.loadUrl('file:///Users/mugi/Works/2015/25_chanel/0b/main/build/index.html')
	
	mainWindow.on('closed', () => {
		mainWindow = null
	})

	installMenu()
})

function installMenu() {
	let Menu = require('menu')
	let menu = Menu.buildFromTemplate([
		{
			label: 'Electron',
			submenu: [
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: () => { app.quit() }
				},
			]
		},
		{
			label: 'View',
			submenu: [
				{
					label: 'Reload',
					accelerator: 'Command+R',
					click: () => { mainWindow.reload() }
				},
				{
					label: 'Toggle Full Screen',
					accelerator: 'Ctrl+Command+F',
					click: () => { mainWindow.setFullScreen(!mainWindow.isFullScreen()) }
				},
				{
					label: 'Toggle Developer Tools',
					accelerator: 'Alt+Command+I',
					click: () => { mainWindow.toggleDevTools() }
				},
				{
					label: 'Close',
					accelerator: 'Command+W',
					click: () => {mainWindow.close()}
				}
			]
		},
		{
			label: 'Edit',
			submenu: [
				{ label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
				{ label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
				{ type: 'separator' },
				{ label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
				{ label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
				{ label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
				{ label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
			]
		}
	])
	Menu.setApplicationMenu(menu)
}
