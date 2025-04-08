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
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);
export default Video;
