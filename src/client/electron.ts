process.env.NODE_ENV = process.env.NODE_ENV || 'production';
console.log(`Electron launching with NODE_ENV: ${process.env.NODE_ENV}`);

// import 'source-map-support/register';

// electron
// import { app, Menu, shell, BrowserWindow } from 'electron';
const { app, Menu, shell, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store');
const store = new Store();
let mainWindow: any = (<any>global).mainWindow = null;
let template: any;
let menu: any;

// import { test } from './electron/test';
// console.log(test);

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  // Initialize the window to our specified dimensions
  mainWindow = new BrowserWindow({
    x: store.get('bounds.x'),
    y: store.get('bounds.y'),
    width: store.get('bounds.width') || 960,
    height: store.get('bounds.height') || 600,
    titleBarStyle: 'hiddenInset',
    // webPreferences: {
    //   experimentalFeatures: true
    // }
  });

  // mainWindow.webContents.openDevTools();

  // Tell Electron where to load the entry point from
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('close', () => {
    store.set('bounds', mainWindow.getBounds());
    store.set('fullscreen', mainWindow.isFullScreen());
  });

  // Clear out the main window when the app is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-navigate-in-page', (e: any, url: string) => {
    console.log(`Page navigated: ${url}`);
  });

  const appTitle = `electron`;

  const langMenu: any = {
    label: 'Language',
    submenu: []
  };

  const helpMenu: any = {
    label: 'Help',
    submenu: [{
      label: 'Angular 2',
      click: () => {
        shell.openExternal('https://angular.io/');
      }
    }, {
      label: 'Electron',
      click: () => {
        shell.openExternal('http://electron.atom.io/');
      }
    }, {
      label: 'Electron Docs',
      click: () => {
        shell.openExternal('https://github.com/atom/electron/tree/master/docs');
      }
    }]
  };

  if (process.platform === 'darwin') {
    template = [{
      label: appTitle,
      submenu: [{
        label: `About ${appTitle}`,
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide [p]ms',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => {
          app.quit();
        }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }]
    }, {
      label: 'View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: 'Reload',
        accelerator: 'Command+R',
        click: () => {
          mainWindow.reload();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: () => {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: () => {
          mainWindow.webContents.toggleDevTools();
        }
      }] : [{
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: () => {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'New Main',
        accelerator: 'Command+N',
        click: () => {
          mainWindow = new BrowserWindow({
            x: store.get('bounds.x'),
            y: store.get('bounds.y'),
            width: store.get('bounds.width') || 960,
            height: store.get('bounds.height') || 600,
            titleBarStyle: 'hiddenInset',
            // webPreferences: {
            //     experimentalFeatures: true
            // }
          });
          mainWindow.loadURL('file://' + __dirname + '/index.html');
        }
      }, {
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    },
      langMenu];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O'
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click: () => {
          mainWindow.close();
        }
      }]
    }, {
      label: '&View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click: () => {
          mainWindow.reload();
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click: () => {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click: () => {
          mainWindow.webContents.toggleDevTools();
        }
      }] : [{
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click: () => {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    },
      langMenu,
      helpMenu];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});
