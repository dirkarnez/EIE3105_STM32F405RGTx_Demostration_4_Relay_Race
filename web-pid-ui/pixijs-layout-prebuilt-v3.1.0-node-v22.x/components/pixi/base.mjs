import { LayoutView } from "../LayoutView.mjs";
class BaseView extends LayoutView {
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
export {
  BaseView
};
//# sourceMappingURL=base.mjs.map
