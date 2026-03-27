import { Mesh as Mesh$1, PerspectiveMesh as PerspectiveMesh$1, MeshPlane as MeshPlane$1, MeshRope as MeshRope$1, MeshSimple as MeshSimple$1 } from "pixi.js";
import { BaseView } from "./base.mjs";
class LayoutMesh extends BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: Mesh$1
    });
  }
}
class Mesh extends Mesh$1 {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutPerspectiveMesh extends BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: PerspectiveMesh$1
    });
  }
}
class PerspectiveMesh extends PerspectiveMesh$1 {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutMeshPlane extends BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: MeshPlane$1
    });
  }
}
class MeshPlane extends MeshPlane$1 {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutMeshRope extends BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: MeshRope$1
    });
  }
}
class MeshRope extends MeshRope$1 {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
class LayoutMeshSimple extends BaseView {
  constructor(opts) {
    super({
      ...opts,
      ClassType: MeshSimple$1
    });
  }
}
class MeshSimple extends MeshSimple$1 {
  constructor(opts) {
    const { layout, ...options } = opts;
    super(options);
    this.layout = layout;
  }
}
export {
  LayoutMesh,
  LayoutMeshPlane,
  LayoutMeshRope,
  LayoutMeshSimple,
  LayoutPerspectiveMesh,
  Mesh,
  MeshPlane,
  MeshRope,
  MeshSimple,
  PerspectiveMesh
};
//# sourceMappingURL=mesh.mjs.map
