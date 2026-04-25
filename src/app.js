import express from "express";
import handlebars from "express-handlebars";
import session from 'express-session';
import cookieParser from "cookie-parser";
import MongoStore from 'connect-mongo';
import path from "path";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.routes.js";
import dotenv from "dotenv";
import connectDB from "./config/mongoDB.config.js";
import usersRouter from "./routes/users.routes.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
dotenv.config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 180,
  }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true,

}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.COOKIE_SECRET))

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./views"));

app.use("/", viewsRouter);
app.use("/api/v1/auth", usersRouter);

connectDB();

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
