import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user", "guest"],
    default: "user",
  },
  provider: {
    type: String,
    enum: ["local", "github", "google"],
  },
});

const userModel = new mongoose.model("User", userSchema);

export default userModel;
