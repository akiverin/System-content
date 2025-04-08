import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: [20, "Название не может быть длиннее 20 символов"],
  },
});

const Tag = mongoose.model("Tag", TagSchema);
export default Tag;
