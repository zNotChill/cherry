import { CherryError } from "../../ErrorHandler";
import { Skript } from "../Skript";

export default class EventListener {
  name: string;
  callback: (skript: Skript, silentSkript: Skript) => void;
  skript: Skript | null;
  silentSkript: Skript | null;

  constructor(name: string, callback: (skript: Skript, silentSkript: Skript) => void) {
    this.name = name;
    this.callback = callback;
    this.skript = null;
    this.silentSkript = null;
  }

  getLineStarter() {
    return `on ${this.name}:`
  }

  runCallback() {
    if (this.skript !== null && this.silentSkript !== null) {
      this.callback(this.skript, this.silentSkript);
    } else {
      throw new CherryError("Skript is null.");
    }
  }
}