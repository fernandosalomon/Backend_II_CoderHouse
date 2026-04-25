import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "guest"],
    default: "user",
  },
  provider: {
    type: String,
    enum: ["local", "github", "google"],
    required: true,
  },
});

const userModel = new mongoose.model("User", userSchema);

export default userModel;
