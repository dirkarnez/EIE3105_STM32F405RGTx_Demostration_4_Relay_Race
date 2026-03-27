import { Config, loadYoga } from 'yoga-layout/load';
export type Yoga = Awaited<ReturnType<typeof loadYoga>>;
/**
 * Get the Yoga instance.
 * Yoga is a dynamically loaded module, so it is not available until it is loaded.
 */
export declare function getYoga(): Yoga;
/**
 * Set the Yoga instance.
 * @param newYoga The Yoga instance.
 */
export declare function setYoga(newYoga: Yoga): void;
/**
 * Set the Yoga configuration.
 *
 * @param config The Yoga configuration.
 */
export declare function setYogaConfig(config: Config): void;
/**
 * Get the Yoga configuration.
 *
 * @returns The Yoga configuration.
 */
export declare function getYogaConfig(): Config;
