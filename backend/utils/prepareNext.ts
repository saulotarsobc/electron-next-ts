import { createServer } from "http";
import { join, isAbsolute, normalize } from "path";
import { app, protocol } from "electron";
import { resolve } from "app-root-path";
import { isDev } from "./env";

/**
 * Starts a development server for the Next.js application.
 *
 * @param {any} dir - The directory of the Next.js application.
 * @param {any} port - The port number to run the development server on. Defaults to 4000 if not provided.
 * @return {Promise<void>} A promise that resolves when the development server is started.
 */
const devServer = async (dir: any, port: any): Promise<void> => {
  const next = require("next")({ dev: true, dir });
  const requestHandler = next.getRequestHandler();
  await next.prepare();

  const server = createServer(requestHandler);

  server.listen(port || 4000, () => {
    app.on("before-quit", () => server.close());
  });
};

/**
 * Adjusts the renderer by intercepting the file protocol and modifying the file path.
 *
 * @param {any} directory - The directory of the Next.js application.
 * @return {void} This function does not return a value.
 */
const adjustRenderer = (directory: any): void => {
  const paths = ["/_next", "/static"];
  const isWindows = process.platform === "win32";

  protocol.interceptFileProtocol("file", (request, callback) => {
    let path = request.url.substr(isWindows ? 8 : 7);

    for (const prefix of paths) {
      let newPath = path;

      if (isWindows) {
        newPath = newPath.substr(2);
      }

      if (!newPath.startsWith(prefix)) {
        continue;
      }

      if (isWindows) {
        newPath = normalize(newPath);
      }

      newPath = join(directory, "out", newPath);
      path = newPath;
    }

    path = decodeURIComponent(path);

    callback({ path });
  });
};

/**
 * Prepares the Next.js application for rendering.
 *
 * @param {any} directories - The directories containing the Next.js application. Can be a string or an object with production and development properties.
 * @param {any} port - The port number to run the development server on. Defaults to 4000 if not provided.
 * @throws {Error} If the renderer location is not defined.
 * @return {Promise<void>} A Promise that resolves when the Next.js application is prepared for rendering.
 */
export const prepareNext = async (
  directories: any,
  port: any
): Promise<void> => {
  if (!directories) {
    throw new Error("Renderer location not defined");
  }

  if (typeof directories === "string") {
    directories = {
      production: directories,
      development: directories,
    };
  }

  for (const directory in directories) {
    if (!{}.hasOwnProperty.call(directories, directory)) {
      continue;
    }

    if (!isAbsolute(directories[directory])) {
      directories[directory] = resolve(directories[directory]);
    }
  }

  if (!isDev) {
    adjustRenderer(directories.production);
    return;
  }

  await devServer(directories.development, port);
};
