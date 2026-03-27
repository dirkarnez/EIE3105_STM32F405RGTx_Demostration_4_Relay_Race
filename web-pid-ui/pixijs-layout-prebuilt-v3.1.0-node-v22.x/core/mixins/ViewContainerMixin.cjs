"use strict";
const pixi_js = require("pixi.js");
const baseComputeLayoutData = require("./utils/baseComputeLayoutData.cjs");
const mixin = {
  /**
   * Computes the layout data for the container
   * @param computedLayout - The computed layout from Yoga
   * @returns The layout data for the container
   */
  computeLayoutData(computedLayout) {
    return baseComputeLayoutData.baseComputeLayoutData(this, computedLayout, "fill", this._anchor);
  }
};
pixi_js.extensions.mixin(pixi_js.ViewContainer, mixin);
//# sourceMappingURL=ViewContainerMixin.cjs.map
