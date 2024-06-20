import CommentModel from "../models/Comment.js";

export const create = async (req, res) => {
  const { text, author } = req.body;
  try {
    const comment = new CommentModel({
      text,
      author,
    });
    res.json({
      comment,
    });
  } catch (e) {
    console.log("Не удалось создать комент");
  }
};
export const getAll = async () => {};
export const getOne = async () => {};
export const update = async () => {};
export const remove = async (req, res) => {
  try {
    await CommentModel.findByIdAndDelete(req.params.id);
    res.json({
      message: "Успешно удалили",
    });
  } catch (e) {
    console.log("Не удалось удалить комент");
  }
};
