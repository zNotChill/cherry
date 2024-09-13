import { CherryError } from "../ErrorHandler";
import { currentSkript } from "../Parser";
import { Skript } from "../core/Skript";
import Expressions from "../core/classes/Expressions";
import SkriptEntity from "../core/interfaces/Entity";

function checkIf(condition: string, callback: (skript: Skript) => void) {
  let lineStarter = `if ${condition}:`
  let lines: string[];

  const skript = new Skript({
    outputDirectory: "",
    inputDirectory: "",
    silent: true
  });

  if (skript !== null) {
    callback(skript);
  } else {
    throw new CherryError("Skript is null.");
  }
}

export default checkIf;