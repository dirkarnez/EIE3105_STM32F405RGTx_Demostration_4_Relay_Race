"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const pixi_js = require("pixi.js");
const Layout = require("../Layout.cjs");
const getPixiSize = require("../utils/getPixiSize.cjs");
function formatStyles(layout, style) {
  const currentStyles = layout._styles;
  let customStyles = { ...currentStyles.custom, ...style };
  const defaultStyle = {
    ...Layout.Layout.defaultStyle.shared,
    ...layout.target instanceof pixi_js.ViewContainer || customStyles.isLeaf || Layout.Layout.defaultStyle.shared.isLeaf ? Layout.Layout.defaultStyle.leaf : Layout.Layout.defaultStyle.container
  };
  customStyles = { ...defaultStyle, ...customStyles };
  const yogaStyles = { ...customStyles };
  const widthIntrinsic = customStyles.width === "intrinsic";
  const heightIntrinsic = customStyles.height === "intrinsic";
  if (widthIntrinsic || heightIntrinsic) {
    const { width, height } = getPixiSize.getPixiSize(layout);
    if (widthIntrinsic) {
      yogaStyles.width = width;
    }
    if (heightIntrinsic) {
      yogaStyles.height = height;
    }
  }
  return { custom: customStyles, yoga: yogaStyles };
}
exports.formatStyles = formatStyles;
//# sourceMappingURL=formatStyles.cjs.map
