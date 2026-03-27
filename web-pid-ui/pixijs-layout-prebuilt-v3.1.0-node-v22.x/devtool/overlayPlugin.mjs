import { Point, Rectangle } from "pixi.js";
import { DebugRegionType, calculateRegions } from "../core/debug/calculateDebugRegions.mjs";
const regions = /* @__PURE__ */ new Map();
const point = new Point();
Object.values(DebugRegionType).forEach((type) => {
  regions.set(type, {
    outer: new Rectangle(),
    inner: new Rectangle()
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
      calculateRegions(node.layout, regions);
      const region = regions.get(DebugRegionType.Margin);
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
export {
  overlayPlugin
};
//# sourceMappingURL=overlayPlugin.mjs.map
