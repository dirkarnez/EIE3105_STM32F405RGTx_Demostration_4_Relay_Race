import { Container, ContainerChild, ContainerOptions, DestroyOptions, Graphics } from 'pixi.js';
import { ComputedLayout } from '../core/types';
import { Trackpad, TrackpadOptions } from './trackpad/Trackpad';
/**
 * Options for configuring the layout container.
 * @property {TrackpadOptions} [trackpad] - Options to configure the trackpad for scrolling
 */
export interface LayoutContainerOptions extends ContainerOptions {
    /** Options to configure the trackpad for scrolling */
    trackpad?: TrackpadOptions;
    /** A container to be used for the background */
    background?: ContainerChild;
}
/**
 * A specialized container that serves as an overflow container for scrolling content.
 */
export interface OverflowContainer extends Container {
    isOverflowContainer: boolean;
}
/**
 * A container that behaves like an HTML div element with flexbox-style layout capabilities.
 *
 * Supports objectFit, objectPosition, backgroundColor, borderColor, and overflow
 *
 * @example
 * ```typescript
 * // Create a container with background and border
 * const container = new LayoutContainer();
 * container.layout = {
 *     width: 300,
 *     height: 200,
 *     backgroundColor: 0xFF0000,
 *     borderWidth: 2,
 *     borderColor: 0x000000,
 *     borderRadius: 8,
 *     padding: 16,
 *     flexDirection: 'row',
 *     justifyContent: 'center',
 *     alignItems: 'center',
 * };
 *
 * // Create child elements
 * const child1 = new Container();
 * child1.layout = { flex: 1 };
 * const child2 = new Container();
 * child2.layout = { flex: 2 };
 *
 * // Add children which will be positioned using flex layout
 * container.addChild(child1, child2);
 * ```
 */
export declare class LayoutContainer extends Container {
    /** Graphics object used for rendering background and borders */
    background: Container | Graphics;
    stroke: Graphics;
    /** The container that holds the overflow content */
    overflowContainer: OverflowContainer;
    /** Access to original Container methods */
    readonly containerMethods: Readonly<{
        addChild: <T extends ContainerChild>(...children: T[]) => T;
        addChildAt: <T extends ContainerChild>(child: T, index: number) => T;
        removeChild: <T extends ContainerChild>(...children: T[]) => T;
        removeChildAt: (index: number) => ContainerChild;
        getChildAt: (index: number) => ContainerChild;
        getChildIndex: (child: ContainerChild) => number;
        setChildIndex: (child: ContainerChild, index: number) => void;
        getChildByName: (name: string, deep?: boolean) => ContainerChild | null;
        removeChildren: (beginIndex?: number, endIndex?: number) => ContainerChild[];
        sortChildren: () => void;
        swapChildren: (child1: ContainerChild, child2: ContainerChild) => void;
        reparentChild: <T extends ContainerChild[]>(...children: T) => T[0];
        reparentChildAt: <T extends ContainerChild>(child: T, index: number) => T;
        getChildByLabel: (label: string, deep?: boolean) => ContainerChild | null;
        getChildrenByLabel: (label: string, deep?: boolean, out?: ContainerChild[]) => ContainerChild[];
    }>;
    /** The trackpad for handling scrolling */
    protected _trackpad: Trackpad;
    /** Mask for overflow handling */
    private _mask;
    /** Whether or not the background was created by the user */
    private _isUserBackground;
    /** The hit area for the container */
    private _hitArea;
    constructor(params?: LayoutContainerOptions);
    /**
     * Computes the layout data for this container based on yoga calculations and draws the background.
     * @param computedLayout - The computed layout data from yoga
     * @returns Position and scale information for the container
     * @internal
     */
    computeLayoutData(computedLayout: ComputedLayout): {
        x: number;
        y: number;
        offsetX: number;
        offsetY: number;
        scaleX: number;
        scaleY: number;
    };
    /**
     * Updates the container mask based on overflow settings
     * @param width - Container width
     * @param height - Container height
     * @param radius - Border radius
     */
    protected _updateMask(width: number, height: number, radius?: number): void;
    protected _updateBackground(computedLayout: ComputedLayout): void;
    /**
     * Draws the container's background including:
     * - Background color
     * - Border
     * - Border radius
     *
     * @param computedLayout - The computed layout data from yoga
     * @protected
     */
    protected _drawBackground(computedLayout: ComputedLayout): void;
    protected update(): void;
    destroy(options?: DestroyOptions): void;
}
