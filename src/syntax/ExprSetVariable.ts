import { currentSkript } from "../Parser";
import { parseType } from "../core/lib/Types";

/**
 * Sets a variable to a value.
 * @param variable The variable to set.
 * @param value The value to set the variable to.
 * @param options Options for the set statement.
 * @example
 * $.var("test", 1, ["local"]) // => "set {_test} to 1"
 * $.var("test", "hello", ["temp"]) // => "set {-test} to "hello"
 * $.var("test", "hello", ["global"]) // => "set {test} to "hello"
 * 
 * If value is not specified then the Skript variable will be
 * returned instead:
 * @example
 * $.var("test") => "{test}"
 */
function set(variable: string, value: any = "", options: string[] = ["global"]) {

  
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
  
  if(value === "") {
    return `{${prefix}${variable}}`;
  }
  let str = `set {${prefix}${variable}) to ${quotes}${type.value}${quotes}`;

  currentSkript?.registerEvent(str);
  return str;
}

export default set;