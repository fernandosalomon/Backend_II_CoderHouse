import express from "express";
import { registerNewUser } from "../controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res) => {
  try {
    const response = await registerNewUser(req.body);
    if (!response) throw new Error();
    res.status(201).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: "fail", message: `Internal server error (${error})` });
  }
});

export default usersRouter;
