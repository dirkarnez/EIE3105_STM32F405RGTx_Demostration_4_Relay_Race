"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const gif = require("pixi.js/gif");
const base = require("./base.cjs");
class LayoutGifSprite extends base.BaseView {
  constructor(opts) {
    if (opts instanceof gif.GifSource) {
      opts = { source: opts };
    }
    super({
      ...opts,
      ClassType: gif.GifSprite
    });
  }
}
class GifSprite extends gif.GifSprite {
  constructor(opts) {
    if (opts instanceof gif.GifSource) {
      opts = { source: opts };
    }
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
exports.GifSprite = GifSprite;
exports.LayoutGifSprite = LayoutGifSprite;
//# sourceMappingURL=gif.cjs.map
