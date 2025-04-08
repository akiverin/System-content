import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      comment: "Название документа",
    },
    desc: {
      type: String,
      required: true,
      comment: "Краткое описание документа",
    },
    fileUrl: {
      type: String,
      required: true,
      comment: "Ссылка на файл документа",
    },
    format: {
      type: String,
      required: true,
      enum: ["pdf", "doc", "docx", "txt", "other"],
      default: "pdf",
    },
    access: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Group",
        },
      ],
      default: [],
      comment: "Список групп с доступом к документу",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      comment: "Пользователь, загрузивший документ",
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", DocumentSchema);
export default Document;
