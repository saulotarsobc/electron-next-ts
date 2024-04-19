import Logger from "electron-log";

export const isDev = process.argv.some((str) => str == "--dev");
export const isStart = process.argv.some((str) => str == "--start");

Logger.info("DEV: ", isDev);
Logger.info("START: ", isStart);
