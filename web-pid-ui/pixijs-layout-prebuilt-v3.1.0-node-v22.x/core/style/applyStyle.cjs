"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const load = require("yoga-layout/load");
const ALIGN_CONTENT_MAP = {
  "flex-start": load.Align.FlexStart,
  "flex-end": load.Align.FlexEnd,
  center: load.Align.Center,
  stretch: load.Align.Stretch,
  "space-between": load.Align.SpaceBetween,
  "space-around": load.Align.SpaceAround,
  "space-evenly": load.Align.SpaceEvenly
};
const ALIGN_ITEMS_MAP = {
  "flex-start": load.Align.FlexStart,
  "flex-end": load.Align.FlexEnd,
  center: load.Align.Center,
  stretch: load.Align.Stretch,
  baseline: load.Align.Baseline
};
const BOX_SIZING_MAP = {
  "border-box": load.BoxSizing.BorderBox,
  "content-box": load.BoxSizing.ContentBox
};
const DIRECTION_MAP = {
  ltr: load.Direction.LTR,
  rtl: load.Direction.RTL
};
const DISPLAY_MAP = {
  none: load.Display.None,
  flex: load.Display.Flex,
  contents: load.Display.Contents
};
const FLEX_DIRECTION_MAP = {
  row: load.FlexDirection.Row,
  column: load.FlexDirection.Column,
  "row-reverse": load.FlexDirection.RowReverse,
  "column-reverse": load.FlexDirection.ColumnReverse
};
const FLEX_WRAP_MAP = {
  wrap: load.Wrap.Wrap,
  nowrap: load.Wrap.NoWrap,
  "wrap-reverse": load.Wrap.WrapReverse
};
const JUSTIFY_CONTENT_MAP = {
  "flex-start": load.Justify.FlexStart,
  "flex-end": load.Justify.FlexEnd,
  center: load.Justify.Center,
  "space-between": load.Justify.SpaceBetween,
  "space-around": load.Justify.SpaceAround,
  "space-evenly": load.Justify.SpaceEvenly
};
const OVERFLOW_MAP = {
  visible: load.Overflow.Visible,
  hidden: load.Overflow.Hidden,
  scroll: load.Overflow.Scroll
};
const POSITION_MAP = {
  absolute: load.PositionType.Absolute,
  relative: load.PositionType.Relative,
  static: load.PositionType.Static
};
const styleSetters = {
  alignContent: (node, value) => node.setAlignContent(alignContent(value)),
  alignItems: (node, value) => node.setAlignItems(alignItems(value)),
  alignSelf: (node, value) => node.setAlignSelf(alignItems(value)),
  aspectRatio: (node, value) => node.setAspectRatio(value),
  borderBottomWidth: (node, value) => node.setBorder(load.Edge.Bottom, value),
  borderEndWidth: (node, value) => node.setBorder(load.Edge.End, value),
  borderLeftWidth: (node, value) => node.setBorder(load.Edge.Left, value),
  borderRightWidth: (node, value) => node.setBorder(load.Edge.Right, value),
  borderStartWidth: (node, value) => node.setBorder(load.Edge.Start, value),
  borderTopWidth: (node, value) => node.setBorder(load.Edge.Top, value),
  borderWidth: (node, value) => node.setBorder(load.Edge.All, value),
  borderInlineWidth: (node, value) => node.setBorder(load.Edge.Horizontal, value),
  borderBlockWidth: (node, value) => node.setBorder(load.Edge.Vertical, value),
  bottom: (node, value) => node.setPosition(load.Edge.Bottom, value),
  boxSizing: (node, value) => node.setBoxSizing(boxSizing(value)),
  direction: (node, value) => node.setDirection(direction(value)),
  display: (node, value) => node.setDisplay(display(value)),
  end: (node, value) => node.setPosition(load.Edge.End, value),
  flex: (node, value) => node.setFlex(value),
  flexBasis: (node, value) => node.setFlexBasis(value),
  flexDirection: (node, value) => node.setFlexDirection(flexDirection(value)),
  rowGap: (node, value) => node.setGap(load.Gutter.Row, value),
  gap: (node, value) => node.setGap(load.Gutter.All, value),
  columnGap: (node, value) => node.setGap(load.Gutter.Column, value),
  flexGrow: (node, value) => node.setFlexGrow(value),
  flexShrink: (node, value) => node.setFlexShrink(value),
  flexWrap: (node, value) => node.setFlexWrap(flexWrap(value)),
  height: (node, value) => node.setHeight(value),
  justifyContent: (node, value) => node.setJustifyContent(justifyContent(value)),
  left: (node, value) => node.setPosition(load.Edge.Left, value),
  margin: (node, value) => node.setMargin(load.Edge.All, value),
  marginBottom: (node, value) => node.setMargin(load.Edge.Bottom, value),
  marginEnd: (node, value) => node.setMargin(load.Edge.End, value),
  marginLeft: (node, value) => node.setMargin(load.Edge.Left, value),
  marginRight: (node, value) => node.setMargin(load.Edge.Right, value),
  marginStart: (node, value) => node.setMargin(load.Edge.Start, value),
  marginTop: (node, value) => node.setMargin(load.Edge.Top, value),
  marginInline: (node, value) => node.setMargin(load.Edge.Horizontal, value),
  marginBlock: (node, value) => node.setMargin(load.Edge.Vertical, value),
  maxHeight: (node, value) => node.setMaxHeight(value),
  maxWidth: (node, value) => node.setMaxWidth(value),
  minHeight: (node, value) => node.setMinHeight(value),
  minWidth: (node, value) => node.setMinWidth(value),
  overflow: (node, value) => node.setOverflow(overflow(value)),
  padding: (node, value) => node.setPadding(load.Edge.All, value),
  paddingBottom: (node, value) => node.setPadding(load.Edge.Bottom, value),
  paddingEnd: (node, value) => node.setPadding(load.Edge.End, value),
  paddingLeft: (node, value) => node.setPadding(load.Edge.Left, value),
  paddingRight: (node, value) => node.setPadding(load.Edge.Right, value),
  paddingStart: (node, value) => node.setPadding(load.Edge.Start, value),
  paddingTop: (node, value) => node.setPadding(load.Edge.Top, value),
  paddingInline: (node, value) => node.setPadding(load.Edge.Horizontal, value),
  paddingBlock: (node, value) => node.setPadding(load.Edge.Vertical, value),
  position: (node, value) => node.setPositionType(position(value)),
  right: (node, value) => node.setPosition(load.Edge.Right, value),
  start: (node, value) => node.setPosition(load.Edge.Start, value),
  top: (node, value) => node.setPosition(load.Edge.Top, value),
  insetInline: (node, value) => node.setPosition(load.Edge.Horizontal, value),
  insetBlock: (node, value) => node.setPosition(load.Edge.Vertical, value),
  inset: (node, value) => node.setPosition(load.Edge.All, value),
  width: (node, value) => node.setWidth(value)
};
function alignContent(str) {
  if (str in ALIGN_CONTENT_MAP) return ALIGN_CONTENT_MAP[str];
  throw new Error(`"${str}" is not a valid value for alignContent`);
}
function alignItems(str) {
  if (str in ALIGN_ITEMS_MAP) return ALIGN_ITEMS_MAP[str];
  throw new Error(`"${str}" is not a valid value for alignItems`);
}
function boxSizing(str) {
  if (str in BOX_SIZING_MAP) return BOX_SIZING_MAP[str];
  throw new Error(`"${str}" is not a valid value for boxSizing`);
}
function direction(str) {
  if (str in DIRECTION_MAP) return DIRECTION_MAP[str];
  throw new Error(`"${str}" is not a valid value for direction`);
}
function display(str) {
  if (str in DISPLAY_MAP) return DISPLAY_MAP[str];
  throw new Error(`"${str}" is not a valid value for display`);
}
function flexDirection(str) {
  if (str in FLEX_DIRECTION_MAP) return FLEX_DIRECTION_MAP[str];
  throw new Error(`"${str}" is not a valid value for flexDirection`);
}
function flexWrap(str) {
  if (str in FLEX_WRAP_MAP) return FLEX_WRAP_MAP[str];
  throw new Error(`"${str}" is not a valid value for flexWrap`);
}
function justifyContent(str) {
  if (str in JUSTIFY_CONTENT_MAP) return JUSTIFY_CONTENT_MAP[str];
  throw new Error(`"${str}" is not a valid value for justifyContent`);
}
function overflow(str) {
  if (str in OVERFLOW_MAP) return OVERFLOW_MAP[str];
  throw new Error(`"${str}" is not a valid value for overflow`);
}
function position(str) {
  if (str in POSITION_MAP) return POSITION_MAP[str];
  throw new Error(`"${str}" is not a valid value for position`);
}
function applyStyle(node, style = {}) {
  for (const [key, value] of Object.entries(style)) {
    try {
      const setter = styleSetters[key];
      if (setter) {
        setter(node, value);
      }
    } catch (_e) {
    }
  }
  if (style.width !== void 0) {
    const widthValue = style.left !== void 0 && style.right !== void 0 ? "auto" : style.width;
    node.setWidth(widthValue);
  }
  if (style.height !== void 0) {
    const heightValue = style.top !== void 0 && style.bottom !== void 0 ? "auto" : style.height;
    node.setHeight(heightValue);
  }
}
exports.applyStyle = applyStyle;
//# sourceMappingURL=applyStyle.cjs.map
