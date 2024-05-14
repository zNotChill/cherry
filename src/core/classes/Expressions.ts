
export default class Expressions {
  static Victim = {
    toString: () => "victim",
    toSkriptString: () => "%victim%"
  }
  static Attacker = {
    toString: () => "attacker",
    toSkriptString: () => "%attacker%"
  }
  static Target = {
    toString: () => "target",
    toSkriptString: () => "%target%"
  }
  static Player = {
    toString: () => "player",
    toSkriptString: () => "%player%"
  }
  static LoopPlayer = {
    toString: () => "loop-player",
    toSkriptString: () => "%loop-player%"
  }
  static TargetEntity = {
    toString: () => "target entity",
    toSkriptString: () => "%target entity%"
  }
  static TargetBlock = {
    toString: () => "target block",
    toSkriptString: () => "%target block%"
  }
  static Projectile = {
    toString: () => "projectile",
    toSkriptString: () => "%projectile%"
  }
  static EventItem = {
    toString: () => "event-item",
    toSkriptString: () => "%event-item%"
  }
  static EventPlayer = {
    toString: () => "event-player",
    toSkriptString: () => "%event-player%"
  }
  static EventWorld = {
    toString: () => "event-world",
    toSkriptString: () => "%event-world%"
  }
}