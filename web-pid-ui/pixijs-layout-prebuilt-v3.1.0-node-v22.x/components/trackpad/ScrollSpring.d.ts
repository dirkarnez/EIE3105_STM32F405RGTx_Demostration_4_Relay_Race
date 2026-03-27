import { ConstrainEase } from './SlidingNumber';
import { Spring } from './Spring';
/**
 * ScrollSpring implements a physics-based spring animation for smooth scrolling transitions.
 * It handles both momentum-based movement and spring-to-target behavior when reaching constraints.
 *
 * Features:
 * - Smooth spring-based animation
 * - Direction-aware speed correction
 * - Configurable spring parameters
 * - Implements ConstrainEase interface for use with SlidingNumber
 *
 * @example
 * ```typescript
 * // Create a scroll spring with custom parameters
 * const spring = new ScrollSpring({
 *     tension: 0.3,
 *     friction: 0.8
 * });
 *
 * // Initialize spring animation
 * spring.start(currentSpeed, startPosition, targetPosition);
 *
 * // Update loop
 * ticker.add(() => {
 *     if (!spring.done) {
 *         const position = spring.update();
 *         container.y = position;
 *     }
 * });
 * ```
 */
export declare class ScrollSpring implements ConstrainEase {
    /** Whether the spring animation has completed */
    done: boolean;
    /** Target value the spring is animating towards */
    to: number;
    /** Underlying spring physics implementation */
    protected _spring: Spring;
    /** Current position of the spring */
    protected _pos: number;
    /** Current speed of the movement */
    protected _speed: number;
    /** Whether speed needs correction due to direction change */
    protected _correctSpeed: boolean;
    constructor(springOptions?: ConstructorParameters<typeof Spring>[0]);
    /**
     * Initializes a new spring animation
     * @param speed Initial velocity of the movement
     * @param pos Starting position
     * @param to Target position to animate towards
     */
    start(speed: number, pos: number, to: number): void;
    /**
     * Updates the spring animation state
     * @returns The new position after the spring calculation
     */
    update(): number;
}
