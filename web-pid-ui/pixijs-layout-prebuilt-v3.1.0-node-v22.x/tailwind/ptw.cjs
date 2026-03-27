"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
class TailwindParser {
  static convertSizeValue(value) {
    if (value === "full") return "100%";
    if (value === "screen") return "100vh";
    if (value === "px") return 1;
    if (value === "auto") return "auto";
    if (value === "1/2") return "50%";
    if (value === "1/3") return "33.333333%";
    if (value === "2/3") return "66.666667%";
    if (value === "1/4") return "25%";
    if (value === "2/4") return "50%";
    if (value === "3/4") return "75%";
    if (value === "1/5") return "20%";
    if (value === "2/5") return "40%";
    if (value === "3/5") return "60%";
    if (value === "4/5") return "80%";
    return Number(value) * this.BASE_UNIT;
  }
  static parseSize(key, value, styles) {
    const property = this.SIZE_MAP[key];
    const size = this.convertSizeValue(value);
    if (Array.isArray(property)) {
      property.forEach((prop) => styles[prop] = size);
    } else if (property) {
      styles[property] = size;
    }
  }
  static convertSpacingValue(value) {
    if (value === "px") return 1;
    return Number(value) * this.BASE_UNIT;
  }
  static parseSpacing(key, value, styles) {
    const property = this.SPACING_MAP[key];
    const spacing = this.convertSpacingValue(value);
    if (Array.isArray(property)) {
      property.forEach((prop) => styles[prop] = spacing);
    } else if (property) {
      styles[property] = spacing;
    }
  }
  static parse(classString) {
    const classes = classString.trim().split(" ");
    const styles = {};
    for (const cls of classes) {
      const [key, value] = cls.split("-");
      if (this.SPACING_MAP[key]) {
        this.parseSpacing(key, value, styles);
        continue;
      }
      if (this.SIZE_MAP[key]) {
        this.parseSize(key, value, styles);
        continue;
      }
      if (this.DISPLAY_MAP[cls]) {
        Object.assign(
          styles,
          this.DISPLAY_MAP[cls]
        );
        continue;
      }
      if (this.FLEX_MAP[cls]) {
        Object.assign(styles, this.FLEX_MAP[cls]);
        continue;
      }
    }
    return styles;
  }
}
__publicField(TailwindParser, "BASE_UNIT", 4);
__publicField(TailwindParser, "SPACING_MAP", {
  p: "padding",
  px: ["paddingLeft", "paddingRight"],
  py: ["paddingTop", "paddingBottom"],
  pt: "paddingTop",
  pr: "paddingRight",
  pb: "paddingBottom",
  pl: "paddingLeft",
  m: "margin",
  mx: ["marginLeft", "marginRight"],
  my: ["marginTop", "marginBottom"],
  mt: "marginTop",
  mr: "marginRight",
  mb: "marginBottom",
  ml: "marginLeft",
  gap: "gap",
  "gap-x": "columnGap",
  "gap-y": "rowGap"
});
__publicField(TailwindParser, "DISPLAY_MAP", {
  // flex: { display: 'flex' },
  // block: { display: 'block' },
  // hidden: { display: 'none' },
});
__publicField(TailwindParser, "FLEX_MAP", {
  "flex-row": { flexDirection: "row" },
  "flex-col": { flexDirection: "column" },
  "flex-row-reverse": { flexDirection: "row-reverse" },
  "flex-col-reverse": { flexDirection: "column-reverse" },
  "flex-wrap": { flexWrap: "wrap" },
  "flex-wrap-reverse": { flexWrap: "wrap-reverse" },
  "flex-nowrap": { flexWrap: "nowrap" },
  "grow-0": { flexGrow: 0 },
  grow: { flexGrow: 1 },
  "shrink-0": { flexShrink: 0 },
  shrink: { flexShrink: 1 },
  "justify-start": { justifyContent: "flex-start" },
  "justify-center": { justifyContent: "center" },
  "justify-end": { justifyContent: "flex-end" },
  "justify-between": { justifyContent: "space-between" },
  "justify-around": { justifyContent: "space-around" },
  "justify-evenly": { justifyContent: "space-evenly" },
  "items-start": { alignItems: "flex-start" },
  "items-center": { alignItems: "center" },
  "items-end": { alignItems: "flex-end" },
  "items-baseline": { alignItems: "baseline" },
  "items-stretch": { alignItems: "stretch" },
  "content-start": { alignContent: "flex-start" },
  "content-center": { alignContent: "center" },
  "content-end": { alignContent: "flex-end" },
  "content-between": { alignContent: "space-between" },
  "content-around": { alignContent: "space-around" },
  "content-evenly": { alignContent: "space-evenly" },
  "content-stretch": { alignContent: "stretch" },
  "self-start": { alignSelf: "flex-start" },
  "self-center": { alignSelf: "center" },
  "self-end": { alignSelf: "flex-end" },
  "self-stretch": { alignSelf: "stretch" },
  "self-baseline": { alignSelf: "baseline" }
});
__publicField(TailwindParser, "SIZE_MAP", {
  w: "width",
  h: "height",
  size: ["width", "height"],
  "min-w": "minWidth",
  "min-h": "minHeight",
  "max-w": "maxWidth",
  "max-h": "maxHeight"
});
function tw(template, ...templateElements) {
  const res = template.reduce((sum, n, index) => {
    const templateElement = templateElements[index];
    if (typeof templateElement === "string") {
      return `${sum}${n}${templateElement}`;
    }
    return `${sum}${n}`;
  }, "").trim().replace(/\s{2,}/g, " ");
  return TailwindParser.parse(res);
}
exports.tw = tw;
//# sourceMappingURL=ptw.cjs.map
