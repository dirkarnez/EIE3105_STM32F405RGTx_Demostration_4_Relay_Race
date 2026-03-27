function calculateObjectFit(value, computedLayout, bounds) {
  let offsetScaleX = 1;
  let offsetScaleY = 1;
  switch (value) {
    case "fill":
      offsetScaleX = computedLayout.width / bounds.width;
      offsetScaleY = computedLayout.height / bounds.height;
      break;
    case "contain": {
      const scaleContain = Math.min(computedLayout.width / bounds.width, computedLayout.height / bounds.height);
      offsetScaleX = scaleContain;
      offsetScaleY = scaleContain;
      break;
    }
    case "cover": {
      const scaleCover = Math.max(computedLayout.width / bounds.width, computedLayout.height / bounds.height);
      offsetScaleX = scaleCover;
      offsetScaleY = scaleCover;
      break;
    }
    case "none":
      offsetScaleX = 1;
      offsetScaleY = 1;
      break;
    case "scale-down": {
      const scaleDown = Math.min(1, computedLayout.width / bounds.width, computedLayout.height / bounds.height);
      offsetScaleX = scaleDown;
      offsetScaleY = scaleDown;
      break;
    }
  }
  return {
    offsetScaleX,
    offsetScaleY
  };
}
export {
  calculateObjectFit
};
//# sourceMappingURL=calculateObjectFit.mjs.map
