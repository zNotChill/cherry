import { Skript } from "./core/Skript";
import Classes from "./core/classes/Classes";
import EventListener from "./core/classes/EventListener";
import Periodical from "./core/classes/Periodical";

const { CherryError } = require("./ErrorHandler");

export let currentSkript: Skript;

function readFile(file: string) {
  const importedFile = require(file);
  const keys = Object.keys(importedFile);

  if(keys.length === 0) {
    throw new CherryError("File has no exports. (bad)");
  }

  keys.forEach(key => {
    const skript = new Skript({
      outputDirectory: "",
      inputDirectory: "",
    });
    skript.currentCodeBlock = "";
    
    // way easier than listing out every class...
    const className = importedFile[key].constructor.name;
    const classConstructor = Classes[className as keyof typeof Classes];

    let arg1, arg2;
    if (classConstructor) {
      const imp = Object.keys(importedFile[key]);
      arg1 = imp[0];
      arg2 = imp[1];

      if (arg1 && arg2) {
        const constructor = new classConstructor(importedFile[key][arg1], importedFile[key][arg2]);
        skript.currentCodeBlock = constructor.getLineStarter() + "\n";
      
        constructor.skript = skript;
        currentSkript = skript;

        skript.addIndent();

        const callback = constructor.runCallback();

        skript.convert();
      }
    }

    console.log(skript.currentCodeBlock);
  });

  

  return importedFile;
}

readFile("./scripts/Core.js");