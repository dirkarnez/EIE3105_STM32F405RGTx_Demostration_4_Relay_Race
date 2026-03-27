"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const calculateWithDoubleValue = require("./position/calculateWithDoubleValue.cjs");
const calculateWithQuadValue = require("./position/calculateWithQuadValue.cjs");
const calculateWithSingleValue = require("./position/calculateWithSingleValue.cjs");
function calculatePositionSpecifier(value, computedLayout, visualBounds) {
  if (!value) return { x: 0, y: 0 };
  const tokens = typeof value === "string" ? value.split(" ") : [value];
  switch (tokens.length) {
    case 1:
      return calculateWithSingleValue.calculateWithSingleValue(tokens, computedLayout, visualBounds);
    case 2:
      return calculateWithDoubleValue.calculateWithDoubleValue(tokens, computedLayout, visualBounds);
    case 4:
      return calculateWithQuadValue.calculateWithQuadValue(tokens, computedLayout, visualBounds);
    default:
      throw new Error("Invalid objectPosition value: must have 1, 2, or 4 values");
  }
}
exports.calculatePositionSpecifier = calculatePositionSpecifier;
//# sourceMappingURL=calculatePositionSpecifier.cjs.map
