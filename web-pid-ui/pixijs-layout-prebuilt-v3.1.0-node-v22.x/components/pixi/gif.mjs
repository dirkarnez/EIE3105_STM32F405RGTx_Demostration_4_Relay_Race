import { GifSprite as GifSprite$1, GifSource } from "pixi.js/gif";
import { BaseView } from "./base.mjs";
class LayoutGifSprite extends BaseView {
  constructor(opts) {
    if (opts instanceof GifSource) {
      opts = { source: opts };
    }
    super({
      ...opts,
      ClassType: GifSprite$1
    });
  }
}
class GifSprite extends GifSprite$1 {
  constructor(opts) {
    if (opts instanceof GifSource) {
      opts = { source: opts };
    }
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
export {
  GifSprite,
  LayoutGifSprite
};
//# sourceMappingURL=gif.mjs.map
