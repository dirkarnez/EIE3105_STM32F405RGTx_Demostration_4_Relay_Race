import { extensions, ViewContainer } from "pixi.js";
import { baseComputeLayoutData } from "./utils/baseComputeLayoutData.mjs";
const mixin = {
  /**
   * Computes the layout data for the container
   * @param computedLayout - The computed layout from Yoga
   * @returns The layout data for the container
   */
  computeLayoutData(computedLayout) {
    return baseComputeLayoutData(this, computedLayout, "fill", this._anchor);
  }
};
extensions.mixin(ViewContainer, mixin);
//# sourceMappingURL=ViewContainerMixin.mjs.map
