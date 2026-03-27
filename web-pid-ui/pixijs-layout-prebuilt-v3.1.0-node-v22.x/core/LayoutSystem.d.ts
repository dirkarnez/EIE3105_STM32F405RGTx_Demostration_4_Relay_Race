import { Container, ExtensionType, System } from 'pixi.js';
/**
 * Options for the layout system
 */
export interface LayoutSystemOptions {
    layout: {
        /** Whether the layout system should automatically update the layout when it detects changes */
        autoUpdate: boolean;
        /** Whether to enable debug mode */
        enableDebug: boolean;
        /** The number of modifications to trigger rendering the heatmap */
        debugModificationCount: number;
        /** The length of time in milliseconds to throttle the calculating auto layout values */
        throttle: number;
    };
}
/**
 * The layout system is responsible for updating the layout of the containers
 * @memberof rendering
 */
export declare class LayoutSystem implements System<LayoutSystemOptions> {
    /** @ignore */
    static extension: {
        readonly type: readonly [ExtensionType.WebGLSystem, ExtensionType.WebGPUSystem];
        readonly name: "layout";
    };
    /**
     * Whether the layout system should automatically update the layout when it detects changes
     * @default true
     */
    autoUpdate: boolean;
    private _debugEnabled;
    private _debugRenderer;
    private _throttledUpdateSize;
    private _throttle;
    private _modificationCount;
    /**
     * Initializes the layout system by loading the Yoga library asynchronously
     * @returns A promise that resolves when the system is ready
     */
    init(options?: LayoutSystemOptions): Promise<void>;
    /**
     * Toggles the debug mode for the layout system
     * @param value - Whether to enable or disable debug mode
     */
    enableDebug(value?: boolean): Promise<void>;
    /**
     * Updates the layout of the container and its children
     * @param container - The container to update the layout for
     */
    update(container: Container): void;
    prerender({ container }: {
        container: Container;
    }): void;
    /**
     * Updates the size of the yoga nodes for the containers that use pixi size
     * @param container - The container to update the size for
     */
    private _updateSize;
    /**
     * Updates the layout of the container and its children
     * @param container - The container to update the layout for
     */
    private updateLayout;
    /**
     * @ignore
     */
    destroy(): void;
}
