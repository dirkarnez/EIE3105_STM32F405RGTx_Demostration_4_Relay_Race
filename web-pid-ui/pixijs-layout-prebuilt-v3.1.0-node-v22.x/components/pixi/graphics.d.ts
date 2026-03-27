import { Graphics as PixiGraphics } from 'pixi.js';
import { BaseView, ViewOptions } from './base';
/**
 * A specialized wrapper around the PixiJS Graphics class that implements leaf node behavior similar to HTML elements
 * that supports additional layout properties.
 * e.g objectFit, objectPosition, backgroundColor, borderColor, and overflow properties.
 */
export declare class LayoutGraphics extends BaseView<PixiGraphics> {
    constructor(opts: ConstructorParameters<typeof PixiGraphics>[0] & ViewOptions);
}
/**
 * A re-export of the PixiJS Graphics class that ensures the layout is set after construction.
 *
 * The Graphics object is a container for drawing shapes and lines.
 */
export declare class Graphics extends PixiGraphics {
    constructor(opts: ConstructorParameters<typeof PixiGraphics>[0]);
}
