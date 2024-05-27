/* The databasePath.ts file in your codebase is responsible for setting up the path to the SQLite database file used by your Electron application. It imports necessary modules such as electron-log for logging, electron/main for accessing Electron's main process, and path for manipulating file paths.

The file defines a constant databasePath which is the result of joining the user data path (obtained from app.getPath("userData")) with the string "database.sqlite". This path is then logged using Logger.info.

Finally, the databasePath constant is exported as the default export of the module.

In summary, this file sets up the path to the SQLite database file used by your Electron application and exports it for use in other parts of your codebase. */

import Logger from "electron-log";
import { app } from "electron/main";
import { join } from "path";

const databasePath = join(app.getPath("userData"), "database.sqlite");

Logger.info("DATABASE: ", databasePath);

export default databasePath;
