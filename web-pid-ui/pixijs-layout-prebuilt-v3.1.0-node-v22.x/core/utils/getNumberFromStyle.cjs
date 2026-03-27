"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
function getNumberFromStyle(value, size) {
  if (!value) return 0;
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string" && value.endsWith("%")) {
    size ?? (size = 1);
    return size * (parseFloat(value) / 100);
  } else if (!Number.isNaN(parseFloat(value))) {
    return parseFloat(value);
  }
  return 0;
}
function getTypeFromStyle(value) {
  if (typeof value === "number") return "number";
  if (value.endsWith("%")) return "percentage";
  if (Number.isNaN(parseInt(value, 10))) return "keyword";
  return "number";
}
exports.getNumberFromStyle = getNumberFromStyle;
exports.getTypeFromStyle = getTypeFromStyle;
//# sourceMappingURL=getNumberFromStyle.cjs.map
