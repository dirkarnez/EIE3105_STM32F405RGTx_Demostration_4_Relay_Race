import { Container } from 'pixi.js';
import { Layout } from '../Layout';
/**
 * Sorts the children of the layout based on their order in the parent container
 * This is necessary because not all children are part of the layout and we need to
 * make sure that the Yoga children are in the correct order
 * @param layout - The layout to sort the children for
 */
export declare function onChildAdded(layout: Layout, pixiParent: Container): void;
/**
 * Removes the child from the layout
 * @param layout - The layout to remove the child from
 */
export declare function onChildRemoved(layout: Layout): void;
