import Document from "../models/Document.js";
import cloudinary from "../config/cloudinary.js";

const documentFormats = ["pdf", "doc", "docx", "txt"]; // Поддерживаемые форматы
const allowedExtensions = documentFormats.map((f) => f.toUpperCase());

const uploadToCloudinary = (
  fileBuffer,
  folder,
  allowedFormats = allowedExtensions,
  resourceType = "raw"
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

export const createDocument = async (req, res) => {
  try {
    const { title, desc, access } = req.body;

    if (!["admin", "teacher"].includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Нет прав на создание документа" });
    }

    let fileUploadResult;
    if (req.files?.document?.[0]) {
      const file = req.files.document[0];

      const fileExtension = file.originalname.split(".").pop().toLowerCase();
      const format = documentFormats.includes(fileExtension)
        ? fileExtension
        : "other";
      fileUploadResult = await uploadToCloudinary(
        file.buffer,
        "documents",
        allowedExtensions
      );
      fileUploadResult.format = format;
    } else if (!req.body.fileUrl) {
      return res.status(400).json({
        message: "Необходимо загрузить файл или предоставить URL",
      });
    }

    // Создание документа
    const newDocument = new Document({
      title,
      desc,
      fileUrl: fileUploadResult?.secure_url || req.body.fileUrl,
      format: fileUploadResult?.format || "other",
      access: access ? (Array.isArray(access) ? access : [access]) : [],
      creator: req.user.id,
    });

    const savedDocument = await newDocument.save();
    const populatedDoc = await Document.findById(savedDocument._id)
      .populate("creator", "-password")
      .populate("access");

    res.status(201).json(populatedDoc);
  } catch (error) {
    console.error("Document creation error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const filter = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } },
      ],
    };

    const total = await Document.countDocuments(filter);
    const documents = await Document.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("access")
      .populate("creator", "-password");

    res.json({
      documents,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document)
      return res.status(404).json({ message: "Документ не найден" });

    if (
      document.creator.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Нет прав для обновления" });
    }

    if (req.files?.document?.[0]) {
      if (document.fileUrl) {
        await cloudinary.uploader.destroy(document.filePublicId);
      }

      const uploadResult = await uploadToCloudinary(
        req.files.document[0].buffer,
        "documents"
      );

      req.body.fileUrl = uploadResult.secure_url;
      req.body.filePublicId = uploadResult.public_id;
    }

    // Обновление полей
    const updatableFields = ["title", "desc", "access", "fileUrl"];
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        document[field] = req.body[field];
      }
    });

    const updatedDoc = await document.save();
    res.json(updatedDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document)
      return res.status(404).json({ message: "Документ не найден" });

    // Проверка прав
    if (
      document.creator.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Нет прав для удаления" });
    }

    // Удаление файлов
    if (document.filePublicId) {
      await cloudinary.uploader.destroy(document.filePublicId, {
        resource_type: "raw",
      });
    }

    if (document.image?.public_id) {
      await cloudinary.uploader.destroy(document.image.public_id);
    }

    await document.deleteOne();
    res.json({ message: "Документ успешно удален" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
