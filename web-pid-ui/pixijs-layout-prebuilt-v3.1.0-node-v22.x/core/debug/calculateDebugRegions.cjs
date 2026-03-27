"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const pixi_js = require("pixi.js");
const load = require("yoga-layout/load");
var DebugRegionType = /* @__PURE__ */ ((DebugRegionType2) => {
  DebugRegionType2["Margin"] = "margin";
  DebugRegionType2["Padding"] = "padding";
  DebugRegionType2["Border"] = "border";
  DebugRegionType2["Flex"] = "flex";
  DebugRegionType2["Content"] = "content";
  return DebugRegionType2;
})(DebugRegionType || {});
function getEdgeValues(layout, type) {
  const method = `getComputed${type.charAt(0).toUpperCase() + type.slice(1)}`;
  return {
    top: layout.yoga[method](load.Edge.Top),
    right: layout.yoga[method](load.Edge.Right),
    bottom: layout.yoga[method](load.Edge.Bottom),
    left: layout.yoga[method](load.Edge.Left)
  };
}
function calculateRegions(layout, regions) {
  const { width, height } = layout.computedLayout;
  const margin = getEdgeValues(layout, "margin");
  const border = getEdgeValues(layout, "border");
  const padding = getEdgeValues(layout, "padding");
  const marginRegion = regions.get(
    "margin"
    /* Margin */
  );
  marginRegion.outer.x = -margin.left;
  marginRegion.outer.y = -margin.top;
  marginRegion.outer.width = width + margin.left + margin.right;
  marginRegion.outer.height = height + margin.top + margin.bottom;
  marginRegion.inner.x = 0;
  marginRegion.inner.y = 0;
  marginRegion.inner.width = width;
  marginRegion.inner.height = height;
  const borderRegion = regions.get(
    "border"
    /* Border */
  );
  borderRegion.outer.x = 0;
  borderRegion.outer.y = 0;
  borderRegion.outer.width = width;
  borderRegion.outer.height = height;
  borderRegion.inner.x = border.left;
  borderRegion.inner.y = border.top;
  borderRegion.inner.width = width - border.left - border.right;
  borderRegion.inner.height = height - border.top - border.bottom;
  const paddingRegion = regions.get(
    "padding"
    /* Padding */
  );
  paddingRegion.outer.copyFrom(borderRegion.inner);
  paddingRegion.inner.x = padding.left + border.left;
  paddingRegion.inner.y = padding.top + border.top;
  paddingRegion.inner.width = width - padding.left - padding.right - border.left - border.right;
  paddingRegion.inner.height = height - padding.top - padding.bottom - border.top - border.bottom;
  calculateFlexRegion(layout, regions);
}
function calculateFlexRegion(layout, regions) {
  var _a;
  const flexRegion = regions.get(
    "flex"
    /* Flex */
  );
  const paddingRegion = regions.get(
    "padding"
    /* Padding */
  );
  flexRegion.outer.copyFrom(paddingRegion.inner);
  const bounds = new pixi_js.Bounds();
  const children = layout.yoga.getChildCount();
  for (let i = 0; i < children; i++) {
    const child = layout.yoga.getChild(i);
    const computedBounds = child.getComputedLayout();
    bounds.addRect(
      new pixi_js.Rectangle(computedBounds.left, computedBounds.top, computedBounds.width, computedBounds.height)
    );
  }
  const flexDir = layout.yoga.getFlexDirection();
  if (flexDir === load.FlexDirection.Column || flexDir === load.FlexDirection.ColumnReverse) {
    bounds.width = flexRegion.outer.width;
    bounds.x = flexRegion.outer.x;
  } else {
    bounds.height = flexRegion.outer.height;
    bounds.y = flexRegion.outer.y;
  }
  (_a = flexRegion.inner) == null ? void 0 : _a.copyFrom(bounds.rectangle);
  regions.get(
    "content"
    /* Content */
  ).outer.copyFrom(bounds.rectangle);
}
exports.DebugRegionType = DebugRegionType;
exports.calculateRegions = calculateRegions;
//# sourceMappingURL=calculateDebugRegions.cjs.map
