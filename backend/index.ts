import { ipcMain } from "electron";
import { app, BrowserWindow } from "electron/main";
import { join } from "node:path";
import { database } from "./database";
import { User } from "./database/entitys/User";
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

  if (isDev) {
    win.maximize(); // Maximize the window in development mode
    win.webContents.openDevTools(); // Open the DevTools in development mode
    win.loadURL("http://localhost:4444/"); // Load the local development server URL
  } else {
    win.setMenu(null); // Remove the menu in production mode
    win.loadFile(join(__dirname, "..", "frontend", "out", "index.html")); // Load the index.html of the app
  }
}

app.whenReady().then(async () => {
  await prepareNext("./frontend", 4444); // Prepare the Next.js frontend
  initLogs(); // Initialize the logs
  createWindow(); // Create the main window

  // Create the database connection
  app.on(
    "activate",
    async () => BrowserWindow.getAllWindows().length === 0 && createWindow()
  );
});

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());

/* ++++++++++ code ++++++++++ */
// Add a new user
ipcMain.on("addUser", async (event, data: any) => {
  const user = new User();

  user.name = data.name;
  user.email = "mail@example.com";
  user.password = "123456";

  await database.manager
    .save(user)
    .then((data) => {
      event.returnValue = { error: false, data };
    })
    .catch((error) => {
      event.returnValue = { error: true, data: error };
    });
});
