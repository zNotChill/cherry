import { Skript } from "../Skript";
import { CherryError } from "../../ErrorHandler";

export default class Periodical {
  timespan: string;
  callback: (skript: Skript, silentSkript: Skript) => void;
  skript: Skript | null;
  silentSkript: Skript | null;

  // silentSkript is just a copy of Skript that does nothing
  // but allows for silent execution of skript functions
  // which wont output anything to the code block
  constructor(timespan: string, callback: (skript: Skript, silentSkript: Skript) => void) {
    this.timespan = timespan;
    this.callback = callback;
    this.skript = null;
    this.silentSkript = null;
  }

  getLineStarter() {
    return `every ${this.timespan}:`
  }

  runCallback() {
    if (this.skript !== null && this.silentSkript !== null) {
      this.callback(this.skript, this.silentSkript);
    } else {
      throw new CherryError("Skript is null.");
    }
  }
}