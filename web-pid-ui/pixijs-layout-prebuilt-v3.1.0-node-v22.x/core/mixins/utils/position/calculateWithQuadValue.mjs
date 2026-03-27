import { getTypeFromStyle, getNumberFromStyle } from "../../../utils/getNumberFromStyle.mjs";
import { calculateWithDoubleValue } from "./calculateWithDoubleValue.mjs";
function calculateAxisOffset(keyword, value, type, bounds) {
  const isNegativeOffset = keyword === "right" || keyword === "bottom";
  const offset = type === "percentage" ? value * bounds : value;
  return isNegativeOffset ? -offset : offset;
}
function calculateWithQuadValue(tokens, computedLayout, visualBounds) {
  const [first, second, third, fourth] = tokens;
  const firstType = getTypeFromStyle(first);
  const secondType = getTypeFromStyle(second);
  const thirdType = getTypeFromStyle(third);
  const fourthType = getTypeFromStyle(fourth);
  if (secondType === "keyword" || fourthType === "keyword") {
    throw new Error("Invalid objectPosition value: second and fourth values must be numbers or percentages");
  }
  if (firstType !== "keyword" || thirdType !== "keyword") {
    throw new Error("Invalid objectPosition value: first and third values must be keywords");
  }
  const basePosition = calculateWithDoubleValue([first, third], computedLayout, visualBounds);
  const result = { ...basePosition };
  const secondValue = getNumberFromStyle(second);
  const fourthValue = getNumberFromStyle(fourth);
  if (first === "left" || first === "right") {
    result.x = basePosition.x + calculateAxisOffset(first, secondValue, secondType, visualBounds.width);
  } else if (first === "top" || first === "bottom") {
    result.y = basePosition.y + calculateAxisOffset(first, secondValue, secondType, visualBounds.height);
  }
  if (third === "left" || third === "right") {
    result.x = basePosition.x + calculateAxisOffset(third, fourthValue, fourthType, visualBounds.width);
  } else if (third === "top" || third === "bottom") {
    result.y = basePosition.y + calculateAxisOffset(third, fourthValue, fourthType, visualBounds.height);
  }
  return result;
}
export {
  calculateWithQuadValue
};
//# sourceMappingURL=calculateWithQuadValue.mjs.map
