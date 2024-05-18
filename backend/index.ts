import { app, BrowserWindow } from "electron/main";
import path, { join } from "node:path";

import { isDev } from "./utils/env";
import { prepareNext } from "./utils/prepareNext";
import { initLogs } from "./utils/initLogs";

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  isDev
    ? win.loadURL("http://localhost:3000/")
    : win.loadFile(join(__dirname, "..", "frontend", "out", "index.html"));
}

app.whenReady().then(async () => {
  await prepareNext("./frontend", 3000);

  await initLogs();

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/* ++++++++++ code ++++++++++ */
