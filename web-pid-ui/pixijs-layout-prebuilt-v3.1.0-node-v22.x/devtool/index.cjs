"use strict";
var _a;
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const overlayPlugin = require("./overlayPlugin.cjs");
const propertiesPlugin = require("./propertiesPlugin.cjs");
const treePlugin = require("./treePlugin.cjs");
const gThis = globalThis;
gThis.__PIXI_DEVTOOLS__ = {
  ...gThis.__PIXI_DEVTOOLS__,
  extensions: [...((_a = gThis.__PIXI_DEVTOOLS__) == null ? void 0 : _a.extensions) ?? [], overlayPlugin.overlayPlugin, propertiesPlugin.propertiesPlugin, treePlugin.treePlugin]
};
exports.overlayPlugin = overlayPlugin.overlayPlugin;
exports.propertiesPlugin = propertiesPlugin.propertiesPlugin;
exports.hasDefaults = treePlugin.hasDefaults;
exports.treePlugin = treePlugin.treePlugin;
//# sourceMappingURL=index.cjs.map
