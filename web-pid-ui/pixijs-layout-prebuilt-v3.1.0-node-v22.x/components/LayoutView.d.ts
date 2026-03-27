import { Container, ContainerChild, IRenderLayer } from 'pixi.js';
import { Layout, LayoutOptions } from '../core/Layout';
import { LayoutContainer, LayoutContainerOptions } from './LayoutContainer';
export interface LayoutViewOptions<T extends Container = Container> extends LayoutContainerOptions {
    /** The slot container for holding content */
    slot?: T;
}
/**
 * A specialized container that implements leaf node behavior similar to HTML elements
 * like `<img>` or `<video>`. It manages content through a single slot while supporting
 * layout and styling capabilities.
 *
 * Supports objectFit, objectPosition, backgroundColor, borderColor, and overflow
 *
 * @example
 * ```typescript
 * // Create a view container with an image
 * const view = new LayoutView({ slot: new Sprite() });
 * view.layout = {
 *     width: 200,
 *     height: 200,
 *     objectFit: 'cover',
 *     objectPosition: 'center',
 *     backgroundColor: 'red',
 * };
 * ```
 */
export declare class LayoutView<T extends Container = Container> extends LayoutContainer {
    /** The slot container for holding content */
    slot: T;
    constructor(params: LayoutViewOptions<T>);
    /**
     * Gets the current layout associated with this container
     * @returns The container's layout or null if no layout is attached
     */
    get layout(): Layout | null;
    /**
     * Sets the layout for this container and configures its slot.
     *
     * The layout is split between the container and slot:
     * - Container: Handles positioning, size, and background
     * - Slot: Manages content fitting and positioning
     *
     * @param value - Layout options to apply, or null to remove layout
     *
     * @example
     * ```typescript
     * view.layout = {`
     *     width: '100%',
     *     objectFit: 'contain',
     *     objectPosition: 'center',
     *     backgroundColor: 'red'
     * };
     * ```
     */
    set layout(value: Omit<LayoutOptions, 'target'> | null | boolean);
    /**
     * Prevents adding children directly to this container.
     * Content should be added to the slot instead.
     *
     * @throws {Error} Always throws an error to enforce leaf node behavior
     * @private
     */
    protected _addChild<U extends (ContainerChild | IRenderLayer)[]>(..._children: U): U[0];
}
