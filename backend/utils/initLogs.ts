import { exec } from "node:child_process";
import Logger from "electron-log";
import { join } from "node:path";

export async function initLogs() {
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
}
