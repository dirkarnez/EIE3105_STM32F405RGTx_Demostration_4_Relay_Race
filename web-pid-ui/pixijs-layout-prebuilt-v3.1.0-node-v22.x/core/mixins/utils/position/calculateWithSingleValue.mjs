import { getTypeFromStyle, getNumberFromStyle } from "../../../utils/getNumberFromStyle.mjs";
function calculateWithSingleValue(tokens, computedLayout, visualBounds) {
  const keyword = tokens[0];
  const result = { x: void 0, y: void 0 };
  switch (keyword) {
    case "top":
      result.y = 0;
      result.x = (computedLayout.width - visualBounds.width) / 2;
      break;
    case "bottom":
      result.y = computedLayout.height - visualBounds.height;
      result.x = (computedLayout.width - visualBounds.width) / 2;
      break;
    case "left":
      result.x = 0;
      result.y = (computedLayout.height - visualBounds.height) / 2;
      break;
    case "right":
      result.x = computedLayout.width - visualBounds.width;
      result.y = (computedLayout.height - visualBounds.height) / 2;
      break;
    case "center":
      result.x = (computedLayout.width - visualBounds.width) / 2;
      result.y = (computedLayout.height - visualBounds.height) / 2;
      break;
    default: {
      const isPercentage = getTypeFromStyle(keyword) === "percentage";
      const multiple = isPercentage ? computedLayout.width - visualBounds.width : 1;
      result.x = getNumberFromStyle(keyword) * multiple;
      result.y = (computedLayout.height - visualBounds.height) / 2;
    }
  }
  return result;
}
export {
  calculateWithSingleValue
};
//# sourceMappingURL=calculateWithSingleValue.mjs.map
