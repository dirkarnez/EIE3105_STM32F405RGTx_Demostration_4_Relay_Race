import { Point, extensions, AbstractText } from "pixi.js";
import { calculateObjectFit } from "./utils/calculateObjectFit.mjs";
import { calculatePositionSpecifier } from "./utils/calculatePositionSpecifier.mjs";
const tempScale = new Point(0, 0);
const mixin = {
  /**
   * Computes the layout data for the text element
   * @param computedLayout - The computed layout from Yoga
   * @returns The layout data for the text element
   */
  computeLayoutData(computedLayout) {
    const style = this._style;
    tempScale.copyFrom(this.scale);
    this.scale = 1;
    if (style.wordWrap) {
      style.wordWrapWidth = computedLayout.width;
    }
    let bounds = this.getLocalBounds();
    const objectFit = this.layout.style.objectFit || "scale-down";
    const { offsetScaleX, offsetScaleY } = calculateObjectFit(objectFit, computedLayout, bounds);
    if (style.wordWrap) {
      style.wordWrapWidth = computedLayout.width / Math.min(1, Math.max(offsetScaleX, offsetScaleY));
    }
    bounds = this.getLocalBounds();
    const scaledBounds = {
      width: bounds.width * offsetScaleX,
      height: bounds.height * offsetScaleY
    };
    let { x: offsetX, y: offsetY } = calculatePositionSpecifier(
      this.layout.style.objectPosition,
      computedLayout,
      scaledBounds
    );
    offsetX += bounds.width * offsetScaleX * this.anchor._x;
    offsetY += bounds.height * offsetScaleY * this.anchor._y;
    const applySizeDirectly = this.layout.style.applySizeDirectly;
    if (applySizeDirectly === true) {
      this.width = bounds.width * offsetScaleX;
      this.height = bounds.height * offsetScaleY;
    }
    this.scale.copyFrom(tempScale);
    return {
      x: computedLayout.left,
      y: computedLayout.top,
      offsetX,
      offsetY,
      scaleX: offsetScaleX,
      scaleY: offsetScaleY
    };
  }
};
extensions.mixin(AbstractText, mixin);
const text = Object.getOwnPropertyDescriptor(AbstractText.prototype, "text");
Object.defineProperty(AbstractText.prototype, "text", {
  ...text,
  set(textString) {
    var _a;
    const currentText = text.get.call(this);
    text.set.call(this, textString);
    if (currentText === textString) return;
    (_a = this.layout) == null ? void 0 : _a.forceUpdate();
  }
});
//# sourceMappingURL=TextMixin.mjs.map
