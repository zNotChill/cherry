
export default interface SkriptEntity {
  id?: string,
  name?: string,
}
export class MinecraftEntity {
  public static readonly Player = {
    class: MinecraftEntity,
    type: "entity",
    value: "player",
    pluralValue: "players",
  };
}