import { ipcMain, IpcMainEvent } from "electron/main";
import { app, BrowserWindow } from "electron/main";
import path, { join } from "node:path";

import { isDev } from "./utils/env";
import { prepareNext } from "./utils/prepareNext";
import { sequelize, User } from "./model";
import { initLogs } from "./utils/initLogs";
import Logger from "electron-log";

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

  await sequelize
    .sync({ alter: true })
    .then(() => {
      Logger.info("SEQUELIZE: ", "database synk. ok!");
    })
    .catch((e: Error) => {
      Logger.error("SEQUELIZE ERROR: ", e.message);
    });

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
ipcMain.on("createUser", (event: IpcMainEvent, data: {}) => {
  User.create({ ...data })
    .then((data: any) => {
      event.returnValue = data;
    })
    .catch((e: Error) => {
      event.returnValue = e.message;
    });
});
