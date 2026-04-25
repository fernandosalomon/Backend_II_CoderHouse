import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __pathname = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__pathname);

export const create_hash = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const validate_password = (password, hash) => bcrypt.compareSync(password, hash);