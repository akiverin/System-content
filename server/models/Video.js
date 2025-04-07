import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    // Название видео
    title: {
      type: String,
      required: true,
      comment: "Название видео",
    },
    // Описание видео
    desc: {
      type: String,
      required: true,
      comment: "Краткое описание видео",
    },
    // URL самого видео, загруженного через Cloudinary
    videoUrl: {
      type: String,
      required: true,
      comment: "Ссылка на видеофайл",
    },
    // Обложка видео (используем объект с данными Cloudinary)
    thumbnail: {
      public_id: { type: String },
      url: { type: String },
    },
    // Продолжительность видео в секундах или минутах (по договорённости)
    duration: {
      type: Number,
      min: 0,
      comment: "Продолжительность видео (в секундах)",
    },
    // Теги для поиска и фильтрации видео
    tags: {
      type: [String],
      default: [],
      comment: "Массив тегов для видео",
    },
    // Поле для определения доступа: массив id групп (ссылок на модель Group)
    access: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Group",
        },
      ],
      default: [],
      comment:
        "Список групп с доступом к видео (пустой массив = публичный доступ)",
    },
    // Ссылка на пользователя, загрузившего видео (автор)
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      comment: "Пользователь, загрузивший видео",
    },
  },
  {
    timestamps: true, // Добавляет поля createdAt и updatedAt
  }
);

const Video = mongoose.model("Video", VideoSchema);
export default Video;
