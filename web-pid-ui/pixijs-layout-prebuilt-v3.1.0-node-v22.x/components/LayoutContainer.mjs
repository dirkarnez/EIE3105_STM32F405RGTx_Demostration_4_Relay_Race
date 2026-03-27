var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Container, Graphics as Graphics$1, Rectangle, Ticker } from "pixi.js";
import { Edge, BoxSizing } from "yoga-layout/load";
import { Trackpad } from "./trackpad/Trackpad.mjs";
function bindAndPreserve(base, source, methodNames) {
  const bound = {};
  const proto = Object.getPrototypeOf(base);
  for (const name of methodNames) {
    const method = proto[name];
    bound[name] = method.bind(base);
    base[name] = (...args) => source[name](...args);
  }
  return bound;
}
class LayoutContainer extends Container {
  constructor(params = {}) {
    const { layout, trackpad, background, children, ...options } = params;
    super(options);
    /** Graphics object used for rendering background and borders */
    __publicField(this, "background");
    __publicField(this, "stroke", new Graphics$1({ label: "stroke" }));
    /** The container that holds the overflow content */
    __publicField(this, "overflowContainer", new Container({
      label: "overflowContainer"
    }));
    /** Access to original Container methods */
    __publicField(this, "containerMethods");
    /** The trackpad for handling scrolling */
    __publicField(this, "_trackpad");
    /** Mask for overflow handling */
    __publicField(this, "_mask", new Graphics$1());
    /** Whether or not the background was created by the user */
    __publicField(this, "_isUserBackground", false);
    /** The hit area for the container */
    __publicField(this, "_hitArea", new Rectangle());
    this.layout = layout ?? {};
    children == null ? void 0 : children.forEach((child) => this.addChild(child));
    this.overflowContainer.isOverflowContainer = true;
    this.background = background ?? new Graphics$1({ label: "background" });
    this._isUserBackground = !!background;
    this.addChild(this.background, this.overflowContainer, this._mask, this.stroke);
    this.containerMethods = bindAndPreserve(this, this.overflowContainer, [
      "addChild",
      "addChildAt",
      "removeChild",
      "removeChildAt",
      "getChildAt",
      "getChildIndex",
      "setChildIndex",
      "getChildByName",
      "removeChildren",
      "sortChildren",
      "swapChildren",
      "reparentChild",
      "reparentChildAt",
      "getChildByLabel",
      "getChildrenByLabel"
    ]);
    this._trackpad = new Trackpad({
      constrain: true,
      ...trackpad
    });
    this.eventMode = "static";
    this.on("pointerdown", (e) => this._trackpad.pointerDown(e.global));
    this.on("pointerup", () => this._trackpad.pointerUp());
    this.on("pointerupoutside", () => this._trackpad.pointerUp());
    this.on("pointermove", (e) => this._trackpad.pointerMove(e.global));
    this.on("pointercancel", () => this._trackpad.pointerUp());
    this.on("wheel", (e) => {
      var _a;
      const overflow = (_a = this.layout) == null ? void 0 : _a.style.overflow;
      if (overflow !== "scroll") {
        return;
      }
      const shift = e.shiftKey ? 1 : 0;
      const deltaX = e.deltaX * (shift ? 1 : -1);
      const deltaY = e.deltaY * (shift ? -1 : 1);
      const targetX = this._trackpad.xAxis.value - deltaX;
      const targetY = this._trackpad.yAxis.value - deltaY;
      this._trackpad.xAxis.value = Math.max(
        this._trackpad.xAxis.max,
        Math.min(this._trackpad.xAxis.min, targetX)
      );
      this._trackpad.yAxis.value = Math.max(
        this._trackpad.yAxis.max,
        Math.min(this._trackpad.yAxis.min, targetY)
      );
    });
    Ticker.shared.add(this.update, this);
  }
  /**
   * Computes the layout data for this container based on yoga calculations and draws the background.
   * @param computedLayout - The computed layout data from yoga
   * @returns Position and scale information for the container
   * @internal
   */
  computeLayoutData(computedLayout) {
    this._drawBackground(computedLayout);
    this._hitArea.width = computedLayout.width;
    this._hitArea.height = computedLayout.height;
    this.hitArea = this._hitArea;
    return {
      x: computedLayout.left,
      y: computedLayout.top,
      offsetX: 0,
      offsetY: 0,
      scaleX: 1,
      scaleY: 1
    };
  }
  /**
   * Updates the container mask based on overflow settings
   * @param width - Container width
   * @param height - Container height
   * @param radius - Border radius
   */
  _updateMask(width, height, radius = 0) {
    this._mask.clear();
    this._mask.roundRect(0, 0, width, height, radius);
    this._mask.fill(255);
    this._mask.roundRect(1, 1, width - 2, height - 2, radius);
    this._mask.cut();
    this._mask.roundRect(1, 1, width - 2, height - 2, radius);
    this._mask.fill(65280);
    this._mask.cut();
  }
  _updateBackground(computedLayout) {
    const layoutStyles = this.layout.style;
    const { backgroundColor, borderRadius } = layoutStyles;
    if (this._isUserBackground) {
      this.background.position.set(0, 0);
      this.background.setSize(computedLayout.width, computedLayout.height);
    } else {
      const background = this.background;
      background.clear();
      background.roundRect(0, 0, computedLayout.width, computedLayout.height, borderRadius ?? 0);
      if (backgroundColor != null) {
        background.fill({ color: backgroundColor });
      }
    }
  }
  /**
   * Draws the container's background including:
   * - Background color
   * - Border
   * - Border radius
   *
   * @param computedLayout - The computed layout data from yoga
   * @protected
   */
  _drawBackground(computedLayout) {
    var _a;
    const borderWidth = this.layout.yoga.getBorder(Edge.All);
    const boxSizing = this.layout.yoga.getBoxSizing();
    const alignment = boxSizing === BoxSizing.BorderBox ? 1 : 0;
    const layoutStyles = this.layout.style;
    const { borderColor, borderRadius } = layoutStyles;
    this._updateBackground(computedLayout);
    this.stroke.clear();
    if (borderWidth > 0 && borderColor != null) {
      this.stroke.roundRect(0, 0, computedLayout.width, computedLayout.height, borderRadius ?? 0);
      this.stroke.stroke({ color: borderColor, width: borderWidth, alignment });
    }
    const overflow = (_a = this.layout) == null ? void 0 : _a.style.overflow;
    if (overflow !== "visible") {
      this._updateMask(computedLayout.width, computedLayout.height, layoutStyles.borderRadius ?? 0);
      this.setMask({ mask: this._mask });
      const borderOffset = boxSizing === BoxSizing.BorderBox ? borderWidth : 0;
      setTimeout(() => {
        const maskWidth = computedLayout.width - this.overflowContainer.width - borderOffset * 2;
        const maskHeight = computedLayout.height - this.overflowContainer.height - borderOffset * 2;
        this._trackpad.xAxis.max = Math.min(0, maskWidth);
        this._trackpad.yAxis.max = Math.min(0, maskHeight);
      }, 1);
    } else {
      this.mask = null;
      this._trackpad.xAxis.value = 0;
      this._trackpad.yAxis.value = 0;
      this.overflowContainer.position.set(0, 0);
    }
  }
  update() {
    var _a;
    const overflow = (_a = this.layout) == null ? void 0 : _a.style.overflow;
    if (overflow !== "scroll") {
      return;
    }
    this._trackpad.update();
    this.overflowContainer.x = this._trackpad.x;
    this.overflowContainer.y = this._trackpad.y;
  }
  destroy(options) {
    super.destroy(options);
    Ticker.shared.remove(this.update, this);
  }
}
export {
  LayoutContainer
};
//# sourceMappingURL=LayoutContainer.mjs.map
