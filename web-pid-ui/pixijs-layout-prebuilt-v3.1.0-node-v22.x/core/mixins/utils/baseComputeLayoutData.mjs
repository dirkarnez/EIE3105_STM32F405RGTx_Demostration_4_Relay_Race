import { TilingSprite as TilingSprite$1, NineSliceSprite as NineSliceSprite$1 } from "pixi.js";
import { calculateObjectFit } from "./calculateObjectFit.mjs";
import { calculatePositionSpecifier } from "./calculatePositionSpecifier.mjs";
function baseComputeLayoutData(container, computedLayout, defaultObjectFit, anchor) {
  const bounds = container.getLocalBounds();
  const objectFit = container.layout.style.objectFit || defaultObjectFit;
  let { offsetScaleX, offsetScaleY } = calculateObjectFit(objectFit, computedLayout, bounds);
  const scaledBounds = {
    width: bounds.width * offsetScaleX,
    height: bounds.height * offsetScaleY
  };
  let { x: offsetX, y: offsetY } = calculatePositionSpecifier(
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
  applySizeDirectly == void 0 && (container instanceof TilingSprite$1 || container instanceof NineSliceSprite$1)) {
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
export {
  baseComputeLayoutData
};
//# sourceMappingURL=baseComputeLayoutData.mjs.map
