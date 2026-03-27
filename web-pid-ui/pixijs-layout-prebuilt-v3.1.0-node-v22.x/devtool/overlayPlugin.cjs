"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const pixi_js = require("pixi.js");
const calculateDebugRegions = require("../core/debug/calculateDebugRegions.cjs");
const regions = /* @__PURE__ */ new Map();
const point = new pixi_js.Point();
Object.values(calculateDebugRegions.DebugRegionType).forEach((type) => {
  regions.set(type, {
    outer: new pixi_js.Rectangle(),
    inner: new pixi_js.Rectangle()
  });
});
const overlayPlugin = {
  extension: {
    name: "layout-scene-overlay",
    type: "overlay"
  },
  getSelectedStyle() {
    return {
      backgroundColor: "rgba(0, 255, 255, 0.5)",
      border: "2px solid white"
    };
  },
  getHoverStyle() {
    return {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      border: "2px solid white"
    };
  },
  getGlobalBounds(node) {
    if (node.layout) {
      calculateDebugRegions.calculateRegions(node.layout, regions);
      const region = regions.get(calculateDebugRegions.DebugRegionType.Margin);
      const { left, top } = node.layout.computedLayout;
      const pos = node.layout.target.getGlobalPosition(point);
      return {
        x: region.outer.x + pos.x + left,
        y: region.outer.y + pos.y + top,
        width: region.outer.width,
        height: region.outer.height
      };
    }
    return node.getBounds();
  }
};
exports.overlayPlugin = overlayPlugin;
//# sourceMappingURL=overlayPlugin.cjs.map
