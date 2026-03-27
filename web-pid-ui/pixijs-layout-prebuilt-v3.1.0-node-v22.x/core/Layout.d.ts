import { Container } from 'pixi.js';
import { Node } from 'yoga-layout';
import { LayoutStyles } from './style/layoutStyles';
import { ComputedLayout, ComputedPixiLayout, InternalStyles } from './types';
export interface LayoutOptions extends LayoutStyles {
    target: Container;
}
/**
 * Main Layout class that handles the combination of PixiJS containers and their layout
 * using the Yoga layout engine
 */
export declare class Layout {
    /** Default style values to apply to the layout */
    static defaultStyle: {
        container: LayoutStyles;
        leaf: LayoutStyles;
        shared: LayoutStyles;
    };
    /** The Yoga node instance for this layout */
    yoga: Readonly<Node>;
    /** The target PixiJS container */
    readonly target: Container;
    /**
     * Flag indicating if layout needs recalculation
     * @ignore
     */
    _isDirty: boolean;
    /**
     * The computed pixi layout that is applied to the target container in the updateLocalTransform step
     * @ignore
     */
    _computedPixiLayout: Required<ComputedPixiLayout>;
    /**
     * The computed bounds of the yoga node
     * @ignore
     */
    _computedLayout: ComputedLayout;
    /**
     * The styles used for layout calculation
     * @ignore
     */
    _styles: InternalStyles;
    /**
     * The number of times the layout has been modified
     * @ignore
     */
    _modificationCount: number;
    /**
     * Flag indicating if the layout should be recalculated even if it hasn't changed the yoga node.
     * This is used to force an update when certain style properties change such as `objectFit`.
     * @ignore
     */
    _forceUpdate: boolean;
    /**
     * Flag indicating if the layout has a parent node
     */
    hasParent: boolean;
    /**
     * The keys to track for changes to force an update
     * @ignore
     */
    protected _trackedStyleKeys: (keyof LayoutStyles)[];
    constructor({ target }: LayoutOptions);
    /** Returns the layout style */
    get style(): Readonly<LayoutStyles>;
    /** Returns the computed layout of the yoga node */
    get computedLayout(): Readonly<ComputedLayout>;
    /** Returns the computed layout of the pixi node */
    get computedPixiLayout(): Readonly<Required<ComputedPixiLayout>>;
    /**
     * Returns the true x position of the target.
     *
     * When an element is in layout, the x/y position is an offset from where it is laid out.
     * This is the true x position of the element in the parent container.
     */
    get realX(): number;
    /**
     * Returns the true y position of the target.
     *
     * When an element is in layout, the x/y position is an offset from where it is laid out.
     * This is the true y position of the element in the parent container.
     */
    get realY(): number;
    /**
     * Returns the true x scale of the target.
     *
     * When an element is in layout, the scale is an offset from 1.
     * This is the true x scale of the element.
     */
    get realScaleX(): number;
    /**
     * Returns the true y scale of the target.
     *
     * When an element is in layout, the scale is an offset from 1.
     * This is the true y scale of the element.
     */
    get realScaleY(): number;
    /**
     * Updates the layout style and triggers recalculation
     * @param style - New layout style to apply
     */
    setStyle(style: LayoutStyles): void;
    /** Marks the root layout as needing recalculation */
    invalidateRoot(): void;
    /**
     * Forces an update of the layout even if it hasn't changed the yoga node.
     * This is used to force an update when certain style properties change such as `objectFit`.
     * Or when you have changed something inside of Pixi that is not tracked by the layout system.
     */
    forceUpdate(): void;
    /**
     * Finds the root container by traversing up the layout tree
     * @returns The root container
     */
    getRoot(): Container;
    /**
     * @ignore
     */
    _onChildAdded(pixiParent: Container): void;
    /**
     * @ignore
     */
    _onChildRemoved(): void;
    destroy(): void;
}
