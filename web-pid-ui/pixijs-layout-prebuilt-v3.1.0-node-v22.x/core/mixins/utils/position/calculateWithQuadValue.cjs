"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const getNumberFromStyle = require("../../../utils/getNumberFromStyle.cjs");
const calculateWithDoubleValue = require("./calculateWithDoubleValue.cjs");
function calculateAxisOffset(keyword, value, type, bounds) {
  const isNegativeOffset = keyword === "right" || keyword === "bottom";
  const offset = type === "percentage" ? value * bounds : value;
  return isNegativeOffset ? -offset : offset;
}
function calculateWithQuadValue(tokens, computedLayout, visualBounds) {
  const [first, second, third, fourth] = tokens;
  const firstType = getNumberFromStyle.getTypeFromStyle(first);
  const secondType = getNumberFromStyle.getTypeFromStyle(second);
  const thirdType = getNumberFromStyle.getTypeFromStyle(third);
  const fourthType = getNumberFromStyle.getTypeFromStyle(fourth);
  if (secondType === "keyword" || fourthType === "keyword") {
    throw new Error("Invalid objectPosition value: second and fourth values must be numbers or percentages");
  }
  if (firstType !== "keyword" || thirdType !== "keyword") {
    throw new Error("Invalid objectPosition value: first and third values must be keywords");
  }
  const basePosition = calculateWithDoubleValue.calculateWithDoubleValue([first, third], computedLayout, visualBounds);
  const result = { ...basePosition };
  const secondValue = getNumberFromStyle.getNumberFromStyle(second);
  const fourthValue = getNumberFromStyle.getNumberFromStyle(fourth);
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
exports.calculateWithQuadValue = calculateWithQuadValue;
//# sourceMappingURL=calculateWithQuadValue.cjs.map
