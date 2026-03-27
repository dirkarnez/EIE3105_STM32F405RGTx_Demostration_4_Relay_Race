import { Text as Text$1, BitmapText as BitmapText$1, HTMLText as HTMLText$1 } from "pixi.js";
import { BaseView } from "./base.mjs";
class LayoutText extends BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: Text$1
    });
  }
}
class Text extends Text$1 {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutBitmapText extends BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: BitmapText$1
    });
  }
}
class BitmapText extends BitmapText$1 {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutHTMLText extends BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: HTMLText$1
    });
  }
}
class HTMLText extends HTMLText$1 {
  constructor(opts) {
    const { layout, ...options } = opts ?? {};
    super(options);
    this.layout = layout;
  }
}
export {
  BitmapText,
  HTMLText,
  LayoutBitmapText,
  LayoutHTMLText,
  LayoutText,
  Text
};
//# sourceMappingURL=text.mjs.map
