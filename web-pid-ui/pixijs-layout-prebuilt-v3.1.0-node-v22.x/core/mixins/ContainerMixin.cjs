"use strict";
const pixi_js = require("pixi.js");
const Layout = require("../Layout.cjs");
const baseComputeLayoutData = require("./utils/baseComputeLayoutData.cjs");
const visibility = Object.getOwnPropertyDescriptor(pixi_js.Container.prototype, "visible");
const mixin = {
  // Internal reference to the layout object
  _layout: null,
  /**
   * Gets the current layout associated with this container
   * @returns The container's layout or null if no layout is attached
   */
  get layout() {
    return this._layout ?? null;
  },
  /**
   * Sets the layout for this container
   * @param value - Layout options to apply, or null to remove layout
   */
  set layout(value) {
    value = value === true ? {} : value;
    if (!value) {
      if (this._layout) {
        this._layout.destroy();
        this._layout = null;
        this.updateLocalTransform = pixi_js.Container.prototype.updateLocalTransform;
        Object.defineProperty(pixi_js.Container.prototype, "visible", visibility);
      }
      return;
    }
    if (!this._layout) {
      this._layout = new Layout.Layout({ target: this });
      Object.defineProperty(pixi_js.Container.prototype, "visible", {
        ...visibility,
        set(visibleValue) {
          visibility.set.call(this, visibleValue);
          if (this.layout) {
            if (visibleValue && this.parent) {
              this.layout._onChildAdded(this.parent);
            } else {
              this.layout._onChildRemoved();
            }
          }
        }
      });
      for (const child of this.children) {
        if (child.layout && child.visible) {
          child.layout._onChildRemoved();
          child.layout._onChildAdded(this);
        }
      }
      if (this.parent && this.visible) {
        this._layout._onChildAdded(this.parent);
      }
    }
    this._layout.setStyle(value);
    this.updateLocalTransform = this.updateLocalTransformWithLayout;
    this._onUpdate();
  },
  /**
   * This function overrides how we calculate the local transform of the container.
   * For the layout, we need to not only calculate the transform matrix, but also
   * take into account the yoga layout's position and scale.
   */
  updateLocalTransformWithLayout() {
    const localTransformChangeId = this._didContainerChangeTick;
    if (this._didLocalTransformChangeId === localTransformChangeId) return;
    this._didLocalTransformChangeId = localTransformChangeId;
    const layout = this._layout;
    const { x, y, offsetX, offsetY, scaleX, scaleY, originX, originY } = layout._computedPixiLayout;
    const lt = this.localTransform;
    const { rotation, skew, scale, position } = this;
    const xRotY = rotation + skew._y;
    const xRotX = rotation - skew._x;
    const a = Math.cos(xRotY) * scale._x;
    const b = Math.sin(xRotY) * scale._x;
    const c = -Math.sin(xRotX) * scale._y;
    const d = Math.cos(xRotX) * scale._y;
    const tx = position._x + x - originX * a - originY * c;
    const ty = position._y + y - originX * b - originY * d;
    lt.a = a * scaleX;
    lt.b = b * scaleX;
    lt.c = c * scaleY;
    lt.d = d * scaleY;
    lt.tx = tx + (offsetX * a + offsetY * c) + originX;
    lt.ty = ty + (offsetX * b + offsetY * d) + originY;
  },
  /**
   * Apply the computed layout to the container
   * Converts Yoga layout information into PixiJS positioning
   * @param computedLayout - Layout data from Yoga engine
   * @returns Transformed position and scale data for this container
   * @memberof scene.Container#
   */
  computeLayoutData(computedLayout) {
    const layout = this._layout;
    const { isLeaf } = layout._styles.custom;
    if (isLeaf) {
      return baseComputeLayoutData.baseComputeLayoutData(this, computedLayout, "fill");
    }
    return {
      x: computedLayout.left,
      y: computedLayout.top,
      offsetX: 0,
      offsetY: 0,
      scaleX: 1,
      scaleY: 1
    };
  }
};
pixi_js.extensions.mixin(pixi_js.Container, mixin);
//# sourceMappingURL=ContainerMixin.cjs.map
