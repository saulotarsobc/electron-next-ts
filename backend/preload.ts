import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

export const api = {
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (event: IpcRendererEvent, args: any) =>
      callback(event, args)
    );
  },

  send: (channel: string, args: any) => {
    ipcRenderer.send(channel, args);
  },
};

contextBridge.exposeInMainWorld("api", api);
