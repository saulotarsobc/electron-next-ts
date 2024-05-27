import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

export const api = {
  /**
   * Registers an event listener for the specified channel.
   *
   * @param {string} channel - The name of the channel to listen on.
   * @param {Function} callback - The function to be called when the event is triggered.
   *                             It will receive the event object and the arguments passed by the sender.
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (event: IpcRendererEvent, args: any) =>
      callback(event, args)
    );
  },

  /**
   * Sends a message through the IPC renderer.
   *
   * @param {string} channel - The channel through which the message will be sent.
   * @param {any} args - The arguments to be sent along with the message.
   * @return {void} This function does not return a value.
   */
  send: (channel: string, args: any) => {
    ipcRenderer.send(channel, args);
  },
};

contextBridge.exposeInMainWorld("api", api);
