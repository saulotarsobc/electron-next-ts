import Logger from "electron-log";
import { app } from "electron/main";
import { join } from "path";

const databasePath = join(app.getPath("userData"), "database.sqlite");

Logger.info("DATABASE: ", databasePath);

export default databasePath;
