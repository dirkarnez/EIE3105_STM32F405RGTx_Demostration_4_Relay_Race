"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const LayoutView = require("../LayoutView.cjs");
class BaseView extends LayoutView.LayoutView {
  constructor(opts) {
    const { layout, background, trackpad, ClassType, ...options } = opts;
    const slot = new ClassType(options);
    super({
      slot,
      layout,
      background,
      trackpad
    });
  }
}
exports.BaseView = BaseView;
//# sourceMappingURL=base.cjs.map
