/**
 * Configuration options for the Spring physics simulation
 */
export interface SpringOptions {
    /** Maximum velocity the spring can move. Default: 160 */
    max?: number;
    /** Damping factor to control oscillation decay. Default: 0.8 */
    damp?: number;
    /** Spring tension/stiffness factor. Default: 0.1 */
    springiness?: number;
}
/**
 * Simple physics-based spring implementation for smooth animations.
 * Simulates spring motion with configurable tension, damping, and velocity limits.
 *
 * Features:
 * - Configurable spring physics parameters
 * - Velocity limiting to prevent extreme movements
 * - Simple API for position and target updates
 *
 * @example
 * ```typescript
 * // Create a spring with custom physics parameters
 * const spring = new Spring({
 *     max: 200,         // Maximum velocity
 *     damp: 0.7,        // Higher damping = less bounce
 *     springiness: 0.15 // Higher springiness = faster movement
 * });
 *
 * // Set initial position and target
 * spring.x = startPosition;
 * spring.tx = targetPosition;
 *
 * // Update loop
 * ticker.add(() => {
 *     spring.update();
 *     sprite.x = spring.x;
 * });
 * ```
 */
export declare class Spring {
    /** Current position of the spring */
    x: number;
    /** Current acceleration */
    ax: number;
    /** Current velocity */
    dx: number;
    /** Target position the spring is moving towards */
    tx: number;
    /** Spring configuration options */
    protected _options: Required<SpringOptions>;
    constructor(options?: SpringOptions);
    /**
     * Updates the spring physics simulation for one frame
     * Calculates new position based on acceleration, velocity, and damping
     */
    update(): void;
}
