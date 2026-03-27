"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const pixi_js = require("pixi.js");
const calculateDebugRegions = require("./calculateDebugRegions.cjs");
const DebugNode = require("./DebugNode.cjs");
class DebugRenderer {
  constructor() {
    /** Container for all debug visuals */
    __publicField(this, "holder", new pixi_js.Container());
    /** Region data for each debug type */
    __publicField(this, "regions", /* @__PURE__ */ new Map());
    /** Color configuration for each region type */
    __publicField(this, "colors", {
      [calculateDebugRegions.DebugRegionType.Margin]: "#B68655",
      [calculateDebugRegions.DebugRegionType.Padding]: "#BAC57F",
      [calculateDebugRegions.DebugRegionType.Border]: "#E7C583",
      [calculateDebugRegions.DebugRegionType.Content]: "#89B1BE",
      [calculateDebugRegions.DebugRegionType.Flex]: "#6E28D9"
    });
    /** Global alpha value for all regions */
    __publicField(this, "alpha", 0.75);
    Object.values(calculateDebugRegions.DebugRegionType).forEach((type) => {
      this.regions.set(type, {
        outer: new pixi_js.Rectangle(),
        inner: new pixi_js.Rectangle()
      });
    });
    this.holder.__devtoolIgnore = true;
    this.holder.__devtoolIgnoreChildren = true;
    this.holder.eventMode = "none";
    this.holder.interactiveChildren = false;
  }
  /**
   * Clean up previous render state
   */
  reset() {
    for (let i = this.holder.children.length - 1; i >= 0; i--) {
      const child = this.holder.children[i];
      pixi_js.BigPool.return(child);
    }
  }
  /**
   * Render debug visuals for the given layout
   */
  render(layout) {
    calculateDebugRegions.calculateRegions(layout, this.regions);
    const regionData = Object.values(calculateDebugRegions.DebugRegionType).reduce(
      (acc, type) => {
        const region = this.regions.get(type);
        if (!region) return acc;
        const drawString = `debugDraw${type.charAt(0).toUpperCase()}${type.slice(1)}`;
        acc[type] = {
          ...region,
          color: this.colors[type],
          draw: layout._styles.custom[drawString] ?? true
        };
        return acc;
      },
      {}
    );
    const { left, top } = layout.computedLayout;
    const pos = layout.target.getGlobalPosition();
    const debugObject = pixi_js.BigPool.get(DebugNode.DebugNode, {
      ...regionData,
      target: { x: pos.x + left, y: pos.y + top },
      alpha: this.alpha,
      heat: {
        invalidationCount: layout._modificationCount,
        draw: layout._styles.custom.debugHeat !== false
      },
      heatOnly: !layout._styles.custom.debug
    });
    this.holder.addChildAt(debugObject, 0);
  }
  /**
   * Clean up the debug renderer
   */
  destroy() {
    this.reset();
    this.holder.destroy();
    this.regions.clear();
  }
}
exports.DebugRenderer = DebugRenderer;
//# sourceMappingURL=DebugRenderer.cjs.map
