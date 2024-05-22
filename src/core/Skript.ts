
import * as send from "../syntax/ExprSend";
import * as wait from "../syntax/ExprWait";
import * as set from "../syntax/ExprSetVariable";
import * as setAttribute from "../syntax/ExprSetValue";
import QueueItem from "./interfaces/Queue";
import { SkBee } from "./addons/SkBee";

const skbee = new SkBee();

// This function is initialized for *EACH* event that is registered
// may be a bad approach, but it works for now
export class Skript {
  
  send: typeof send.default;
  wait: typeof wait.default;
  variable: typeof set.default;
  var: typeof set.default;
  set: typeof setAttribute.default;
  raytraceFromEntity: typeof skbee.raytraceFromEntity;

  private queue: QueueItem[];
  indentLevel: number;
  currentCodeBlock: string;
  registeredEvents: string[];
  silent: boolean;

  constructor(config: SkriptConfig) {
    this.send = send.default;
    
    this.wait = wait.default;

    this.variable = set.default;
    this.var = set.default;

    this.set = setAttribute.default;

    // SkBee
    this.raytraceFromEntity = skbee.raytraceFromEntity;
    // 

    this.queue = [];
    this.indentLevel = config.indentLevel || 0;
    this.currentCodeBlock = "";
    this.registeredEvents = [];
    this.silent = config.silent || false;
  }

  addIndent() {
    this.indentLevel++;
  }

  takeIndent() {
    this.indentLevel--;
  }

  registerEvent(event: string) {
    console.log(`Registered event: ${event} ${this.silent}`);
    if(this.silent) return;

    
    this.registeredEvents.push(event);
  }

  getEventList() {
    return this.registeredEvents;
  }

  convert() {
    this.getEventList().forEach(event => {
      this.currentCodeBlock += `${" ".repeat(this.indentLevel * 4)}${event}\n`;
    });

    return this.currentCodeBlock;
  }
}

export interface SkriptConfig {
  allowedFunctions?: string[],
  outputDirectory: string,
  inputDirectory: string,
  filesToIgnore?: string[],
  enabledAddons?: SkriptAddons[],
  indentLevel?: number,
  silent?: boolean
}

export type SkriptAddons = [
  "SkJade",
  "SkQuery",
  "MongoSK",
  "SkBee",
  "Ersatz",
  "skript-placeholder",
  "skript-db",
  "SkCheese",
  "skDragon",
  "Skellett",
  "skRayFall",
  "skream",
  "skript-gui",
  "skript-holo",
  "skript-json",
  "skript-npc",
  "skript-packet",
  "skript-particle",
  "SkUniversal"
]
