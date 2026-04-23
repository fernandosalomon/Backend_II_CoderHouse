import userModel from "../models/User.model.js";
import { hash_password } from "../utils.js";

export const registerNewUser = async (body) => {
  try {
    const { email, password, provider, role = "user" } = body;

    const user_exists = await userModel.find({ email }).lean();
    if (user_exists.length != 0) {
      return { status: "fail", message: "User already exists." };
    }

    console.log(password);
    const hash = hash_password(password);
    if (!hash) throw new Error("Error hashing password");

    const newUser = {
      email,
      password: hash,
      provider,
    };

    const createdUser = await userModel.create(newUser);

    return { status: "success", payload: createdUser };
  } catch (error) {
    return { status: "fail", message: `Error signing-up new user (${error})` };
  }
};
