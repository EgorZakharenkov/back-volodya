import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ссылка на модель пользователя
  },
  createdAt: {
    type: Date,
    default: Date.now, // Дата создания комментария
  },
});

// Создание модели комментария
export default mongoose.model("Comment", commentSchema);
