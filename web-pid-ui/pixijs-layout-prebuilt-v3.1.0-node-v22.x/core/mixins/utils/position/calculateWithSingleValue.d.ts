import { PointData, Size } from 'pixi.js';
import { ComputedLayout, PositionSpecifier } from '../../../types';
/**
 * Calculates position when a single value is provided (e.g., "center", "top", "50%")
 * This implements CSS object-position behavior with a single value
 *
 * @param tokens - Array containing a single position token
 * @param computedLayout - The computed layout from Yoga
 * @param visualBounds - The visual bounds of the element being positioned
 * @returns Object with x and y coordinates for positioning
 */
export declare function calculateWithSingleValue(tokens: PositionSpecifier[], computedLayout: ComputedLayout, visualBounds: Size): PointData;
