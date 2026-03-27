"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const pixi_js = require("pixi.js");
const LayoutContainer = require("./LayoutContainer.cjs");
class LayoutView extends LayoutContainer.LayoutContainer {
  constructor(params) {
    const { slot, layout, ...rest } = params;
    super(rest);
    /** The slot container for holding content */
    __publicField(this, "slot");
    this.slot = params.slot ?? new pixi_js.Container({ label: "slot" });
    this.layout = layout ?? {};
    this.addChild(this.slot);
    this.addChild = this._addChild.bind(this);
  }
  /**
   * Gets the current layout associated with this container
   * @returns The container's layout or null if no layout is attached
   */
  get layout() {
    return super.layout;
  }
  /**
   * Sets the layout for this container and configures its slot.
   *
   * The layout is split between the container and slot:
   * - Container: Handles positioning, size, and background
   * - Slot: Manages content fitting and positioning
   *
   * @param value - Layout options to apply, or null to remove layout
   *
   * @example
   * ```typescript
   * view.layout = {`
   *     width: '100%',
   *     objectFit: 'contain',
   *     objectPosition: 'center',
   *     backgroundColor: 'red'
   * };
   * ```
   */
  set layout(value) {
    value = value === true ? {} : value;
    if (!value) {
      this.slot.layout = null;
      super.layout = null;
      return;
    }
    const { applySizeDirectly, objectFit, objectPosition, isLeaf, ...rest } = value ?? {};
    super.layout = rest;
    if (this.layout && this.slot) {
      this.slot.layout = {
        width: "100%",
        height: "100%",
        ...objectFit && { objectFit },
        ...objectPosition && { objectPosition },
        ...applySizeDirectly && { applySizeDirectly },
        ...isLeaf && { isLeaf }
      };
    }
  }
  /**
   * Prevents adding children directly to this container.
   * Content should be added to the slot instead.
   *
   * @throws {Error} Always throws an error to enforce leaf node behavior
   * @private
   */
  _addChild(..._children) {
    if (this.overflowContainer.children.length >= 1) {
      throw new Error("Leaf nodes should not have multiple children");
    }
    return this.overflowContainer.addChild(..._children);
  }
}
exports.LayoutView = LayoutView;
//# sourceMappingURL=LayoutView.cjs.map
