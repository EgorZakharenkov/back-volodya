import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { checkAuth } from "./utlis/index.js";

import {
  UserController,
  HeroController,
  PostController,
  CommentController,
} from "./controllers/index.js";
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://volodya:wwwwww@volodyadiplom.dtejqyq.mongodb.net/?retryWrites=true&w=majority&appName=VolodyaDiplom",
  )
  .then(() => {
    console.log("Db ok.............");
  })
  .catch((err) => {
    console.log("db no.............");
    console.log(err);
  });

app.listen(4444 || process.env.PORT, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log("Server ok");
  }
});

// AUTH-------------------------------------------------------

app.post("/auth/login", UserController.login);

app.post("/auth/register", UserController.register);

app.get("/auth/me", checkAuth, UserController.getMe);

// Post----------------------------------------------------------------

app.post("/post", PostController.create);
app.get("/post", PostController.getAll);
app.get("/post/:id", PostController.getOne);
app.put("/post/:id", PostController.update);
app.delete("/post/:id", PostController.remove);
app.put("/post/:id/comment", PostController.createComment);

// Comment---------------------------------------------------------------

app.post("/comment", CommentController.create);
app.delete("/comment/:id", CommentController.remove);

// Hero----------------------------------------------------------------------

app.post("/hero", HeroController.create);
app.get("/hero", HeroController.getAll);
app.get("/hero/:id", HeroController.getOne);
app.put("/hero/:id", HeroController.update);
app.delete("/hero/:id", HeroController.remove);
