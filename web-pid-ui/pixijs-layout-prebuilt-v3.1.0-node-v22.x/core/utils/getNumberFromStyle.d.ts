import { NumberValue, PositionKeyword } from '../types';
/**
 * Converts a style value to a number. If the value is a percentage string,
 * it calculates the number based on the given size.
 *
 * @param value - The style value to convert. It can be a number or a percentage string (e.g., '50%').
 * @param size - The size to use for percentage calculations.
 * @returns The numeric value. If the input is a percentage string, it returns the calculated number based on the size.
 *          If the input is a number, it returns the number itself. If the input is neither, it returns 0.
 */
export declare function getNumberFromStyle(value: NumberValue, size?: number): number;
/**
 * Determines the type of a style value.
 *
 * @param value - The style value to check.
 * @returns The type of the style value. It can be 'number', 'percentage', or 'keyword'.
 */
export declare function getTypeFromStyle(value: NumberValue | PositionKeyword): 'number' | 'percentage' | 'keyword';
