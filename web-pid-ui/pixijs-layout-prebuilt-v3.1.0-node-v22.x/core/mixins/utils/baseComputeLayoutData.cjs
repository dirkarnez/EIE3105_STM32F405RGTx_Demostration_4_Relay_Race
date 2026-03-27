"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const pixi_js = require("pixi.js");
const calculateObjectFit = require("./calculateObjectFit.cjs");
const calculatePositionSpecifier = require("./calculatePositionSpecifier.cjs");
function baseComputeLayoutData(container, computedLayout, defaultObjectFit, anchor) {
  const bounds = container.getLocalBounds();
  const objectFit = container.layout.style.objectFit || defaultObjectFit;
  let { offsetScaleX, offsetScaleY } = calculateObjectFit.calculateObjectFit(objectFit, computedLayout, bounds);
  const scaledBounds = {
    width: bounds.width * offsetScaleX,
    height: bounds.height * offsetScaleY
  };
  let { x: offsetX, y: offsetY } = calculatePositionSpecifier.calculatePositionSpecifier(
    container.layout.style.objectPosition,
    computedLayout,
    scaledBounds
  );
  if (anchor) {
    offsetX += bounds.width * offsetScaleX * anchor._x;
    offsetY += bounds.height * offsetScaleY * anchor._y;
  } else {
    offsetX -= bounds.minX * offsetScaleX;
    offsetY -= bounds.minY * offsetScaleY;
  }
  const applySizeDirectly = container.layout.style.applySizeDirectly;
  if (applySizeDirectly === true || // eslint-disable-next-line eqeqeq
  applySizeDirectly == void 0 && (container instanceof pixi_js.TilingSprite || container instanceof pixi_js.NineSliceSprite)) {
    container.width = bounds.width * offsetScaleX;
    container.height = bounds.height * offsetScaleY;
    offsetScaleX = 1;
    offsetScaleY = 1;
  }
  return {
    x: computedLayout.left,
    y: computedLayout.top,
    offsetX,
    offsetY,
    scaleX: offsetScaleX,
    scaleY: offsetScaleY
  };
}
exports.baseComputeLayoutData = baseComputeLayoutData;
//# sourceMappingURL=baseComputeLayoutData.cjs.map
