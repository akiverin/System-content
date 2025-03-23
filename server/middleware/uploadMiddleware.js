const multer = require("multer");
const path = require("path");
const uuid = require("uuid").v4;

const createUploader = (config) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, config.tempPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuid()}${ext}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (config.allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Неподдерживаемый тип файла: ${file.mimetype}`), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: config.maxSize },
  });
};

module.exports = {
  avatarUpload: createUploader({
    allowedTypes: ["image/jpeg", "image/png", "image/gif"],
    maxSize: 5 * 1024 * 1024, // 5MB
    tempPath: "uploads/temp/avatars",
  }),

  documentUpload: createUploader({
    allowedTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    maxSize: 20 * 1024 * 1024, // 20MB
    tempPath: "uploads/temp/documents",
  }),

  videoUpload: createUploader({
    allowedTypes: ["video/mp4", "video/quicktime"],
    maxSize: 500 * 1024 * 1024, // 500MB
    tempPath: "uploads/temp/videos",
  }),
};
