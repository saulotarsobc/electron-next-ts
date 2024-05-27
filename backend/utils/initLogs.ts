import { exec } from "node:child_process";
import Logger from "electron-log";
import { join } from "node:path";
import databasePath from "./databasePath";

/**
 * Initializes the logs by executing a command to list the files in the specified directory.
 *
 * @return {Promise<void>} A promise that resolves when the logs have been initialized.
 */
export async function initLogs(): Promise<void> {
  const directoryPath = join(__dirname, "..", "..");
  const command =
    process.platform === "win32"
      ? `dir ${directoryPath}`
      : `ls -lah ${directoryPath}`;

  exec(command, (error: any, stdout: any, stderr: any) => {
    if (error) {
      Logger.error(`ERROR IN ${command}:\n${error}`);
      Logger.error(`ERROR IN ${command} "stderr":\n${stderr}`);
      return;
    }
    Logger.log(`FILES IN DIRECTORY ${directoryPath}:\n${stdout}`);
  });

  Logger.info("DIRNAME: ", directoryPath);

  Logger.info("DATABASE: ", databasePath);
}
