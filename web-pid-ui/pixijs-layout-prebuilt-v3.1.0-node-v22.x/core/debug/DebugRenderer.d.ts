import { Container } from 'pixi.js';
import { Layout } from '../Layout';
/**
 * Main debug renderer for Yoga layout
 * Handles visualization of layout regions and flex properties
 */
export declare class DebugRenderer {
    /** Container for all debug visuals */
    readonly holder: Container<import('pixi.js').ContainerChild>;
    /** Region data for each debug type */
    private readonly regions;
    /** Color configuration for each region type */
    private readonly colors;
    /** Global alpha value for all regions */
    alpha: number;
    constructor();
    /**
     * Clean up previous render state
     */
    reset(): void;
    /**
     * Render debug visuals for the given layout
     */
    render(layout: Layout): void;
    /**
     * Clean up the debug renderer
     */
    destroy(): void;
}
