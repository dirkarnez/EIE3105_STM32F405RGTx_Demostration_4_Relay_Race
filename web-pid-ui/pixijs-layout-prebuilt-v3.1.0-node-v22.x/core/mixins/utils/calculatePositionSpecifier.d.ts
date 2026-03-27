import { PointData, Size } from 'pixi.js';
import { ComputedLayout, NumberValue, PositionKeyword, PositionSpecifier } from '../../types';
/**
 * Represents a single position token which can be either a numeric value or a keyword
 * Examples: "center", "left", "50%", "10px"
 */
export type ObjectPositionValue = NumberValue | PositionKeyword;
/**
 * Calculates the position of content within its bounds based on PositionSpecifier value
 * Implements CSS-like object-position/transform-origin behavior for flexible content positioning
 *
 * The function supports multiple formats:
 * - Single value: "center", "top", "50%"
 * - Double value: "top left", "center 20%", "10px 30px"
 * - Quad value: "top 10px right 20%"
 *
 * @param value - The value from layout style
 * @param computedLayout - The computed layout dimensions from Yoga
 * @param visualBounds - The visual bounds of the content being positioned
 * @returns Calculated x,y coordinates for content positioning
 */
export declare function calculatePositionSpecifier(value: PositionSpecifier | undefined, computedLayout: ComputedLayout, visualBounds: Size): PointData;
