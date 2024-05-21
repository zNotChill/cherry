import { currentSkript } from "../Parser";
import Expressions from "../core/classes/Expressions";
import SkriptEntity from "../core/interfaces/SkriptEntity";

function send(message: string, recipient: SkriptEntity, formatted: boolean = false) {
  const str = `send${formatted ? " formatted" : ""} "${message}" to ("${recipient.name || recipient.id || "unknown"}" parsed as offline player)`;

  currentSkript?.registerEvent(str);
  return str;
}

namespace send {
  export function formatted(message: string, recipient: Expressions) {
    return send(message, recipient, true);
  }
}

export default send;