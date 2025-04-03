const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const uuid = require("uuid").v4;

const createUploader = (config) => {
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        // Используем uploadsDir из middleware сервера
        const uploadBasePath = req.isProduction
          ? process.env.UPLOADS_DIR || "/var/www/uploads"
          : path.join(__dirname, "..", "uploads");

        const tempDir = path.join(uploadBasePath, config.tempPath);

        // Создаем директорию если не существует
        await fs.mkdir(tempDir, { recursive: true });
        cb(null, tempDir);
      } catch (err) {
        cb(err);
      }
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
      cb(new Error(`Неподдерживаемый тип файла: ${file.mimetype}`));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: config.maxSize,
      files: 1, // Ограничение на 1 файл за запрос
    },
  });
};

module.exports = {
  avatarUpload: createUploader({
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    maxSize: 5 * 1024 * 1024, // 5MB
    tempPath: "temp/avatars", // Относительный путь от uploadsDir
  }),

  documentUpload: createUploader({
    allowedTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    maxSize: 20 * 1024 * 1024, // 20MB
    tempPath: "temp/documents",
  }),

  videoUpload: createUploader({
    allowedTypes: ["video/mp4", "video/quicktime"],
    maxSize: 500 * 1024 * 1024, // 500MB
    tempPath: "temp/videos",
  }),
};
