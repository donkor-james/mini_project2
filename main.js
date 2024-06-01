const path = require("path");
const { app, BrowserWindow } = require("electron");

const isMac = process.platform === "darwin";
const isDev = false;

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: "AutoBackup",
    width: isDev ? 800 : 580,
    height: 480,
    // frame: false,
    autoHideMenuBar: true, // Set to true to hide the menu bar
  });

  // Open dev tool if in dev env
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
