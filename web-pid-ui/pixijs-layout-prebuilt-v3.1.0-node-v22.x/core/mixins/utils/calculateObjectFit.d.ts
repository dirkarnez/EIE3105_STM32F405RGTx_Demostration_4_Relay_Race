import { Bounds } from 'pixi.js';
import { LayoutStyles } from '../../style/layoutStyles';
import { ComputedLayout } from '../../types';
/**
 * Calculates scaling factors for content based on CSS object-fit rules
 * Determines how content should be resized to fit within its container
 *
 * @param value - The object-fit mode to apply ('fill', 'contain', 'cover', 'none', 'scale-down')
 * @param computedLayout - The computed layout dimensions from Yoga
 * @param bounds - The original bounds of the content being sized
 * @returns Object containing x and y scaling factors to apply
 */
export declare function calculateObjectFit(value: LayoutStyles['objectFit'], computedLayout: ComputedLayout, bounds: Bounds): {
    offsetScaleX: number;
    offsetScaleY: number;
};
