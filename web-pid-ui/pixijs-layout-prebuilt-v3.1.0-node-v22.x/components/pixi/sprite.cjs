"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const pixi_js = require("pixi.js");
const base = require("./base.cjs");
class LayoutSprite extends base.BaseView {
  constructor(opts) {
    if (opts instanceof pixi_js.Texture) {
      opts = { texture: opts };
    }
    super({
      ...opts,
      ClassType: pixi_js.Sprite
    });
  }
}
class Sprite extends pixi_js.Sprite {
  constructor(opts) {
    if (opts instanceof pixi_js.Texture) {
      opts = { texture: opts };
    }
    const { layout, ...options } = opts ?? {};
    super(options);
    this.layout = layout;
  }
}
class LayoutNineSliceSprite extends base.BaseView {
  constructor(opts) {
    if (opts instanceof pixi_js.Texture) {
      opts = { texture: opts };
    }
    super({
      ...opts,
      ClassType: pixi_js.NineSliceSprite
    });
  }
}
class NineSliceSprite extends pixi_js.NineSliceSprite {
  constructor(opts) {
    if (opts instanceof pixi_js.Texture) {
      opts = { texture: opts };
    }
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutTilingSprite extends base.BaseView {
  constructor(opts) {
    if (opts instanceof pixi_js.Texture) {
      opts = { texture: opts };
    }
    super({
      ...opts,
      ClassType: pixi_js.TilingSprite
    });
  }
}
class TilingSprite extends pixi_js.TilingSprite {
  constructor(opts) {
    if (opts instanceof pixi_js.Texture) {
      opts = { texture: opts };
    }
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutAnimatedSprite extends base.BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: pixi_js.AnimatedSprite
    });
  }
}
class AnimatedSprite extends pixi_js.AnimatedSprite {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
exports.AnimatedSprite = AnimatedSprite;
exports.LayoutAnimatedSprite = LayoutAnimatedSprite;
exports.LayoutNineSliceSprite = LayoutNineSliceSprite;
exports.LayoutSprite = LayoutSprite;
exports.LayoutTilingSprite = LayoutTilingSprite;
exports.NineSliceSprite = NineSliceSprite;
exports.Sprite = Sprite;
exports.TilingSprite = TilingSprite;
//# sourceMappingURL=sprite.cjs.map
