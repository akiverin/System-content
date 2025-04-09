import mongoose from "mongoose";

const ContentItemSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      required: true,
      min: 1,
      comment: "Порядковый номер материала в курсе",
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "content.resourceType",
      comment: "Ссылка на конкретный ресурс",
    },
    resourceType: {
      type: String,
      required: true,
      enum: ["Video", "Post", "Document"],
      comment: "Модель связанного ресурса",
    },
    duration: {
      type: Number,
      min: 0,
      comment: "Продолжительность в минутах",
    },
  },
  { _id: false }
);

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  content: {
    type: [ContentItemSchema],
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  access: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
    comment: "Группы с доступом (пустой массив = публичный доступ)",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: { public_id: String, url: String },
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;
