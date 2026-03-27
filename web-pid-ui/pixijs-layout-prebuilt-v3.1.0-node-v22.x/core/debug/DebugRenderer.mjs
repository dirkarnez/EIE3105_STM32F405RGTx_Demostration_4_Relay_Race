var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Container, Rectangle, BigPool } from "pixi.js";
import { DebugRegionType, calculateRegions } from "./calculateDebugRegions.mjs";
import { DebugNode } from "./DebugNode.mjs";
class DebugRenderer {
  constructor() {
    /** Container for all debug visuals */
    __publicField(this, "holder", new Container());
    /** Region data for each debug type */
    __publicField(this, "regions", /* @__PURE__ */ new Map());
    /** Color configuration for each region type */
    __publicField(this, "colors", {
      [DebugRegionType.Margin]: "#B68655",
      [DebugRegionType.Padding]: "#BAC57F",
      [DebugRegionType.Border]: "#E7C583",
      [DebugRegionType.Content]: "#89B1BE",
      [DebugRegionType.Flex]: "#6E28D9"
    });
    /** Global alpha value for all regions */
    __publicField(this, "alpha", 0.75);
    Object.values(DebugRegionType).forEach((type) => {
      this.regions.set(type, {
        outer: new Rectangle(),
        inner: new Rectangle()
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
      BigPool.return(child);
    }
  }
  /**
   * Render debug visuals for the given layout
   */
  render(layout) {
    calculateRegions(layout, this.regions);
    const regionData = Object.values(DebugRegionType).reduce(
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
    const debugObject = BigPool.get(DebugNode, {
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
export {
  DebugRenderer
};
//# sourceMappingURL=DebugRenderer.mjs.map
