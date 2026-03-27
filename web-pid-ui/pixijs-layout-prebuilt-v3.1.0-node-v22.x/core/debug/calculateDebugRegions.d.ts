import { Rectangle } from 'pixi.js';
import { Layout } from '../Layout';
type DebugRegionRects = {
    outer: Rectangle;
    inner: Rectangle;
};
export type DebugRegions = Map<DebugRegionType, DebugRegionRects>;
/**
 * Types of regions that can be debugged in the yoga layout
 */
export declare enum DebugRegionType {
    Margin = "margin",// Outer spacing around element
    Padding = "padding",// Inner spacing within element
    Border = "border",// Border area between margin and padding
    Flex = "flex",// Flex container area
    Content = "content"
}
/**
 * Calculates and updates the debug regions (margin, border, and padding) for a given layout.
 * This function modifies the provided `regions` object to reflect the computed bounds
 * and edge values (margin, border, and padding) of the layout.
 *
 * @param layout - The layout object containing computed bounds and edge values.
 * @param regions - A map of debug region types to their corresponding debug region objects.
 *                  The function updates the regions for margin, border, and padding.
 */
export declare function calculateRegions(layout: Layout, regions: DebugRegions): void;
export {};
