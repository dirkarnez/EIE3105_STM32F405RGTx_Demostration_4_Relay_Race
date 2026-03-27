import { Container, ObservablePoint, ViewContainer } from 'pixi.js';
import { LayoutStyles } from '../../style/layoutStyles';
import { ComputedLayout, ComputedPixiLayout } from '../../types';
/**
 * Calculates the final position and scale for a container based on its layout
 * Handles object-fit and object-position to determine how content is sized and positioned
 *
 * @param container - The container to calculate layout data for
 * @param computedLayout - The computed layout data from Yoga
 * @param defaultObjectFit - Default object-fit value to use if none specified
 * @param anchor - Optional anchor point for positioning adjustments
 * @returns The final position and scale values to apply
 */
export declare function baseComputeLayoutData(container: Container | ViewContainer, computedLayout: ComputedLayout, defaultObjectFit: LayoutStyles['objectFit'], anchor?: ObservablePoint): ComputedPixiLayout;
