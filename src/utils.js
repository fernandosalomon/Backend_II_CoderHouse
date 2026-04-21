import path from "path";
import { fileURLToPath } from "url";

const __pathname = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__pathname);
