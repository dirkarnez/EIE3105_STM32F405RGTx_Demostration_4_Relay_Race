"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
class Spring {
  constructor(options = {}) {
    /** Current position of the spring */
    __publicField(this, "x");
    /** Current acceleration */
    __publicField(this, "ax");
    /** Current velocity */
    __publicField(this, "dx");
    /** Target position the spring is moving towards */
    __publicField(this, "tx");
    /** Spring configuration options */
    __publicField(this, "_options");
    this.x = 0;
    this.ax = 0;
    this.dx = 0;
    this.tx = 0;
    this._options = options;
    this._options.max = options.max ?? 160;
    this._options.damp = options.damp ?? 0.8;
    this._options.springiness = options.springiness ?? 0.1;
  }
  /**
   * Updates the spring physics simulation for one frame
   * Calculates new position based on acceleration, velocity, and damping
   */
  update() {
    this.ax = (this.tx - this.x) * this._options.springiness;
    this.dx += this.ax;
    this.dx *= this._options.damp;
    if (this.dx < -this._options.max) this.dx = -this._options.max;
    else if (this.dx > this._options.max) this.dx = this._options.max;
    this.x += this.dx;
  }
}
exports.Spring = Spring;
//# sourceMappingURL=Spring.cjs.map
