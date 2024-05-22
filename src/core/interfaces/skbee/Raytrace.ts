import { Expression } from "../../classes/Expressions";
import { MinecraftEntity } from "../Entity";
import Location from "../Location";
import Vector3 from "../Vector3";

export interface RaytraceEntityOptions {
  entity: Expression,
  maxDistance: number,
  raySize: number, // 0.1 by default
  ignorePassableBlocks: boolean, // false by default
  ignoreEntities: boolean, // false by default
  ignoredEntities: MinecraftEntity[],
}

export interface RaytraceLocationOptions {
  location: Location,
  alongVector: Vector3,
  maxDistance: number,
  raySize: number, // 0.1 by default
  ignorePassableBlocks: boolean, // false by default
  ignoreEntities: boolean, // false by default
  ignoredEntities: MinecraftEntity[],
}
