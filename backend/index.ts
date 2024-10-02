import { ipcMain } from "electron";
import { app, BrowserWindow } from "electron/main";
import { join } from "node:path";
import { Model } from "sequelize";
import { sequelize, User } from "./database";
import { isDev } from "./utils/env";
import { initLogs } from "./utils/initLogs";
import { prepareNext } from "./utils/prepareNext";

/**
 * Creates a new BrowserWindow with the specified dimensions and web preferences.
 * If in development mode, the window loads the local development server URL,
 * otherwise it loads the built frontend index.html file.
 *
 * @return {void}
 */
function createWindow(): void {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  isDev
    ? win.loadURL("http://localhost:4444/")
    : win.loadFile(join(__dirname, "..", "frontend", "out", "index.html"));

  isDev && win.webContents.openDevTools();
  isDev && win.maximize();
}

app.whenReady().then(async () => {
  await prepareNext("./frontend", 4444);

  await initLogs();

  await sequelize
    .sync({
      logging: true,
      alter: true,

      // this is used for development.
      // If you want to reset the database, set this to true and run the script again.
      // Otherwise, set it to false.
      force: false,
    })
    .then(() => {
      console.log("Database synced");
    });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

/* ++++++++++ code ++++++++++ */
ipcMain.on("addUser", async (event, data: any) => {
  await User.create(data)
    .then((data: Model) => {
      event.returnValue = {
        error: false,
        data: data,
      };
    })
    .catch((error) => {
      event.returnValue = {
        error: true,
        data: error,
      };
    });
});
