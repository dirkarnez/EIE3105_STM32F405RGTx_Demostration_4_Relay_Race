import { ViewContainer } from "pixi.js";
import { Layout } from "../Layout.mjs";
import { getPixiSize } from "../utils/getPixiSize.mjs";
function formatStyles(layout, style) {
  const currentStyles = layout._styles;
  let customStyles = { ...currentStyles.custom, ...style };
  const defaultStyle = {
    ...Layout.defaultStyle.shared,
    ...layout.target instanceof ViewContainer || customStyles.isLeaf || Layout.defaultStyle.shared.isLeaf ? Layout.defaultStyle.leaf : Layout.defaultStyle.container
  };
  customStyles = { ...defaultStyle, ...customStyles };
  const yogaStyles = { ...customStyles };
  const widthIntrinsic = customStyles.width === "intrinsic";
  const heightIntrinsic = customStyles.height === "intrinsic";
  if (widthIntrinsic || heightIntrinsic) {
    const { width, height } = getPixiSize(layout);
    if (widthIntrinsic) {
      yogaStyles.width = width;
    }
    if (heightIntrinsic) {
      yogaStyles.height = height;
    }
  }
  return { custom: customStyles, yoga: yogaStyles };
}
export {
  formatStyles
};
//# sourceMappingURL=formatStyles.mjs.map
