/* The backend/utils/env.ts file is responsible for providing information about the environment in which the application is running. It exports two constants: isDev and isStart. The isDev constant indicates whether the application is running in a development environment by checking if the --dev argument is present in the command line when starting the application. The isStart constant indicates whether the application is being started by checking if the --start argument is present in the command line when starting the application.

The file also imports the Logger module from the electron-log package and uses it to log information about the environment. The information is logged using the Logger.info methods, passing a string concatenated with the boolean value of isDev and a string concatenated with the boolean value of isStart. */

import Logger from "electron-log";

export const isDev = process.argv.some((str) => str == "--dev");
export const isStart = process.argv.some((str) => str == "--start");

Logger.info("DEV: ", isDev);
Logger.info("START: ", isStart);
