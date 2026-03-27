import { Sprite as Sprite$1, NineSliceSprite as NineSliceSprite$1, TilingSprite as TilingSprite$1, AnimatedSprite as AnimatedSprite$1, Texture } from "pixi.js";
import { BaseView } from "./base.mjs";
class LayoutSprite extends BaseView {
  constructor(opts) {
    if (opts instanceof Texture) {
      opts = { texture: opts };
    }
    super({
      ...opts,
      ClassType: Sprite$1
    });
  }
}
class Sprite extends Sprite$1 {
  constructor(opts) {
    if (opts instanceof Texture) {
      opts = { texture: opts };
    }
    const { layout, ...options } = opts ?? {};
    super(options);
    this.layout = layout;
  }
}
class LayoutNineSliceSprite extends BaseView {
  constructor(opts) {
    if (opts instanceof Texture) {
      opts = { texture: opts };
    }
    super({
      ...opts,
      ClassType: NineSliceSprite$1
    });
  }
}
class NineSliceSprite extends NineSliceSprite$1 {
  constructor(opts) {
    if (opts instanceof Texture) {
      opts = { texture: opts };
    }
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutTilingSprite extends BaseView {
  constructor(opts) {
    if (opts instanceof Texture) {
      opts = { texture: opts };
    }
    super({
      ...opts,
      ClassType: TilingSprite$1
    });
  }
}
class TilingSprite extends TilingSprite$1 {
  constructor(opts) {
    if (opts instanceof Texture) {
      opts = { texture: opts };
    }
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutAnimatedSprite extends BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: AnimatedSprite$1
    });
  }
}
class AnimatedSprite extends AnimatedSprite$1 {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
export {
  AnimatedSprite,
  LayoutAnimatedSprite,
  LayoutNineSliceSprite,
  LayoutSprite,
  LayoutTilingSprite,
  NineSliceSprite,
  Sprite,
  TilingSprite
};
//# sourceMappingURL=sprite.mjs.map
