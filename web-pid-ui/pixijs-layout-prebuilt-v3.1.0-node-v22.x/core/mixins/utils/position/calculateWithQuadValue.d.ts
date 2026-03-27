import { PointData, Size } from 'pixi.js';
import { ComputedLayout, PositionSpecifier } from '../../../types';
/**
 * Calculates position when four values are provided (e.g., "top 10px right 20px")
 * Handles CSS object-position with format: <keyword> <offset> <keyword> <offset>
 *
 * @param tokens - Array of four position tokens
 * @param computedLayout - The computed layout from Yoga
 * @param visualBounds - The visual bounds of the element being positioned
 * @returns Object with x and y coordinates for positioning
 */
export declare function calculateWithQuadValue(tokens: PositionSpecifier[], computedLayout: ComputedLayout, visualBounds: Size): PointData;
