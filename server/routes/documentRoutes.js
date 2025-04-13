import express from "express";
const router = express.Router();
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
import {
  createDocument,
  getDocuments,
  updateDocumentById,
  deleteDocumentById,
  uploadDocumentFile,
} from "../controllers/documentController.js";
import authMiddleware from "../middleware/auth.js";

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Управление документами и файлами
 */

/**
 * @swagger
 * /api/documents:
 *   post:
 *     summary: Загрузка нового документа
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - desc
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Техническое задание"
 *                 minLength: 5
 *                 maxLength: 120
 *               desc:
 *                 type: string
 *                 example: "Финальная версия ТЗ проекта"
 *                 minLength: 10
 *                 maxLength: 500
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   Поддерживаемые форматы:
 *                   - PDF (application/pdf)
 *                   - DOC/DOCX (application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document)
 *                   - TXT (text/plain)
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Изображение JPEG/PNG (макс. 5MB)
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "техзадание"
 *               access:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                   example: "65a1c381c8d1217e0a7b3e15"
 *     responses:
 *       201:
 *         description: Документ успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       400:
 *         description: |
 *           Ошибки валидации:
 *           - Неверный формат файла
 *           - Отсутствует обязательное поле
 *           - Превышен размер файла
 *       401:
 *         description: Требуется аутентификация
 *       403:
 *         description: Недостаточно прав для выполнения операции
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "document", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createDocument
);
/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Получение списка документов с пагинацией
 *     tags: [Documents]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Поиск по названию и описанию
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Количество элементов на странице
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [pdf, doc, docx, txt, other]
 *         description: Фильтрация по формату файла
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pages:
 *                   type: integer
 *                   example: 10
 *                 documents:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Document'
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get("/", getDocuments);

/**
 * @swagger
 * /api/documents/{id}:
 *   patch:
 *     summary: Обновление документа
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 65a1c381c8d1217e0a7b3e15
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 120
 *               desc:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 500
 *               document:
 *                 type: string
 *                 format: binary
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               access:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *     responses:
 *       200:
 *         description: Обновленный документ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       400:
 *         description: Неверный запрос
 *       404:
 *         description: Документ не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.patch(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "document", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateDocumentById
);
/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     summary: Удаление документа
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Документ успешно удален
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Документ успешно удален"
 *       403:
 *         description: Нет прав для удаления
 *       404:
 *         description: Документ не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.delete("/:id", authMiddleware, deleteDocumentById);

router.post(
  "/upload-document",
  upload.fields([{ name: "document" }]),
  uploadDocumentFile
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       required:
 *         - title
 *         - desc
 *         - fileUrl
 *         - creator
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           example: 65a1c381c8d1217e0a7b3e15
 *         title:
 *           type: string
 *           minLength: 5
 *           maxLength: 120
 *           example: "Техническая документация"
 *         desc:
 *           type: string
 *           minLength: 10
 *           maxLength: 500
 *           example: "Полное техническое описание системы"
 *         fileUrl:
 *           type: string
 *           format: uri
 *           example: "https://res.cloudinary.com/example/raw/upload/v123/document.pdf"
 *         format:
 *           type: string
 *           enum: [pdf, doc, docx, txt, other]
 *           example: "pdf"
 *         image:
 *           type: object
 *           properties:
 *             public_id:
 *               type: string
 *               example: "thumbnails/xyz123"
 *             url:
 *               type: string
 *               format: uri
 *               example: "https://res.cloudinary.com/example/image/upload/v123/thumbnail.jpg"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             example: "техдокументация"
 *         access:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *             example: "65a1c381c8d1217e0a7b3e15"
 *         creator:
 *           type: string
 *           format: uuid
 *           example: "65a1c381c8d1217e0a7b3e15"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-12T14:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-12T14:35:00Z"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export default router;
