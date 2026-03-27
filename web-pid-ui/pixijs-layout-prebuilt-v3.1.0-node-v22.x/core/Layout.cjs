"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const yoga = require("../yoga.cjs");
const applyStyle = require("./style/applyStyle.cjs");
const formatStyles = require("./style/formatStyles.cjs");
const sortChildren = require("./utils/sort-children.cjs");
class Layout {
  constructor({ target }) {
    /** The Yoga node instance for this layout */
    __publicField(this, "yoga");
    /** The target PixiJS container */
    __publicField(this, "target");
    /**
     * Flag indicating if layout needs recalculation
     * @ignore
     */
    __publicField(this, "_isDirty", false);
    /**
     * The computed pixi layout that is applied to the target container in the updateLocalTransform step
     * @ignore
     */
    __publicField(this, "_computedPixiLayout", {
      /** The left value of the view */
      x: 0,
      /** The top value of the view */
      y: 0,
      /** The offset x value of the view within its box */
      offsetX: 0,
      /** The offset y value of the view within its box */
      offsetY: 0,
      /** The scale x value of the view within its box */
      scaleX: 1,
      /** The scale y value of the view within its box */
      scaleY: 1,
      /** The x origin of the view */
      originX: 0,
      /** The y origin of the view */
      originY: 0
    });
    /**
     * The computed bounds of the yoga node
     * @ignore
     */
    __publicField(this, "_computedLayout", {
      /** The left value of the view */
      left: 0,
      /** The right value of the view */
      right: 0,
      /** The top value of the view */
      top: 0,
      /** The bottom value of the view */
      bottom: 0,
      /** The width of the view */
      width: 0,
      /** The height of the view */
      height: 0
    });
    /**
     * The styles used for layout calculation
     * @ignore
     */
    __publicField(this, "_styles", {
      custom: {},
      yoga: {}
    });
    /**
     * The number of times the layout has been modified
     * @ignore
     */
    __publicField(this, "_modificationCount", 0);
    /**
     * Flag indicating if the layout should be recalculated even if it hasn't changed the yoga node.
     * This is used to force an update when certain style properties change such as `objectFit`.
     * @ignore
     */
    __publicField(this, "_forceUpdate", false);
    /**
     * Flag indicating if the layout has a parent node
     */
    __publicField(this, "hasParent", false);
    /**
     * The keys to track for changes to force an update
     * @ignore
     */
    __publicField(this, "_trackedStyleKeys", [
      "borderRadius",
      "borderColor",
      "backgroundColor",
      "objectFit",
      "objectPosition",
      "transformOrigin",
      "isLeaf"
    ]);
    this.target = target;
    this.yoga = yoga.getYoga().Node.create(yoga.getYogaConfig());
    target.on("added", this._onChildAdded, this);
    target.on("removed", this._onChildRemoved, this);
    target.on("destroyed", this.destroy, this);
  }
  /** Returns the layout style */
  get style() {
    return this._styles.custom;
  }
  /** Returns the computed layout of the yoga node */
  get computedLayout() {
    return this._computedLayout;
  }
  /** Returns the computed layout of the pixi node */
  get computedPixiLayout() {
    return this._computedPixiLayout;
  }
  /**
   * Returns the true x position of the target.
   *
   * When an element is in layout, the x/y position is an offset from where it is laid out.
   * This is the true x position of the element in the parent container.
   */
  get realX() {
    return this.target.localTransform.tx;
  }
  /**
   * Returns the true y position of the target.
   *
   * When an element is in layout, the x/y position is an offset from where it is laid out.
   * This is the true y position of the element in the parent container.
   */
  get realY() {
    return this.target.localTransform.ty;
  }
  /**
   * Returns the true x scale of the target.
   *
   * When an element is in layout, the scale is an offset from 1.
   * This is the true x scale of the element.
   */
  get realScaleX() {
    return this.target.localTransform.a;
  }
  /**
   * Returns the true y scale of the target.
   *
   * When an element is in layout, the scale is an offset from 1.
   * This is the true y scale of the element.
   */
  get realScaleY() {
    return this.target.localTransform.d;
  }
  /**
   * Updates the layout style and triggers recalculation
   * @param style - New layout style to apply
   */
  setStyle(style) {
    const styles = formatStyles.formatStyles(this, style);
    const differentCustom = JSON.stringify(this._styles.custom) !== JSON.stringify(styles.custom);
    const differentYoga = JSON.stringify(this._styles.yoga) !== JSON.stringify(styles.yoga);
    const different = differentCustom || differentYoga;
    const hasTrackedChanges = this._trackedStyleKeys.some((key) => styles.custom[key] !== this._styles.custom[key]);
    this._styles = styles;
    if (hasTrackedChanges) {
      this._forceUpdate = true;
    }
    if (different) {
      applyStyle.applyStyle(this.yoga, this._styles.yoga);
      this.target._onUpdate();
      this.invalidateRoot();
    }
  }
  /** Marks the root layout as needing recalculation */
  invalidateRoot() {
    const root = this.getRoot();
    root._layout._isDirty = true;
    root._onUpdate();
    this._modificationCount++;
  }
  /**
   * Forces an update of the layout even if it hasn't changed the yoga node.
   * This is used to force an update when certain style properties change such as `objectFit`.
   * Or when you have changed something inside of Pixi that is not tracked by the layout system.
   */
  forceUpdate() {
    this._forceUpdate = true;
  }
  /**
   * Finds the root container by traversing up the layout tree
   * @returns The root container
   */
  getRoot() {
    var _a, _b;
    let root = this.target;
    while (((_a = root.parent) == null ? void 0 : _a._layout) || ((_b = root.parent) == null ? void 0 : _b.isOverflowContainer)) {
      root = root.parent;
      if (root.isOverflowContainer) {
        root = root.parent;
      }
    }
    return root;
  }
  /**
   * @ignore
   */
  _onChildAdded(pixiParent) {
    if (this.hasParent) return;
    this.hasParent = true;
    this.invalidateRoot();
    sortChildren.onChildAdded(this, pixiParent);
  }
  /**
   * @ignore
   */
  _onChildRemoved() {
    if (!this.hasParent) return;
    this.hasParent = false;
    this.invalidateRoot();
    sortChildren.onChildRemoved(this);
  }
  destroy() {
    this.invalidateRoot();
    this.yoga.free();
    this.target.off("added", this._onChildAdded, this);
    this.target.off("removed", this._onChildRemoved, this);
    this._styles = null;
    this._computedPixiLayout = null;
    this._computedLayout = null;
    this.target = null;
    this.hasParent = false;
  }
}
/** Default style values to apply to the layout */
__publicField(Layout, "defaultStyle", {
  leaf: {
    width: "intrinsic",
    height: "intrinsic"
  },
  container: {
    width: "auto",
    height: "auto"
  },
  shared: {
    transformOrigin: "50%",
    objectPosition: "center",
    flexShrink: 1,
    flexDirection: "row",
    alignContent: "stretch",
    flexWrap: "nowrap",
    overflow: "visible"
  }
});
exports.Layout = Layout;
//# sourceMappingURL=Layout.cjs.map
