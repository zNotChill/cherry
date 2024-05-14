import { CherryError } from "../../ErrorHandler";
import { Skript } from "../Skript";

export default class EventListener {
  name: string;
  callback: (skript: Skript) => void;
  skript: Skript | null;

  constructor(name: string, callback: (skript: Skript) => void) {
    this.name = name;
    this.callback = callback;
    this.skript = null;
  }

  getLineStarter() {
    return `on ${this.name}:`
  }

  runCallback() {
    if (this.skript !== null) {
      
      this.callback(this.skript);
    } else {
      throw new CherryError("Skript is null.");
    }
  }
}