var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Spring } from "./Spring.mjs";
class ScrollSpring {
  constructor(springOptions = {}) {
    /** Whether the spring animation has completed */
    __publicField(this, "done");
    /** Target value the spring is animating towards */
    __publicField(this, "to");
    /** Underlying spring physics implementation */
    __publicField(this, "_spring");
    /** Current position of the spring */
    __publicField(this, "_pos");
    /** Current speed of the movement */
    __publicField(this, "_speed");
    /** Whether speed needs correction due to direction change */
    __publicField(this, "_correctSpeed");
    this._spring = new Spring(springOptions);
    this._pos = 0;
    this.to = 0;
  }
  /**
   * Initializes a new spring animation
   * @param speed Initial velocity of the movement
   * @param pos Starting position
   * @param to Target position to animate towards
   */
  start(speed, pos, to) {
    this._speed = speed;
    this._pos = pos;
    this.to = to;
    this.done = false;
    this._spring.x = this._pos;
    this._spring.tx = this.to;
    const diff = this.to - this._pos;
    const toDirection = Math.abs(diff) / diff;
    const currentDirection = Math.abs(this._speed) / this._speed;
    if (toDirection !== currentDirection) {
      this._correctSpeed = true;
    } else {
      this._correctSpeed = false;
    }
  }
  /**
   * Updates the spring animation state
   * @returns The new position after the spring calculation
   */
  update() {
    if (this._correctSpeed) {
      this._speed *= 0.6;
      if (Math.abs(this._speed) < 2) {
        this._correctSpeed = false;
      }
      this._pos += this._speed;
      this._spring.x = this._pos;
    } else {
      const diff = this.to - this._pos;
      if (Math.abs(diff) < 0.05) {
        this._pos = this.to;
        this.done = true;
      } else {
        this._spring.tx = this.to;
        this._spring.update();
        this._pos = this._spring.x;
      }
    }
    return this._pos;
  }
}
export {
  ScrollSpring
};
//# sourceMappingURL=ScrollSpring.mjs.map
