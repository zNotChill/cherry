import * as raytrace from "../../syntax/skbee/raytrace/ExprRaytrace";


export class SkBee {
  raytraceFromEntity = raytrace.raytraceFromEntity;
  // raytraceFromLocation = typeof raytrace.raytraceFromLocation;

  constructor() {
    this.raytraceFromEntity = raytrace.raytraceFromEntity;
    // this.raytraceFromLocation = raytrace.raytraceFromLocation;
  }
}