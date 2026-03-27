import { Container, PointData, Rectangle } from 'pixi.js';
import { DebugRegionType } from './calculateDebugRegions';
/**
 * Represents a debug region with its visual properties
 */
export interface DebugNodeRegion {
    outer: Rectangle;
    inner: Rectangle;
    color: string;
    draw: boolean;
}
/**
 * Visual debug object that renders layout regions
 */
export declare class DebugNode extends Container {
    /** Graphics objects for each region type */
    private readonly graphics;
    private readonly heatGraphics;
    constructor();
    /**
     * Initialize the debug object with region data
     */
    init(regions: Record<DebugRegionType, DebugNodeRegion> & {
        target: PointData;
        alpha: number;
        heat: {
            invalidationCount: number;
            draw: boolean;
        };
        heatOnly: boolean;
    }): void;
    /**
     * Reset the debug object's state
     */
    reset(): void;
    /**
     * Draw a box with a cut-out center
     */
    private drawCutBox;
}
