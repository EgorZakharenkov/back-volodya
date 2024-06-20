import HeroModel from "../models/Hero.js";

export const create = async (req, res) => {
  try {
    const { fullName, description, image } = req.body;
    const doc = new HeroModel({
      fullName,
      description,
      image,
    });
    const hero = await doc.save();
    res.json({
      hero,
    });
  } catch (e) {
    console.log("НЕ удалось создать героя ");
  }
};
export const getAll = async (req, res) => {
  try {
    const heroes = await HeroModel.find();
    res.json({
      heroes,
    });
  } catch (e) {
    console.log("Не удалось вернуть все записи");
  }
};
export const getOne = async (req, res) => {
  try {
    const hero = await HeroModel.findById(req.params.id);
    if (!hero) {
      console.log("Такой записи нет");
    }
    res.json({
      hero,
    });
  } catch (e) {
    console.log("Не удалось вернуть запись");
  }
};
export const update = async (req, res) => {
  const { fullName, description, image } = req.body;
  try {
    await HeroModel.findByIdAndUpdate(req.params.id, {
      fullName,
      description,
      image,
    });
    res.json({
      message: "Успешно обновили запись",
    });
  } catch (e) {
    console.log("Не удалось обновить запись");
  }
};
export const remove = async (req, res) => {
  try {
    await HeroModel.findByIdAndDelete(req.params.id);
    res.json({
      message: "Удалили",
    });
  } catch (e) {
    console.log("не удалось удалить запись");
  }
};
