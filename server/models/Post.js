import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  text: { type: String, required: true },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    public_id: String,
    url: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    default: null,
    comment: "Курс, к которому относится видео (не обязательное)",
  },
  courseOrder: {
    type: Number,
    min: 1,
    default: null,
    comment: "Порядок видео в курсе, задаваемый администратором",
  },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
