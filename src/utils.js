import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __pathname = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__pathname);

export const hash_password = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};
