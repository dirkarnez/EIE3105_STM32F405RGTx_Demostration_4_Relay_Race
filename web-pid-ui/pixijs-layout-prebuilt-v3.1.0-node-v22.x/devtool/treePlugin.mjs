function flashNode(node) {
  const originalAlpha = node.alpha;
  let count = 0;
  const interval = setInterval(() => {
    if (count % 2 === 0) {
      node.alpha = 0.1;
    } else {
      node.alpha = 1;
    }
    count++;
    if (count === 6) {
      clearInterval(interval);
      node.alpha = originalAlpha;
    }
  }, 100);
}
function hasDefaults(node) {
  return (node == null ? void 0 : node.__devtoolLayoutDefaults) !== void 0;
}
function isDirty(node) {
  var _a;
  return hasDefaults(node) && JSON.stringify(((_a = node.layout) == null ? void 0 : _a.style) ?? {}) !== JSON.stringify(node.__devtoolLayoutDefaults);
}
const treePlugin = {
  extension: {
    name: "layout-scene-tree",
    type: "sceneTree"
  },
  onButtonPress(container, buttonAction) {
    if (buttonAction === "flash") {
      flashNode(container);
    } else if (buttonAction === "reset") {
      if (hasDefaults(container)) {
        container.layout = { ...container.__devtoolLayoutDefaults };
        container.__devtoolLayoutDefaults = void 0;
      }
    }
  },
  updateNodeMetadata(node, metadata) {
    metadata.buttons.push({
      name: "flash",
      icon: "⚡",
      type: "button"
    });
    if (!(node == null ? void 0 : node.layout)) {
      return metadata;
    }
    metadata.buttons.push({
      name: "reset",
      icon: "↺",
      type: "button"
    });
    const icon = "⬥";
    const dirty = isDirty(node) ? "*" : "";
    metadata.suffix = `${dirty} ${icon}`;
    return metadata;
  },
  onSelected(container) {
    var _a;
    if (!hasDefaults(container)) {
      container.__devtoolLayoutDefaults = { ...(_a = container.layout) == null ? void 0 : _a.style };
    }
  }
};
export {
  hasDefaults,
  treePlugin
};
//# sourceMappingURL=treePlugin.mjs.map
