import { createServer } from "http";
import { join, isAbsolute, normalize } from "path";
import { app, protocol } from "electron";
import { resolve } from "app-root-path";
import { isDev } from "./env";

const devServer = async (dir: any, port: any) => {
  const next = require("next")({ dev: true, dir });
  const requestHandler = next.getRequestHandler();
  await next.prepare();

  const server = createServer(requestHandler);

  server.listen(port || 8000, () => {
    app.on("before-quit", () => server.close());
  });
};

const adjustRenderer = (directory: any) => {
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

export const prepareNext = async (directories: any, port: any) => {
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
