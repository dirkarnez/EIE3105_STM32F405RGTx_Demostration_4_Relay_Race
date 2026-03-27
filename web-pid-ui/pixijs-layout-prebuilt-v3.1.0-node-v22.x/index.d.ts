export * from './core/debug/DebugRenderer';
export * from './core/Layout';
export * from './core/LayoutSystem';
export * from './core/style/applyStyle';
export * from './core/style/formatStyles';
export * from './core/utils/getNumberFromStyle';
export * from './core/utils/getPixiSize';
export * from './core/utils/nearlyEqual';
export * from './core/utils/sort-children';
export * from './core/style/layoutStyles';
export * from './core/style/yogaStyles';
export * from './core/types';
export * from './yoga';
declare global {
    namespace PixiMixins {
        interface Container {
            _layout: import('./core/Layout').Layout | null;
            get layout(): import('./core/Layout').Layout | null;
            set layout(value: Omit<import('./core/Layout').LayoutOptions, 'target'> | null | boolean);
            onLayout(value: import('./core/Layout').Layout): void;
            computeLayoutData(computedLayout: import('./core/types').ComputedLayout): import('./core/types').ComputedPixiLayout;
            updateLocalTransformWithLayout: () => void;
        }
        interface ContainerEvents {
            layout: [event: import('./core/Layout').Layout];
        }
        interface ContainerOptions {
            layout?: Omit<import('./core/Layout').LayoutOptions, 'target'> | null | boolean;
        }
        interface RendererSystems {
            layout: import('./core/LayoutSystem').LayoutSystem;
        }
        interface RendererOptions {
            layout?: import('./core/LayoutSystem').LayoutSystemOptions;
        }
    }
}
