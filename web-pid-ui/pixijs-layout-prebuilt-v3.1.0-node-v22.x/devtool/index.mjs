var _a;
import { overlayPlugin } from "./overlayPlugin.mjs";
import { propertiesPlugin } from "./propertiesPlugin.mjs";
import { treePlugin } from "./treePlugin.mjs";
import { hasDefaults } from "./treePlugin.mjs";
const gThis = globalThis;
gThis.__PIXI_DEVTOOLS__ = {
  ...gThis.__PIXI_DEVTOOLS__,
  extensions: [...((_a = gThis.__PIXI_DEVTOOLS__) == null ? void 0 : _a.extensions) ?? [], overlayPlugin, propertiesPlugin, treePlugin]
};
export {
  hasDefaults,
  overlayPlugin,
  propertiesPlugin,
  treePlugin
};
//# sourceMappingURL=index.mjs.map
