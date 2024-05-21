import { currentSkript } from "../Parser";
import { Skript } from "../core/Skript";
import Expressions from "../core/classes/Expressions";
import SkriptEntity from "../core/interfaces/SkriptEntity";
import { parseType } from "../core/lib/Types";

/**
 * Sets a variable to a value.
 * @param variable The variable to set.
 * @param value The value to set the variable to.
 * @param options Options for the set statement.
 * @example
 * $.var("test", 1, "local") // => "set {_test} to 1"
 * $.var("test", "hello", ["temp"]) // => "set {-test} to "hello"
 * $.var("test", "hello", ["global"]) // => "set {test} to "hello"
 */
function set(variable: string, value: any, options: string[] = ["global"]) {
  let type = parseType(value);

  let isGlobal = options.includes("global");
  let isLocal = options.includes("local");
  let isTemporary = options.includes("temp");

  let prefix = "";

  if(isGlobal) {
    prefix = "";
  }

  if(isLocal) {
    prefix = "_";
  }

  if(isTemporary) {
    prefix = "-";
  }

  let quotes = type.type === "string" ? '"' : "";

  if (type.type === "raw") quotes = "";

  let str = `set {${prefix}${variable}) to ${quotes}${type.value}${quotes}`;

  currentSkript?.registerEvent(str);
  return str;
}

export default set;