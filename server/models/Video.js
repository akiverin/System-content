import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    image: {
      public_id: { type: String },
      url: { type: String },
    },
    duration: {
      type: Number,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    access: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Group",
        },
      ],
      default: [],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);
export default Video;
