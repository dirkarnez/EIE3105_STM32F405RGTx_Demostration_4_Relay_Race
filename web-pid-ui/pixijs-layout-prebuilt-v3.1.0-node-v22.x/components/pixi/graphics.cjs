"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const pixi_js = require("pixi.js");
const base = require("./base.cjs");
class LayoutGraphics extends base.BaseView {
  constructor(opts) {
    if (opts instanceof pixi_js.GraphicsContext) {
      opts = { context: opts };
    }
    super({
      ...opts,
      ClassType: pixi_js.Graphics
    });
  }
}
class Graphics extends pixi_js.Graphics {
  constructor(opts) {
    if (opts instanceof pixi_js.GraphicsContext) {
      opts = { context: opts };
    }
    const { layout, ...options } = opts ?? {};
    super(options);
    this.layout = layout;
  }
}
exports.Graphics = Graphics;
exports.LayoutGraphics = LayoutGraphics;
//# sourceMappingURL=graphics.cjs.map
