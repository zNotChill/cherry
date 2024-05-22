import { currentSkript } from "../Parser";
import { Skript } from "../core/Skript";
import Expressions, { Expression } from "../core/classes/Expressions";
import SkriptEntity from "../core/interfaces/Entity";
import { ClassType } from "../core/interfaces/Types";
import { parseType } from "../core/lib/Types";

/**
 * Sets an attribute to a value.
 * @param attr The attribute to set.
 * @param value The value to set the attribute to.
 * @param replacement The replacement for the attribute. (if it's a player attribute/any attribute with different names for different entities)
 */
function set(attr: any, value: any, replacement: Expression = {
  toString: () => "player",
  toSkriptString: () => "%player%",
  plural: false
}) {
  let type = parseType(value);
  let quotes = type.type === "string" ? '"' : "";

  if (type.type === "raw") quotes = "";
  let val = type.value;

  let parse = "";
  if (type.type === "class") {
    val = type.value.value;
    quotes = '"';
    parse = " parsed as " + type.parseAs;
  }

  if (replacement.toString() !== "player") {
    let rep = replacement.toString();

    if (replacement.plural) {
      attr = attr.replace("'s", "");
      rep += "'";
    }
    attr = attr.replace("player", rep);
  }

  let str = `set ${attr} to (${quotes}${val}${quotes}${parse})`;

  currentSkript?.registerEvent(str);
  return str;
}

export default set;