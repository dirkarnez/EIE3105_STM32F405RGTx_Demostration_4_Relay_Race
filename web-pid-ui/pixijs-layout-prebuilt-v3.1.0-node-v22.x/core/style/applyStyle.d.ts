import { Node as YogaNode } from 'yoga-layout/load';
import { YogaStyles } from './yogaStyles';
/**
 * Applies CSS-like flex styles to a Yoga node
 * Maps style properties to appropriate Yoga API calls
 *
 * @param node - The Yoga node to apply styles to
 * @param style - CSS-like flex style object
 */
export declare function applyStyle(node: YogaNode, style?: YogaStyles): void;
