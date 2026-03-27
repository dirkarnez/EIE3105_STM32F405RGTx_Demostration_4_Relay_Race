import { YogaStyles } from '../core/style/yogaStyles';
/**
 * Tagged template literal function for Tailwind-like styling in PixiJS Layout
 * Converts Tailwind-style class strings into PixiJS Layout style objects
 *
 * @param template - Template string array
 * @param templateElements - Dynamic values to interpolate
 * @returns YogaStyles object
 *
 * @example
 * // Basic usage
 * const styles = tw`p-4 m-2 flex-row items-center`;
 *
 * // With dynamic values
 * const padding = 4;
 * const styles = tw`p-${padding} flex-row`;
 *
 * // Using with PixiJS Layout
 * <container layout={tw`p-4 flex-row items-center justify-between`}>
 *   <sprite layout={tw`w-full h-20`} />
 * </container>
 */
export declare function tw(template: TemplateStringsArray, ...templateElements: any[]): YogaStyles;
