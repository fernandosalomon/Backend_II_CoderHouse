import express from "express";

const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
  res.render("home");
});

viewsRouter.get("/login", (req, res) => {
  res.render("login");
});

viewsRouter.get("/register", (req, res) => {
  res.render("register");
});

export default viewsRouter;
