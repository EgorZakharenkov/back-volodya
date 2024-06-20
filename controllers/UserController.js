import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const Hash = await bcrypt.hash(req.body.password, salt);
    const doc = new UserModel({
      email: req.body.email,
      password: Hash,
    });
    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },

      "secret123",
      {
        expiresIn: "30d",
      },
    );
    const { password, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.json({
        message: "Такого пользователя нет",
      });
    }
    const { password, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "нет доступа",
    });
  }
};
export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(403).json({
        message: "Пользователь не найден",
      });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.password,
    );

    if (!isValidPassword) {
      return res.status(403).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },

      "secret123",
      {
        expiresIn: "60d",
      },
    );

    const { password, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Ошибка входа",
    });
  }
};
