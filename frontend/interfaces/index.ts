import { IpcRenderer } from "electron";

declare global {
    namespace NodeJS {
        interface Global {
            ipcRenderer: IpcRenderer;
            API: any;
        }
    }
}