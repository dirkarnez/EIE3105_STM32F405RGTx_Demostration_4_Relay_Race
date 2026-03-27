var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { ScrollSpring } from "./ScrollSpring.mjs";
class SlidingNumber {
  constructor(options = {}) {
    __publicField(this, "position", 0);
    /** The maximum speed at which the sliding number can move. */
    __publicField(this, "maxSpeed");
    /** When dragging this number represents the percentage that will be allowed to move outside the min and max values. */
    __publicField(this, "constrainPercent");
    /** Whether the sliding number is constrained to the min and max values. */
    __publicField(this, "constrain");
    /** The minimum value the sliding number can take. */
    __publicField(this, "min", 0);
    /** The maximum value the sliding number can take. */
    __publicField(this, "max", 0);
    __publicField(this, "_ease");
    __publicField(this, "_offset", 0);
    __publicField(this, "_prev", 0);
    __publicField(this, "_speed", 0);
    __publicField(this, "_hasStopped", true);
    __publicField(this, "_targetSpeed", 0);
    __publicField(this, "_speedChecker", 0);
    __publicField(this, "_grab", 0);
    __publicField(this, "_activeEase", null);
    this.constrain = options.constrain ?? true;
    this.maxSpeed = options.maxSpeed ?? 400;
    this._ease = options.ease ?? new ScrollSpring();
    this.constrainPercent = options.constrainPercent ?? 0;
  }
  /**
   * Sets the position of the sliding number.
   * This will also reset the speed to 0.
   * @param n The new position value.
   */
  set value(n) {
    this._speed = 0;
    this.position = n;
  }
  /**
   * Gets the current position of the sliding number.
   * @returns The current position value.
   */
  get value() {
    return this.position;
  }
  /**
   * Initiates a grab/drag operation at the specified offset
   * @param offset The initial grab position
   */
  grab(offset) {
    this._grab = offset;
    this._offset = this.position - offset;
    this._speedChecker = 0;
    this._targetSpeed = this._speed = 0;
    this._hasStopped = false;
  }
  /**
   * Updates the position while being held/dragged
   * @param newPosition The new position from the input device
   */
  hold(newPosition) {
    this._speedChecker++;
    this.position = newPosition + this._offset;
    if (this._speedChecker > 1) {
      this._targetSpeed = this.position - this._prev;
    }
    this._speed += (this._targetSpeed - this._speed) / 2;
    if (this._speed > this.maxSpeed) this._speed = this.maxSpeed;
    else if (this._speed < -this.maxSpeed) this._speed = -this.maxSpeed;
    this._prev = this.position;
    if (this.constrain) {
      if (this.constrainPercent === 0) {
        if (this.position > this.min) {
          this.position = this.min;
        } else if (this.position < this.max) {
          this.position = this.max;
        }
      } else if (this.position > this.min) {
        this.position -= (this.position - this.min) / (1 + this.constrainPercent);
      } else if (this.position < this.max) {
        this.position += (this.max - this.position) / (1 + this.constrainPercent);
      }
    }
  }
  /**
   * Updates the sliding animation based on current momentum
   * @param instant If true, snaps immediately to constraints without easing
   */
  slide(instant = false) {
    if (this._hasStopped) return;
    if (this.constrain) {
      this._updateConstrain(instant);
    } else {
      this._updateDefault();
    }
  }
  _updateDefault() {
    this._speed *= 0.9;
    this.position += this._speed;
    if ((this._speed < 0 ? this._speed * -1 : this._speed) < 0.01) {
      this._hasStopped = true;
    }
    if (this.position > this.min) {
      this.position = this.min;
      this._hasStopped = true;
    } else if (this.position < this.max) {
      this.position = this.max;
      this._hasStopped = true;
    }
  }
  _updateConstrain(instant = false) {
    const max = this.max;
    if (instant) {
      if (this.position > this.min) {
        this.position = this.min;
      } else if (this.position < this.max) {
        this.position = this.max;
      }
    } else if (this.position > this.min || this.position < max || this._activeEase) {
      if (!this._activeEase) {
        this._activeEase = this._ease;
        if (this.position > this.min) {
          this._activeEase.start(this._speed, this.position, this.min);
        } else {
          this._activeEase.start(this._speed, this.position, max);
        }
      }
      this.position = this._activeEase.update();
      if (this._activeEase.done) {
        this.position = this._activeEase.to;
        this._speed = 0;
        this._activeEase = null;
      }
    } else {
      this._updateDefault();
    }
  }
}
export {
  SlidingNumber
};
//# sourceMappingURL=SlidingNumber.mjs.map
