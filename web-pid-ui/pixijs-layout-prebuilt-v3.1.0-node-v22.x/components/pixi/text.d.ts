import { BitmapText as PixiBitmapText, HTMLText as PixiHTMLText, HTMLTextOptions, Text as PixiText, TextOptions } from 'pixi.js';
import { BaseView, ViewOptions } from './base';
/**
 * A wrapper around the PixiJS Text class that supports additional layout properties.
 * e.g backgroundColor, borderColor, and overflow properties.
 */
export declare class LayoutText extends BaseView<PixiText> {
    constructor(opts: TextOptions & ViewOptions);
}
/**
 * A re-export of the PixiJS Text class that ensures the layout is set after construction.
 *
 * The Text object is a specialized sprite for rendering text.
 */
export declare class Text extends PixiText {
    constructor(opts: TextOptions);
}
/**
 * A wrapper around the PixiJS BitmapText class that supports additional layout properties.
 * e.g backgroundColor, borderColor, and overflow properties.
 */
export declare class LayoutBitmapText extends BaseView<PixiBitmapText> {
    constructor(opts: TextOptions & ViewOptions);
}
/**
 * A re-export of the PixiJS BitmapText class that ensures the layout is set after construction.
 *
 * The BitmapText object is a specialized sprite for rendering bitmap text.
 */
export declare class BitmapText extends PixiBitmapText {
    constructor(opts: TextOptions);
}
/**
 * A wrapper around the PixiJS HTMLText class that supports additional layout properties.
 * e.g backgroundColor, borderColor, and overflow properties.
 */
export declare class LayoutHTMLText extends BaseView<PixiHTMLText> {
    constructor(opts: HTMLTextOptions & ViewOptions);
}
/**
 * A re-export of the PixiJS HTMLText class that ensures the layout is set after construction.
 *
 * The HTMLText object is a specialized sprite for rendering HTML text.
 */
export declare class HTMLText extends PixiHTMLText {
    constructor(opts: HTMLTextOptions);
}
