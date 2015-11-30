let app = require('app')
let BrowserWindow = require('browser-window');


require('crash-reporter').start();

let mainWindow = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.on('closed', () => {
    mainWindow = null;
  })

  installMenu()
});


function installMenu() {
  var Menu = require('menu');
  let menu = Menu.buildFromTemplate([
    {
      label: 'Electron',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() { app.quit(); }
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: function() { mainWindow.reload(); }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: function() { mainWindow.setFullScreen(!mainWindow.isFullScreen()); }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: function() { mainWindow.toggleDevTools(); }
        },
        {
          label: 'Close',
          accelerator: 'Command+W',
          click: () => {mainWindow.close()}
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
}