import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
});

export default mongoose.model("Hero", heroSchema);
