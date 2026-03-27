var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { ExtensionType } from "pixi.js";
import { loadYoga, Direction } from "yoga-layout/load";
import { setYoga, setYogaConfig, getYoga } from "../yoga.mjs";
import { calculatePositionSpecifier } from "./mixins/utils/calculatePositionSpecifier.mjs";
import { getPixiSize } from "./utils/getPixiSize.mjs";
import { nearlyEqual } from "./utils/nearlyEqual.mjs";
import { throttle } from "./utils/throttle.mjs";
class LayoutSystem {
  constructor() {
    /**
     * Whether the layout system should automatically update the layout when it detects changes
     * @default true
     */
    __publicField(this, "autoUpdate", true);
    __publicField(this, "_debugEnabled", false);
    __publicField(this, "_debugRenderer", null);
    __publicField(this, "_throttledUpdateSize");
    __publicField(this, "_throttle", 100);
    __publicField(this, "_modificationCount", 50);
  }
  /**
   * Initializes the layout system by loading the Yoga library asynchronously
   * @returns A promise that resolves when the system is ready
   */
  async init(options) {
    setYoga(await loadYoga());
    setYogaConfig(getYoga().Config.create());
    const { layout } = options ?? {};
    const { autoUpdate, enableDebug, throttle: throttle$1, debugModificationCount } = layout ?? {};
    if (enableDebug) {
      void this.enableDebug(true);
    }
    if (autoUpdate !== void 0) {
      this.autoUpdate = autoUpdate;
    }
    this._throttle = throttle$1 ?? this._throttle;
    this._throttledUpdateSize = throttle((container) => this._updateSize(container), this._throttle, {
      leading: true,
      trailing: true
    });
    this._modificationCount = debugModificationCount ?? this._modificationCount;
  }
  /**
   * Toggles the debug mode for the layout system
   * @param value - Whether to enable or disable debug mode
   */
  async enableDebug(value = !this._debugEnabled) {
    this._debugEnabled = value;
    if (!this._debugRenderer) {
      const res = await import("./debug/DebugRenderer.mjs");
      this._debugRenderer = new res.DebugRenderer();
    }
    if (!this._debugEnabled) {
      this._debugRenderer.reset();
    }
  }
  /**
   * Updates the layout of the container and its children
   * @param container - The container to update the layout for
   */
  update(container) {
    if (this._debugEnabled && this._debugRenderer) {
      this._debugRenderer.reset();
      container.addChild(this._debugRenderer.holder);
    }
    this._throttle === 0 ? this._updateSize(container) : this._throttledUpdateSize(container);
    this.updateLayout(container);
  }
  prerender({ container }) {
    if (this.autoUpdate) {
      this.update(container);
    }
  }
  /**
   * Updates the size of the yoga nodes for the containers that use pixi size
   * @param container - The container to update the size for
   */
  _updateSize(container) {
    const layout = container._layout;
    if (layout) {
      const layoutStyles = layout.style;
      if (layoutStyles.width === "intrinsic" || layoutStyles.height === "intrinsic") {
        const size = getPixiSize(layout);
        if (layoutStyles.width === "intrinsic") {
          const currentWidth = layout.yoga.getWidth().value;
          if (!nearlyEqual(currentWidth, size.width)) {
            layout.yoga.setWidth(size.width);
            layout.invalidateRoot();
          }
        }
        if (layoutStyles.height === "intrinsic") {
          const currentHeight = layout.yoga.getHeight().value;
          if (!nearlyEqual(currentHeight, size.height)) {
            layout.yoga.setHeight(size.height);
            layout.invalidateRoot();
          }
        }
      }
      if (!container.visible) {
        layout._onChildRemoved();
        return;
      }
    }
    for (let i = 0; i < container.children.length; i++) {
      this._updateSize(container.children[i]);
    }
  }
  /**
   * Updates the layout of the container and its children
   * @param container - The container to update the layout for
   */
  updateLayout(container) {
    var _a, _b, _c, _d;
    const layout = container._layout;
    if (!container.visible) {
      return;
    }
    if (layout) {
      const yogaNode = layout.yoga;
      const layoutStyles = layout.style;
      const isOverflowContainer = (_a = container.parent) == null ? void 0 : _a.isOverflowContainer;
      const hasParentLayout = (_b = container.parent) == null ? void 0 : _b._layout;
      if (!hasParentLayout && !isOverflowContainer) {
        if (layout._isDirty) {
          layout._isDirty = false;
          yogaNode.calculateLayout(
            layoutStyles.width,
            // TODO: if this is not a number, it will not work
            layoutStyles.height,
            yogaNode.getDirection() ?? Direction.LTR
          );
        }
      }
      if (yogaNode.hasNewLayout() || layout._forceUpdate) {
        yogaNode.markLayoutSeen();
        layout._forceUpdate = false;
        layout._computedLayout = yogaNode.getComputedLayout();
        const res = calculatePositionSpecifier(layoutStyles.transformOrigin, layout._computedLayout, {
          width: 0,
          height: 0
        });
        layout._computedPixiLayout = {
          ...container.computeLayoutData(layout._computedLayout),
          originX: res.x,
          originY: res.y
        };
        container.emit("layout", layout);
        (_c = container.onLayout) == null ? void 0 : _c.call(container, layout);
        container._onUpdate();
      }
      if (this._debugEnabled) {
        if (layout._styles.custom.debug || layout._modificationCount > this._modificationCount && layout._styles.custom.debugHeat !== false) {
          (_d = this._debugRenderer) == null ? void 0 : _d.render(layout);
        }
      }
    }
    for (let i = 0; i < container.children.length; i++) {
      this.updateLayout(container.children[i]);
    }
  }
  /**
   * @ignore
   */
  destroy() {
    if (!this._debugEnabled && this._debugRenderer) {
      this._debugRenderer.destroy();
    }
  }
}
/** @ignore */
__publicField(LayoutSystem, "extension", {
  type: [ExtensionType.WebGLSystem, ExtensionType.WebGPUSystem],
  name: "layout"
});
export {
  LayoutSystem
};
//# sourceMappingURL=LayoutSystem.mjs.map
