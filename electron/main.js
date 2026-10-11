const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // Рекомендуется для безопасности
      contextIsolation: true, // Рекомендуется для безопасности
    },
  });

  void win.loadFile(path.join(__dirname, "../dist/index.html"));
}

app.whenReady().then(createWindow);

// Закрытие приложения при закрытии всех окон (кроме macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
