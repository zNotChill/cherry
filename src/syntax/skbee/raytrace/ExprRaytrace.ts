import { currentSkript } from "../../../Parser";
import { RaytraceEntityOptions } from "../../../core/interfaces/skbee/Raytrace";

export function raytraceFromEntity(options: RaytraceEntityOptions) {
  let str = "";
  let entityStr = "",
      maxDistanceStr = "",
      raySizeStr = "",
      ignorePassableBlocksStr = "",
      ignoreEntitiesStr = "";
  
  entityStr = options.entity ? 
    options.entity.toString() :
    "";

  maxDistanceStr = options.maxDistance ?
    ` with max distance ${options.maxDistance.toString()}` : 
    "";

  raySizeStr = options.raySize ? 
    ` with ray size ${options.raySize.toString()}` :
    "";

  ignorePassableBlocksStr = options.ignorePassableBlocks ?
    ` while ignoring passable blocks` :
    "";

  ignoreEntitiesStr = options.ignoreEntities && options.ignoredEntities.length > 0 ?
    ` while ignoring ${options.ignoredEntities.map(e => e.toString()).join(" and ")}` : 
    "";

  str = `raytrace from ${entityStr}${maxDistanceStr}${raySizeStr}${ignorePassableBlocksStr}${ignoreEntitiesStr}`

  currentSkript?.registerEvent(str);
  return str;
}
