import Types from "./Types";


export default class Gamemode {
  public static readonly Survival = {
    class: Gamemode,
    type: Types.Gamemode,
    value: "survival",
  };
  public static readonly Creative = {
    class: Gamemode,
    type: Types.Gamemode,
    value: "creative",
    };
  public static readonly Adventure = {
    class: Gamemode,
    type: Types.Gamemode,
    value: "adventure",
  };
  public static readonly Spectator = {
    class: Gamemode,
    type: Types.Gamemode,
    value: "spectator",
  };

  public static readonly All = [
    Gamemode.Survival,
    Gamemode.Creative,
    Gamemode.Adventure,
    Gamemode.Spectator
  ];

  public static readonly Default = Gamemode.Survival;

  public static isValid(gamemode: string): boolean {
    return Gamemode.All.some((g) => g.value === gamemode);
  }

  public static fromString(gamemode: string): string {
    if (Gamemode.isValid(gamemode)) return gamemode;
    return Gamemode.Default.value;
  }

  public static toString(gamemode: string): string {
    return Gamemode.fromString(gamemode);
  }

  public static toNumber(gamemode: string): number {
    switch (gamemode) {
      case Gamemode.Survival.value:
        return 0;
      case Gamemode.Creative.value:
        return 1;
      case Gamemode.Adventure.value:
        return 2;
      case Gamemode.Spectator.value:
        return 3;
      default:
        return 0;
    }
  }

  public static fromNumber(gamemode: number): string {
    switch (gamemode) {
      case 0:
        return Gamemode.Survival.value;
      case 1:
        return Gamemode.Creative.value;
      case 2:
        return Gamemode.Adventure.value;
      case 3:
        return Gamemode.Spectator.value;
      default:
        return Gamemode.Default.value;
    }
  }

  public static toNumberString(gamemode: string): string {
    return `${Gamemode.toNumber(gamemode)}`;
  }

  public static fromNumberString(gamemode: string): string {
    return Gamemode.fromNumber(parseInt(gamemode));
  }

  public static getType(): string {
    return Types.Gamemode;
  }
}