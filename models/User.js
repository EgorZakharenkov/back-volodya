import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Уникальное значение email
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Возможные значения роли
    default: "user", // Значение по умолчанию
  },
});

export default mongoose.model("User", userSchema);
