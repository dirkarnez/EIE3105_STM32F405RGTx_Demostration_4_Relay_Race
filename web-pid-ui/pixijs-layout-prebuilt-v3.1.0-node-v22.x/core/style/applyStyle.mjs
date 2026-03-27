import { Align, BoxSizing, Direction, Display, FlexDirection, Wrap, Justify, Overflow, PositionType, Edge, Gutter } from "yoga-layout/load";
const ALIGN_CONTENT_MAP = {
  "flex-start": Align.FlexStart,
  "flex-end": Align.FlexEnd,
  center: Align.Center,
  stretch: Align.Stretch,
  "space-between": Align.SpaceBetween,
  "space-around": Align.SpaceAround,
  "space-evenly": Align.SpaceEvenly
};
const ALIGN_ITEMS_MAP = {
  "flex-start": Align.FlexStart,
  "flex-end": Align.FlexEnd,
  center: Align.Center,
  stretch: Align.Stretch,
  baseline: Align.Baseline
};
const BOX_SIZING_MAP = {
  "border-box": BoxSizing.BorderBox,
  "content-box": BoxSizing.ContentBox
};
const DIRECTION_MAP = {
  ltr: Direction.LTR,
  rtl: Direction.RTL
};
const DISPLAY_MAP = {
  none: Display.None,
  flex: Display.Flex,
  contents: Display.Contents
};
const FLEX_DIRECTION_MAP = {
  row: FlexDirection.Row,
  column: FlexDirection.Column,
  "row-reverse": FlexDirection.RowReverse,
  "column-reverse": FlexDirection.ColumnReverse
};
const FLEX_WRAP_MAP = {
  wrap: Wrap.Wrap,
  nowrap: Wrap.NoWrap,
  "wrap-reverse": Wrap.WrapReverse
};
const JUSTIFY_CONTENT_MAP = {
  "flex-start": Justify.FlexStart,
  "flex-end": Justify.FlexEnd,
  center: Justify.Center,
  "space-between": Justify.SpaceBetween,
  "space-around": Justify.SpaceAround,
  "space-evenly": Justify.SpaceEvenly
};
const OVERFLOW_MAP = {
  visible: Overflow.Visible,
  hidden: Overflow.Hidden,
  scroll: Overflow.Scroll
};
const POSITION_MAP = {
  absolute: PositionType.Absolute,
  relative: PositionType.Relative,
  static: PositionType.Static
};
const styleSetters = {
  alignContent: (node, value) => node.setAlignContent(alignContent(value)),
  alignItems: (node, value) => node.setAlignItems(alignItems(value)),
  alignSelf: (node, value) => node.setAlignSelf(alignItems(value)),
  aspectRatio: (node, value) => node.setAspectRatio(value),
  borderBottomWidth: (node, value) => node.setBorder(Edge.Bottom, value),
  borderEndWidth: (node, value) => node.setBorder(Edge.End, value),
  borderLeftWidth: (node, value) => node.setBorder(Edge.Left, value),
  borderRightWidth: (node, value) => node.setBorder(Edge.Right, value),
  borderStartWidth: (node, value) => node.setBorder(Edge.Start, value),
  borderTopWidth: (node, value) => node.setBorder(Edge.Top, value),
  borderWidth: (node, value) => node.setBorder(Edge.All, value),
  borderInlineWidth: (node, value) => node.setBorder(Edge.Horizontal, value),
  borderBlockWidth: (node, value) => node.setBorder(Edge.Vertical, value),
  bottom: (node, value) => node.setPosition(Edge.Bottom, value),
  boxSizing: (node, value) => node.setBoxSizing(boxSizing(value)),
  direction: (node, value) => node.setDirection(direction(value)),
  display: (node, value) => node.setDisplay(display(value)),
  end: (node, value) => node.setPosition(Edge.End, value),
  flex: (node, value) => node.setFlex(value),
  flexBasis: (node, value) => node.setFlexBasis(value),
  flexDirection: (node, value) => node.setFlexDirection(flexDirection(value)),
  rowGap: (node, value) => node.setGap(Gutter.Row, value),
  gap: (node, value) => node.setGap(Gutter.All, value),
  columnGap: (node, value) => node.setGap(Gutter.Column, value),
  flexGrow: (node, value) => node.setFlexGrow(value),
  flexShrink: (node, value) => node.setFlexShrink(value),
  flexWrap: (node, value) => node.setFlexWrap(flexWrap(value)),
  height: (node, value) => node.setHeight(value),
  justifyContent: (node, value) => node.setJustifyContent(justifyContent(value)),
  left: (node, value) => node.setPosition(Edge.Left, value),
  margin: (node, value) => node.setMargin(Edge.All, value),
  marginBottom: (node, value) => node.setMargin(Edge.Bottom, value),
  marginEnd: (node, value) => node.setMargin(Edge.End, value),
  marginLeft: (node, value) => node.setMargin(Edge.Left, value),
  marginRight: (node, value) => node.setMargin(Edge.Right, value),
  marginStart: (node, value) => node.setMargin(Edge.Start, value),
  marginTop: (node, value) => node.setMargin(Edge.Top, value),
  marginInline: (node, value) => node.setMargin(Edge.Horizontal, value),
  marginBlock: (node, value) => node.setMargin(Edge.Vertical, value),
  maxHeight: (node, value) => node.setMaxHeight(value),
  maxWidth: (node, value) => node.setMaxWidth(value),
  minHeight: (node, value) => node.setMinHeight(value),
  minWidth: (node, value) => node.setMinWidth(value),
  overflow: (node, value) => node.setOverflow(overflow(value)),
  padding: (node, value) => node.setPadding(Edge.All, value),
  paddingBottom: (node, value) => node.setPadding(Edge.Bottom, value),
  paddingEnd: (node, value) => node.setPadding(Edge.End, value),
  paddingLeft: (node, value) => node.setPadding(Edge.Left, value),
  paddingRight: (node, value) => node.setPadding(Edge.Right, value),
  paddingStart: (node, value) => node.setPadding(Edge.Start, value),
  paddingTop: (node, value) => node.setPadding(Edge.Top, value),
  paddingInline: (node, value) => node.setPadding(Edge.Horizontal, value),
  paddingBlock: (node, value) => node.setPadding(Edge.Vertical, value),
  position: (node, value) => node.setPositionType(position(value)),
  right: (node, value) => node.setPosition(Edge.Right, value),
  start: (node, value) => node.setPosition(Edge.Start, value),
  top: (node, value) => node.setPosition(Edge.Top, value),
  insetInline: (node, value) => node.setPosition(Edge.Horizontal, value),
  insetBlock: (node, value) => node.setPosition(Edge.Vertical, value),
  inset: (node, value) => node.setPosition(Edge.All, value),
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
export {
  applyStyle
};
//# sourceMappingURL=applyStyle.mjs.map
