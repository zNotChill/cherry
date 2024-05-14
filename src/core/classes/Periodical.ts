import { Skript } from "../Skript";
import { CherryError } from "../../ErrorHandler";

export default class Periodical {
  timespan: string;
  callback: (skript: Skript) => void;
  skript: Skript | null;

  constructor(timespan: string, callback: (skript: Skript) => void) {
    this.timespan = timespan;
    this.callback = callback;
    this.skript = null;
  }

  getLineStarter() {
    return `every ${this.timespan}:`
  }

  runCallback() {
    if (this.skript !== null) {
      this.callback(this.skript);
    } else {
      throw new CherryError("Skript is null.");
    }
  }
}