"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const temp = { width: 0, height: 0 };
function getPixiSize(layout) {
  const bounds = layout.target.getLocalBounds();
  const scale = layout.target.scale;
  temp.width = Math.abs(bounds.width * scale.x);
  temp.height = Math.abs(bounds.height * scale.y);
  return temp;
}
exports.getPixiSize = getPixiSize;
//# sourceMappingURL=getPixiSize.cjs.map
