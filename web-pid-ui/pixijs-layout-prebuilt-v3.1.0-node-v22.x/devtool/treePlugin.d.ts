import { Container } from 'pixi.js';
import { TreeExtension } from '@pixi/devtools';
export interface DevtoolFlexContainer extends Container {
    __devtoolLayoutDefaults?: any;
}
export declare function hasDefaults(node: DevtoolFlexContainer): boolean;
export declare const treePlugin: TreeExtension;
