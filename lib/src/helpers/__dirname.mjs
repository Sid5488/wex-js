import { dirname } from 'path';
import { fileURLToPath } from 'url';

const path = dirname(fileURLToPath(import.meta.url));
const [__dirname,] = path.split("\\src\\");

export { __dirname };
