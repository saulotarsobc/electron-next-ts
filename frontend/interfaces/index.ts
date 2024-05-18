import { api } from "../../backend/preload";

declare global {
  interface Global {
    api: typeof api;
  }
}
