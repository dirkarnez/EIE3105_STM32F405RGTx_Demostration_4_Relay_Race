import { PointData, Size } from 'pixi.js';
import { ComputedLayout, PositionSpecifier } from '../../../types';
/**
 * Calculates position when two values are provided (e.g., "top center", "10% 20px")
 * This implements CSS object-position behavior with two values
 *
 * @param tokens - Array of position tokens (should be exactly two)
 * @param computedLayout - The computed layout from Yoga
 * @param visualBounds - The visual bounds of the element being positioned
 * @returns Object with x and y coordinates for positioning
 */
export declare function calculateWithDoubleValue(tokens: PositionSpecifier[], computedLayout: ComputedLayout, visualBounds: Size): PointData;
