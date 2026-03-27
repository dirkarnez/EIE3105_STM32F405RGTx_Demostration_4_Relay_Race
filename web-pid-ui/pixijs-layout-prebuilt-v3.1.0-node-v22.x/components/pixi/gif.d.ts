import { GifSource, GifSprite as PixiGifSprite, GifSpriteOptions } from 'pixi.js/gif';
import { BaseView, ViewOptions } from './base';
/**
 * A specialized wrapper around the PixiJS GifSprite class that implements leaf node behavior similar to HTML elements
 * that supports additional layout properties.
 * e.g objectFit, objectPosition, backgroundColor, borderColor, and overflow properties.
 */
export declare class LayoutGifSprite extends BaseView<PixiGifSprite> {
    constructor(opts: (GifSource | GifSpriteOptions) & ViewOptions);
}
/**
 * A re-export of the PixiJS GifSprite class that ensures the layout is set after construction.
 *
 * The GifSprite object is a specialized sprite for rendering GIF images.
 */
export declare class GifSprite extends PixiGifSprite {
    constructor(opts: GifSource | GifSpriteOptions);
}
