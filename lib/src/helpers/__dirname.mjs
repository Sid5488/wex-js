import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Get the current directory path of the module.
 * @type {string}
 */
const path = dirname(fileURLToPath(import.meta.url));

/**
 * Extract the root directory path up to 'src' from the current directory path.
 * @type {string}
 */
const [__dirname,] = path.split("\\src\\");

/**
 * Export the root directory path.
 * @returns {string} The root directory path.
 */
export { __dirname };
