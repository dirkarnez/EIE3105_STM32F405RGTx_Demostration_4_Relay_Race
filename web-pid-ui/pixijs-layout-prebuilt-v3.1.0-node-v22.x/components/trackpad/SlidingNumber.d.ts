/**
 * Options for configuring the SlidingNumber behavior
 */
export interface SlidingNumberOptions {
    /** Whether to constrain the value between min and max. Default: true */
    constrain?: boolean;
    /** Percentage of overflow allowed when dragging beyond constraints. Default: 0 */
    constrainPercent?: number;
    /** Maximum speed the value can slide. Default: 400 */
    maxSpeed?: number;
    /** Custom easing function for constraint bouncing. Default: ScrollSpring */
    ease?: ConstrainEase;
}
/**
 * Interface for custom easing functions used when bouncing against constraints
 */
export interface ConstrainEase {
    /** Whether the easing has completed */
    done: boolean;
    /** Target value to ease towards */
    to: number;
    /** Initialize the easing with current state */
    start(speed: number, pos: number, to: number): void;
    /** Calculate next eased value */
    update(): number;
}
/**
 * A utility class that manages sliding/scrolling number values with physics-based momentum and constraints.
 * Useful for implementing scrolling, slider controls, or any UI element that needs smooth, physics-based movement.
 *
 * Features:
 * - Momentum-based sliding with speed control
 * - Constraint boundaries with optional elastic overflow
 * - Customizable easing for constraint bouncing
 *
 * @example
 * ```typescript
 * // Create a sliding number for a scroll container
 * const slider = new SlidingNumber({
 *     constrain: true,
 *     maxSpeed: 400,
 *     constrainPercent: 0.2
 * });
 *
 * // Set the boundaries
 * slider.min = 0;
 * slider.max = -1000;
 *
 * // Handle drag start
 * onDragStart(e) {
 *     slider.grab(e.position);
 * }
 *
 * // Handle drag move
 * onDragMove(e) {
 *     slider.hold(e.position);
 * }
 *
 * // Update loop
 * ticker.add(() => {
 *     slider.slide();
 *     container.y = slider.value;
 * });
 * ```
 */
export declare class SlidingNumber {
    protected position: number;
    /** The maximum speed at which the sliding number can move. */
    maxSpeed: number;
    /** When dragging this number represents the percentage that will be allowed to move outside the min and max values. */
    constrainPercent: number;
    /** Whether the sliding number is constrained to the min and max values. */
    constrain: boolean;
    /** The minimum value the sliding number can take. */
    min: number;
    /** The maximum value the sliding number can take. */
    max: number;
    protected _ease: ConstrainEase;
    protected _offset: number;
    protected _prev: number;
    protected _speed: number;
    protected _hasStopped: boolean;
    protected _targetSpeed: number;
    protected _speedChecker: number;
    protected _grab: number;
    protected _activeEase: ConstrainEase | null;
    constructor(options?: SlidingNumberOptions);
    /**
     * Sets the position of the sliding number.
     * This will also reset the speed to 0.
     * @param n The new position value.
     */
    set value(n: number);
    /**
     * Gets the current position of the sliding number.
     * @returns The current position value.
     */
    get value(): number;
    /**
     * Initiates a grab/drag operation at the specified offset
     * @param offset The initial grab position
     */
    grab(offset: number): void;
    /**
     * Updates the position while being held/dragged
     * @param newPosition The new position from the input device
     */
    hold(newPosition: number): void;
    /**
     * Updates the sliding animation based on current momentum
     * @param instant If true, snaps immediately to constraints without easing
     */
    slide(instant?: boolean): void;
    protected _updateDefault(): void;
    protected _updateConstrain(instant?: boolean): void;
}
