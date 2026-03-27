import { Graphics as Graphics$1, GraphicsContext } from "pixi.js";
import { BaseView } from "./base.mjs";
class LayoutGraphics extends BaseView {
  constructor(opts) {
    if (opts instanceof GraphicsContext) {
      opts = { context: opts };
    }
    super({
      ...opts,
      ClassType: Graphics$1
    });
  }
}
class Graphics extends Graphics$1 {
  constructor(opts) {
    if (opts instanceof GraphicsContext) {
      opts = { context: opts };
    }
    const { layout, ...options } = opts ?? {};
    super(options);
    this.layout = layout;
  }
}
export {
  Graphics,
  LayoutGraphics
};
//# sourceMappingURL=graphics.mjs.map
