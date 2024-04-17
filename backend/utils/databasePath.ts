import { app } from "electron/main";
import { join } from "path";

const databasePath = join(app.getPath("userData"), "database.sqlite");

export default databasePath;