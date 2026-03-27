import { Container } from 'pixi.js';
import { LayoutView, LayoutViewOptions } from '../LayoutView';
export type ViewOptions = Omit<LayoutViewOptions, 'slot'>;
type BaseViewOptions = ViewOptions & {
    ClassType: new (...args: any[]) => Container;
};
export declare abstract class BaseView<T extends Container> extends LayoutView<T> {
    constructor(opts: BaseViewOptions);
}
export {};
