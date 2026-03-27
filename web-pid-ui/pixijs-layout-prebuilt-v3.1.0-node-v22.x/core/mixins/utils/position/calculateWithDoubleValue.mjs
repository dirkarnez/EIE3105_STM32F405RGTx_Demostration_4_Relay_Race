import { getTypeFromStyle, getNumberFromStyle } from "../../../utils/getNumberFromStyle.mjs";
function calculateCenterPosition(dimension, computedLayout, visualBounds) {
  return (computedLayout[dimension] - visualBounds[dimension]) / 2;
}
function calculateNonKeywordPosition(value, valueType, dimension, computedLayout, visualBounds) {
  const multiple = valueType === "percentage" ? computedLayout[dimension] - visualBounds[dimension] : 1;
  return getNumberFromStyle(value) * multiple;
}
function calculateWithDoubleValue(tokens, computedLayout, visualBounds) {
  const [first, second] = tokens;
  const firstType = getTypeFromStyle(first);
  const secondType = getTypeFromStyle(second);
  const result = { x: void 0, y: void 0 };
  switch (first) {
    case "top":
      result.y = 0;
      break;
    case "bottom":
      result.y = computedLayout.height - visualBounds.height;
      break;
    case "center":
      if (second === "left" || second === "right") {
        result.y = calculateCenterPosition("height", computedLayout, visualBounds);
      } else {
        result.x = calculateCenterPosition("width", computedLayout, visualBounds);
      }
      break;
    case "left":
      result.x = 0;
      break;
    case "right":
      result.x = computedLayout.width - visualBounds.width;
      break;
    default: {
      const dimension = second === "top" || second === "bottom" || secondType !== "keyword" ? "width" : "height";
      const target = dimension === "width" ? "x" : "y";
      result[target] = calculateNonKeywordPosition(first, firstType, dimension, computedLayout, visualBounds);
    }
  }
  switch (second) {
    case "top":
      result.y = 0;
      break;
    case "bottom":
      result.y = computedLayout.height - visualBounds.height;
      break;
    case "center":
      if (result.y === void 0) {
        result.y = calculateCenterPosition("height", computedLayout, visualBounds);
      } else {
        result.x = calculateCenterPosition("width", computedLayout, visualBounds);
      }
      break;
    case "left":
      result.x = 0;
      break;
    case "right":
      result.x = computedLayout.width - visualBounds.width;
      break;
    default: {
      const target = result.y === void 0 ? "y" : "x";
      const dimension = target === "y" ? "height" : "width";
      result[target] = calculateNonKeywordPosition(second, secondType, dimension, computedLayout, visualBounds);
    }
  }
  return result;
}
export {
  calculateWithDoubleValue
};
//# sourceMappingURL=calculateWithDoubleValue.mjs.map
