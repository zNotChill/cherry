import fs from "fs/promises";
import FunctionScope from "./classes/FunctionScope";
import { FunctionParser } from "./classes/FunctionParser";

(async () => {
  const file = await fs.readFile("script.ts", "utf-8");

  const scope = new FunctionScope(file);
  const scopeCheck = await scope.check();

  if (!scopeCheck) {
    console.error("Scope check failed.");
    process.exit(1);
  }

  const parser = new FunctionParser(file);
  const parsedFile = await parser.parse();

  console.log(parsedFile.join('\n'));
})()