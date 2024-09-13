import { Skript } from "../Skript";
import { CherryError } from "../../ErrorHandler";

export default class If {
  condition: string;
  callback: (skript: Skript, silentSkript: Skript) => void;
  skript: Skript | null;
  silentSkript: Skript | null;

  // silentSkript is just a copy of Skript that does nothing
  // but allows for silent execution of skript functions
  // which wont output anything to the code block
  constructor(condition: string, callback: (skript: Skript, silentSkript: Skript) => void) {
    this.condition = condition;
    this.callback = callback;
    this.skript = null;
    this.silentSkript = null;
  }

  getLineStarter() {
    return `if ${this.condition}:`
  }

  runCallback() {
    if (this.skript !== null && this.silentSkript !== null) {
      this.callback(this.skript, this.silentSkript);
    } else {
      throw new CherryError("Skript is null.");
    }
  }
}