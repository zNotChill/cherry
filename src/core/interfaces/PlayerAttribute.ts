


class PlayerAttribute {
  static readonly MaxHealth = "player's max health";
  static readonly Health = "player's health";
  static readonly FoodLevel = "player's food level";
  static readonly Hunger = this.FoodLevel;
  static readonly Saturation = "player's saturation";
  static readonly Experience = "player's experience";
  static readonly Level = "player's level";
  static readonly Gamemode = "player's game mode";
  static readonly World = "player's world";
  static readonly Location = "player's location";
}

export {
  PlayerAttribute,
  PlayerAttribute as Player
}