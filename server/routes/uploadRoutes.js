import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const uploadToCloudinary = (
  fileBuffer,
  folder,
  allowedFormats = ["jpg", "png", "jpeg", "gif"],
  resourceType = "image"
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        allowed_formats: allowedFormats,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    // Читаем папку из query-параметров (если не передана, используем "others")
    const folder = req.query.folder || "others";
    if (!req.file) {
      return res.status(400).json({ message: "Изображение не выбрано" });
    }
    const uploadResult = await uploadToCloudinary(req.file.buffer, folder);
    res.json({ secure_url: uploadResult.secure_url });
  } catch (error) {
    console.error("Ошибка загрузки изображения:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
