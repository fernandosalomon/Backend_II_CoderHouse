import express from "express";
import passport from "passport";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  passport.authenticate("localRegister", { failureRedirect: "/api/v1/auth/fail-register"}),
 (req, res) => {
    res
      .status(201)
      .json({ status: "success", message: "Usuario registrado con éxito" });
 }
);

usersRouter.post("/login", passport.authenticate("localLogin", {failureRedirect: "/api/v1/auth/fail-login"}), (req, res) => {
  const user = req.user;

  if (!user)
    return res
      .status(400)
      .json({ status: "fail", message: "Credenciales inválidas" });

  req.session.user = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
  };

  res.status(200).json({ status: "success", message: "Credenciales válidas" });
});

usersRouter.get("/fail-register", (req, res) => {
  res.status(401).json({status: "fail", message: "Error al registrar al usuario"});
})

usersRouter.get("/fail-login", (req, res) => {
  res
    .status(401)
    .json({ status: "fail", message: "Error al iniciar sesión" });
});

export default usersRouter;
