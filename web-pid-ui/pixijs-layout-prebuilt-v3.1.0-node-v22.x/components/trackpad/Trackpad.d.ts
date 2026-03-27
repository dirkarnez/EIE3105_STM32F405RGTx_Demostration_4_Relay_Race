import { Point, Rectangle } from 'pixi.js';
import { ConstrainEase, SlidingNumber } from './SlidingNumber';
/**
 * Configuration options for the Trackpad component
 */
export interface TrackpadOptions {
    /** Custom easing function for x-axis constraint bouncing */
    xEase?: ConstrainEase;
    /** Custom easing function for y-axis constraint bouncing */
    yEase?: ConstrainEase;
    /** Percentage of overflow allowed when dragging beyond x-axis constraints */
    xConstrainPercent?: number;
    /** Percentage of overflow allowed when dragging beyond y-axis constraints */
    yConstrainPercent?: number;
    /** Maximum speed for both axes. Default: 400 */
    maxSpeed?: number;
    /** Whether to constrain movement within bounds. Default: true */
    constrain?: boolean;
    /** Disable easing when releasing the trackpad. Default: false */
    disableEasing?: boolean;
}
/**
 * Trackpad provides touch/mouse-based 2D scrolling with momentum and constraints.
 * Useful for implementing scrollable containers, map panning, or any 2D draggable interface.
 *
 * Features:
 * - Separate x and y axis scrolling with momentum
 * - Constrained movement within bounds
 * - Customizable easing and overflow
 * - Frame-based updates for smooth animation
 *
 * @example
 * ```typescript
 * // Create a trackpad for a scrollable container
 * const trackpad = new Trackpad({
 *     constrain: true,
 *     maxSpeed: 400,
 *     xConstrainPercent: 0.2,
 *     yConstrainPercent: 0.2
 * });
 *
 * // Set the visible frame size
 * trackpad.resize(800, 600);
 *
 * // Set the content bounds
 * trackpad.setBounds(0, 1200, 0, 900);
 *
 * // Handle pointer events
 * container.on('pointerdown', (e) => trackpad.pointerDown(e.global));
 * container.on('pointermove', (e) => trackpad.pointerMove(e.global));
 * container.on('pointerup', () => trackpad.pointerUp());
 *
 * // Update loop
 * ticker.add(() => {
 *     trackpad.update();
 *     content.x = trackpad.x;
 *     content.y = trackpad.y;
 * });
 * ```
 */
export declare class Trackpad {
    /** Manages scrolling behavior for the x-axis */
    xAxis: SlidingNumber;
    /** Manages scrolling behavior for the y-axis */
    yAxis: SlidingNumber;
    protected _isDown: boolean;
    protected _globalPosition: Point;
    protected _frame: Rectangle;
    protected _bounds: Rectangle;
    protected _dirty: boolean;
    protected disableEasing: boolean;
    constructor(options: TrackpadOptions);
    /**
     * Handles pointer down events to start tracking
     * @param pos Global position of the pointer
     */
    pointerDown(pos: Point): void;
    /**
     * Handles pointer up events to end tracking
     */
    pointerUp(): void;
    /**
     * Handles pointer move events to update tracking
     * @param pos Global position of the pointer
     */
    pointerMove(pos: Point): void;
    /**
     * Updates the trackpad position and momentum.
     * Should be called each frame to maintain smooth scrolling.
     */
    update(): void;
    /**
     * Sets the size of the visible frame/viewport
     * @param w Width of the frame in pixels
     * @param h Height of the frame in pixels
     */
    resize(w: number, h: number): void;
    /**
     * Sets the bounds for content scrolling
     * @param minX Minimum x coordinate (left)
     * @param maxX Maximum x coordinate (right)
     * @param minY Minimum y coordinate (top)
     * @param maxY Maximum y coordinate (bottom)
     */
    setBounds(minX: number, maxX: number, minY: number, maxY: number): void;
    /**
     * Gets or sets the current x position of the trackpad.
     * This is a shorthand for accessing the xAxis value.
     */
    get x(): number;
    set x(value: number);
    /**
     * Gets or sets the current y position of the trackpad.
     * This is a shorthand for accessing the yAxis value.
     */
    get y(): number;
    set y(value: number);
}
