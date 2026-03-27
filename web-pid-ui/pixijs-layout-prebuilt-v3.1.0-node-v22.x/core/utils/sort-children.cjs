"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
function onChildAdded(layout, pixiParent) {
  var _a;
  let parentLayout = pixiParent.layout;
  let yogaIndex = -1;
  if (!parentLayout && pixiParent.isOverflowContainer) {
    parentLayout = (_a = pixiParent.parent) == null ? void 0 : _a.layout;
    yogaIndex = pixiParent.children.indexOf(layout.target);
    pixiParent = pixiParent.parent;
  }
  if (parentLayout) {
    const yogaParent = layout.yoga.getParent();
    if (yogaParent) {
      yogaParent.removeChild(layout.yoga);
    }
    if (pixiParent.children.indexOf(layout.target) === pixiParent.children.length - 1 && yogaIndex === -1) {
      parentLayout.yoga.insertChild(layout.yoga, parentLayout.yoga.getChildCount());
      return;
    }
    for (let i = 0; i < pixiParent.children.length; i++) {
      const child = pixiParent.children[i];
      if (child.layout && child.visible) {
        yogaIndex++;
      }
      if (child === layout.target) {
        break;
      }
    }
    if (yogaIndex === -1) {
      return;
    }
    parentLayout.yoga.insertChild(layout.yoga, yogaIndex);
  }
}
function onChildRemoved(layout) {
  const yogaParent = layout.yoga.getParent();
  yogaParent && yogaParent.removeChild(layout.yoga);
}
exports.onChildAdded = onChildAdded;
exports.onChildRemoved = onChildRemoved;
//# sourceMappingURL=sort-children.cjs.map
