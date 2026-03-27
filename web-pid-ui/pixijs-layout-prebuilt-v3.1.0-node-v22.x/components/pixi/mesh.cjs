"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const pixi_js = require("pixi.js");
const base = require("./base.cjs");
class LayoutMesh extends base.BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: pixi_js.Mesh
    });
  }
}
class Mesh extends pixi_js.Mesh {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutPerspectiveMesh extends base.BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: pixi_js.PerspectiveMesh
    });
  }
}
class PerspectiveMesh extends pixi_js.PerspectiveMesh {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutMeshPlane extends base.BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: pixi_js.MeshPlane
    });
  }
}
class MeshPlane extends pixi_js.MeshPlane {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutMeshRope extends base.BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: pixi_js.MeshRope
    });
  }
}
class MeshRope extends pixi_js.MeshRope {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutMeshSimple extends base.BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: pixi_js.MeshSimple
    });
  }
}
class MeshSimple extends pixi_js.MeshSimple {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
exports.LayoutMesh = LayoutMesh;
exports.LayoutMeshPlane = LayoutMeshPlane;
exports.LayoutMeshRope = LayoutMeshRope;
exports.LayoutMeshSimple = LayoutMeshSimple;
exports.LayoutPerspectiveMesh = LayoutPerspectiveMesh;
exports.Mesh = Mesh;
exports.MeshPlane = MeshPlane;
exports.MeshRope = MeshRope;
exports.MeshSimple = MeshSimple;
exports.PerspectiveMesh = PerspectiveMesh;
//# sourceMappingURL=mesh.cjs.map
