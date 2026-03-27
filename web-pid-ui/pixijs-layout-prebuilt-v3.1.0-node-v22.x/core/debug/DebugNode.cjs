"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const pixi_js = require("pixi.js");
const calculateDebugRegions = require("./calculateDebugRegions.cjs");
function lerpColor(start, end, t) {
  const r = Math.round(start[0] + (end[0] - start[0]) * t);
  const g = Math.round(start[1] + (end[1] - start[1]) * t);
  const b = Math.round(start[2] + (end[2] - start[2]) * t);
  return `rgb(${r},${g},${b})`;
}
class DebugNode extends pixi_js.Container {
  constructor() {
    super();
    /** Graphics objects for each region type */
    __publicField(this, "graphics");
    __publicField(this, "heatGraphics");
    this.graphics = /* @__PURE__ */ new Map();
    Object.values(calculateDebugRegions.DebugRegionType).forEach((type) => {
      const graphics = new pixi_js.Graphics();
      this.graphics.set(type, graphics);
      this.addChild(graphics);
    });
    this.heatGraphics = new pixi_js.Graphics();
    this.addChild(this.heatGraphics);
  }
  /**
   * Initialize the debug object with region data
   */
  init(regions) {
    const { target, alpha, heat } = regions;
    if (!regions.heatOnly) {
      Object.entries(regions).forEach(([type, region]) => {
        if (type === "target" || type === "alpha" || type === "heat" || type === "heatOnly") return;
        region = region;
        const graphics = this.graphics.get(type);
        if (!graphics || !region.draw) return;
        if (region.inner) {
          this.drawCutBox(graphics, region.outer, region.inner, region.color, alpha);
        } else {
          const { x, y, width, height } = region.outer;
          graphics.rect(x, y, width, Math.max(height, 1));
          graphics.fill({ color: region.color, alpha });
        }
      });
    }
    const { invalidationCount, draw } = heat;
    if (invalidationCount > 0 && draw) {
      const MAX_INVALIDATE_COUNT = 20;
      const normalizedAlpha = Math.min(invalidationCount / MAX_INVALIDATE_COUNT, 1);
      const marginRegion = regions[calculateDebugRegions.DebugRegionType.Margin];
      const startColor = [255, 255, 0];
      const endColor = [255, 0, 0];
      const color = lerpColor(startColor, endColor, normalizedAlpha);
      this.heatGraphics.rect(
        marginRegion.outer.x,
        marginRegion.outer.y,
        marginRegion.outer.width,
        marginRegion.outer.height
      );
      this.heatGraphics.fill({ color, alpha: Math.min(0.3, normalizedAlpha) });
      this.heatGraphics.stroke({ color, alpha: Math.max(0.3, normalizedAlpha), pixelLine: true });
    }
    this.position.set(target.x, target.y);
  }
  /**
   * Reset the debug object's state
   */
  reset() {
    this.graphics.forEach((graphics) => graphics.clear());
    this.heatGraphics.clear();
    this.removeFromParent();
  }
  /**
   * Draw a box with a cut-out center
   */
  drawCutBox(graphics, outer, inner, color, alpha) {
    const { x, y, width, height } = outer;
    const { x: innerX, y: innerY, width: innerWidth, height: innerHeight } = inner;
    graphics.rect(x, y, width, height);
    graphics.fill({ color, alpha });
    graphics.rect(innerX, innerY, innerWidth, innerHeight);
    graphics.cut();
  }
}
exports.DebugNode = DebugNode;
//# sourceMappingURL=DebugNode.cjs.map
