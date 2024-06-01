import { Skript } from "../core/Skript";
import Expressions from "../core/classes/Expressions";
import Periodical from "../core/classes/Periodical";
import Gamemode from "../core/interfaces/Gamemode";
import { Player } from "../core/interfaces/PlayerAttribute";

export const test = new Periodical("1 second", ($, silent) => {
  $.set(Player.Gamemode, Gamemode.Creative, Expressions.AllPlayers);

  $.raytraceFromEntity({
    entity: Expressions.AllPlayers,
    maxDistance: 10,
    raySize: 1,
    ignorePassableBlocks: true,
    ignoreEntities: true,
    ignoredEntities: []
  })
})