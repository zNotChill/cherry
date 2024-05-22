import { currentSkript } from "../Parser";
import { Skript } from "../core/Skript";
import Expressions from "../core/classes/Expressions";
import SkriptEntity from "../core/interfaces/Entity";

function wait(duration: string) {
  const str = `wait "${duration}" parsed as timespan`;

  currentSkript?.registerEvent(str);
  return str;
}

export default wait;