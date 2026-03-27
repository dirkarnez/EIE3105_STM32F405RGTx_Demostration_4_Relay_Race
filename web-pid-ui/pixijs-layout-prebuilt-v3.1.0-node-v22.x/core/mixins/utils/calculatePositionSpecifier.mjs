import { calculateWithDoubleValue } from "./position/calculateWithDoubleValue.mjs";
import { calculateWithQuadValue } from "./position/calculateWithQuadValue.mjs";
import { calculateWithSingleValue } from "./position/calculateWithSingleValue.mjs";
function calculatePositionSpecifier(value, computedLayout, visualBounds) {
  if (!value) return { x: 0, y: 0 };
  const tokens = typeof value === "string" ? value.split(" ") : [value];
  switch (tokens.length) {
    case 1:
      return calculateWithSingleValue(tokens, computedLayout, visualBounds);
    case 2:
      return calculateWithDoubleValue(tokens, computedLayout, visualBounds);
    case 4:
      return calculateWithQuadValue(tokens, computedLayout, visualBounds);
    default:
      throw new Error("Invalid objectPosition value: must have 1, 2, or 4 values");
  }
}
export {
  calculatePositionSpecifier
};
//# sourceMappingURL=calculatePositionSpecifier.mjs.map
