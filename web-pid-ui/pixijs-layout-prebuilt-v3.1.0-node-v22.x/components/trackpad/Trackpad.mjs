var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Rectangle, Point } from "pixi.js";
import { SlidingNumber } from "./SlidingNumber.mjs";
class Trackpad {
  constructor(options) {
    /** Manages scrolling behavior for the x-axis */
    __publicField(this, "xAxis");
    /** Manages scrolling behavior for the y-axis */
    __publicField(this, "yAxis");
    __publicField(this, "_isDown");
    __publicField(this, "_globalPosition");
    __publicField(this, "_frame");
    __publicField(this, "_bounds");
    __publicField(this, "_dirty");
    __publicField(this, "disableEasing", false);
    this.xAxis = new SlidingNumber({
      ease: options.xEase,
      maxSpeed: options.maxSpeed,
      constrain: options.constrain,
      constrainPercent: options.xConstrainPercent
    });
    this.yAxis = new SlidingNumber({
      ease: options.yEase,
      maxSpeed: options.maxSpeed,
      constrain: options.constrain,
      constrainPercent: options.yConstrainPercent
    });
    this.disableEasing = options.disableEasing ?? false;
    this._frame = new Rectangle();
    this._bounds = new Rectangle();
    this._globalPosition = new Point();
  }
  /**
   * Handles pointer down events to start tracking
   * @param pos Global position of the pointer
   */
  pointerDown(pos) {
    this._globalPosition = pos;
    this.xAxis.grab(pos.x);
    this.yAxis.grab(pos.y);
    this._isDown = true;
  }
  /**
   * Handles pointer up events to end tracking
   */
  pointerUp() {
    this._isDown = false;
  }
  /**
   * Handles pointer move events to update tracking
   * @param pos Global position of the pointer
   */
  pointerMove(pos) {
    this._globalPosition = pos;
  }
  /**
   * Updates the trackpad position and momentum.
   * Should be called each frame to maintain smooth scrolling.
   */
  update() {
    if (this._dirty) {
      this._dirty = false;
      this.xAxis.min = this._bounds.left;
      this.xAxis.min = this._bounds.right - this._frame.width;
      this.xAxis.min = this._bounds.top;
      this.xAxis.min = this._bounds.bottom - this._frame.height;
    }
    if (this._isDown) {
      this.xAxis.hold(this._globalPosition.x);
      this.yAxis.hold(this._globalPosition.y);
    } else {
      this.xAxis.slide(this.disableEasing);
      this.yAxis.slide(this.disableEasing);
    }
  }
  /**
   * Sets the size of the visible frame/viewport
   * @param w Width of the frame in pixels
   * @param h Height of the frame in pixels
   */
  resize(w, h) {
    this._frame.x = 0;
    this._frame.width = w;
    this._frame.y = 0;
    this._frame.height = h;
    this._dirty = true;
  }
  /**
   * Sets the bounds for content scrolling
   * @param minX Minimum x coordinate (left)
   * @param maxX Maximum x coordinate (right)
   * @param minY Minimum y coordinate (top)
   * @param maxY Maximum y coordinate (bottom)
   */
  setBounds(minX, maxX, minY, maxY) {
    this._bounds.x = minX;
    this._bounds.width = maxX - minX;
    this._bounds.y = minY;
    this._bounds.height = maxY - minY;
    this._dirty = true;
  }
  /**
   * Gets or sets the current x position of the trackpad.
   * This is a shorthand for accessing the xAxis value.
   */
  get x() {
    return this.xAxis.value;
  }
  set x(value) {
    this.xAxis.value = value;
  }
  /**
   * Gets or sets the current y position of the trackpad.
   * This is a shorthand for accessing the yAxis value.
   */
  get y() {
    return this.yAxis.value;
  }
  set y(value) {
    this.yAxis.value = value;
  }
}
export {
  Trackpad
};
//# sourceMappingURL=Trackpad.mjs.map
