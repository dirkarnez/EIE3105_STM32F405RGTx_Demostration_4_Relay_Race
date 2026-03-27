"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const pixi_js = require("pixi.js");
const base = require("./base.cjs");
class LayoutText extends base.BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: pixi_js.Text
    });
  }
}
class Text extends pixi_js.Text {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutBitmapText extends base.BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: pixi_js.BitmapText
    });
  }
}
class BitmapText extends pixi_js.BitmapText {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutHTMLText extends base.BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: pixi_js.HTMLText
    });
  }
}
class HTMLText extends pixi_js.HTMLText {
  constructor(opts) {
    const { layout, ...options } = opts ?? {};
    super(options);
    this.layout = layout;
  }
}
exports.BitmapText = BitmapText;
exports.HTMLText = HTMLText;
exports.LayoutBitmapText = LayoutBitmapText;
exports.LayoutHTMLText = LayoutHTMLText;
exports.LayoutText = LayoutText;
exports.Text = Text;
//# sourceMappingURL=text.cjs.map
