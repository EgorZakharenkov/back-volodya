import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";
export const create = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const doc = new PostModel({
      title,
      description,
      image,
      comments: [],
    });
    const post = await doc.save();
    res.json({
      post,
    });
  } catch (e) {
    console.log("Не удалось создать пост");
  }
};
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json({
      posts,
    });
  } catch (e) {
    console.log("Не удалось вернуть посты");
  }
};
export const getOne = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id).populate({
      path: "comments",
      populate: {
        path: "author",
        model: "User", // Замените 'UserModel' на название вашей модели пользователя
      },
    });
    res.json(post);
  } catch (e) {
    console.log("Не удалось вернуть пост");
  }
};
export const update = async (req, res) => {
  const { title, description, image } = req.body;
  try {
    await PostModel.findByIdAndUpdate(req.params.id, {
      title,
      description,
      image,
    });
    res.json({
      message: "Успешно",
    });
  } catch (e) {
    console.log("Не удалось изменить посты");
  }
};
export const remove = async (req, res) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);
    res.json({
      message: "Удалено",
    });
  } catch (e) {
    console.log("Не удалось удалить посты");
  }
};

export const createComment = async (req, res) => {
  try {
    const newComment = new CommentModel({
      text: req.body.text, // Текст комментария из запроса
      author: req.body.author, // Идентификатор автора комментария из запроса
    });
    const savedComment = await newComment.save();
    const post = await PostModel.findById(req.params.id);
    post.comments.push(savedComment._id);
    await post.save();
    res.status(201).json(savedComment);
  } catch (e) {
    console.log("Не удалось оставить коментарий");
  }
};
