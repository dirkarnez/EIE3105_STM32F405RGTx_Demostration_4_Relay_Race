import { Geometry, Mesh as PixiMesh, MeshGeometry, MeshOptions, MeshPlane as PixiMeshPlane, MeshRope as PixiMeshRope, MeshSimple as PixiMeshSimple, PerspectiveMesh as PixiPerspectiveMesh, Shader, TextureShader } from 'pixi.js';
import { BaseView, ViewOptions } from './base';
/**
 * A specialized wrapper around the PixiJS Mesh class that implements leaf node behavior similar to HTML elements
 * that supports additional layout properties.
 * e.g objectFit, objectPosition, backgroundColor, borderColor, and overflow properties.
 */
export declare class LayoutMesh<GEOMETRY extends Geometry = MeshGeometry, SHADER extends Shader = TextureShader> extends BaseView<PixiMesh<GEOMETRY, SHADER>> {
    constructor(opts: MeshOptions<GEOMETRY, SHADER> & ViewOptions);
}
/**
 * A re-export of the PixiJS Mesh class that ensures the layout is set after construction.
 *
 * Base mesh class.
 *
 * This class empowers you to have maximum flexibility to render any kind of WebGL/WebGPU visuals you can think of.
 * This class assumes a certain level of WebGL/WebGPU knowledge.
 * If you know a bit this should abstract enough away to make your life easier!
 *
 * Pretty much ALL WebGL/WebGPU can be broken down into the following:
 * - Geometry - The structure and data for the mesh. This can include anything from positions, uvs, normals, colors etc..
 * - Shader - This is the shader that PixiJS will render the geometry with (attributes in the shader must match the geometry)
 * - State - This is the state of WebGL required to render the mesh.
 *
 * Through a combination of the above elements you can render anything you want, 2D or 3D!
 */
export declare class Mesh<GEOMETRY extends Geometry = MeshGeometry, SHADER extends Shader = TextureShader> extends PixiMesh<GEOMETRY, SHADER> {
    constructor(opts: MeshOptions<GEOMETRY, SHADER>);
}
/**
 * A specialized wrapper around the PixiJS PerspectiveMesh class that implements leaf node behavior similar to HTML elements
 * that supports additional layout properties.
 * e.g objectFit, objectPosition, backgroundColor, borderColor, and overflow properties.
 */
export declare class LayoutPerspectiveMesh extends BaseView<PixiPerspectiveMesh> {
    constructor(opts: ConstructorParameters<typeof PixiPerspectiveMesh>[0] & ViewOptions);
}
/**
 * A re-export of the PixiJS PerspectiveMesh class that ensures the layout is set after construction.
 *
 * A perspective mesh that allows you to draw a 2d plane with perspective. Where ever you move the corners
 * the texture will be projected to look like it is in 3d space. Great for mapping a 2D mesh into a 3D scene.
 *
 * The calculations is done at the uv level. This means that the more vertices you have the more smooth
 * the perspective will be. If you have a low amount of vertices you may see the texture stretch. Too many vertices
 * could be slower. It is a balance between performance and quality! We leave that to you to decide.
 *
 * IMPORTANT: This is not a full 3D mesh, it is a 2D mesh with a perspective projection applied to it :)
 */
export declare class PerspectiveMesh extends PixiPerspectiveMesh {
    constructor(opts: ConstructorParameters<typeof PixiPerspectiveMesh>[0]);
}
/**
 * A specialized wrapper around the PixiJS MeshPlane class that implements leaf node behavior similar to HTML elements
 * that supports additional layout properties.
 * e.g objectFit, objectPosition, backgroundColor, borderColor, and overflow properties.
 */
export declare class LayoutMeshPlane extends BaseView<PixiMeshPlane> {
    constructor(opts: ConstructorParameters<typeof PixiMeshPlane>[0] & ViewOptions);
}
/**
 * A re-export of the PixiJS MeshPlane class that ensures the layout is set after construction.
 *
 * The MeshPlane allows you to draw a texture across several points and then manipulate these points
 */
export declare class MeshPlane extends PixiMeshPlane {
    constructor(opts: ConstructorParameters<typeof PixiMeshPlane>[0]);
}
/**
 * A specialized wrapper around the PixiJS MeshRope class that implements leaf node behavior similar to HTML elements
 * that supports additional layout properties.
 * e.g objectFit, objectPosition, backgroundColor, borderColor, and overflow properties.
 */
export declare class LayoutMeshRope extends BaseView<PixiMeshRope> {
    constructor(opts: ConstructorParameters<typeof PixiMeshRope>[0] & ViewOptions);
}
/**
 * A re-export of the PixiJS MeshRope class that ensures the layout is set after construction.
 *
 * The rope allows you to draw a texture across several points and then manipulate these points
 */
export declare class MeshRope extends PixiMeshRope {
    constructor(opts: ConstructorParameters<typeof PixiMeshRope>[0]);
}
/**
 * A specialized wrapper around the PixiJS MeshSimple class that implements leaf node behavior similar to HTML elements
 * that supports additional layout properties.
 * e.g objectFit, objectPosition, backgroundColor, borderColor, and overflow properties.
 */
export declare class LayoutMeshSimple extends BaseView<PixiMeshSimple> {
    constructor(opts: ConstructorParameters<typeof PixiMeshSimple>[0] & ViewOptions);
}
/**
 * A re-export of the PixiJS MeshSimple class that ensures the layout is set after construction.
 *
 * The Simple Mesh class mimics Mesh in PixiJS, providing easy-to-use constructor arguments.
 */
export declare class MeshSimple extends PixiMeshSimple {
    constructor(opts: ConstructorParameters<typeof PixiMeshSimple>[0]);
}
