import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.routes.js";
import dotenv from "dotenv";
import connectDB from "./config/mongoDB.config.js";
import usersRouter from "./routes/users.routes.js";
dotenv.config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./views"));

app.use("/", viewsRouter);
app.use("/api/v1/auth", usersRouter);

connectDB();

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
