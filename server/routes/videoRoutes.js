import express from "express";
const router = express.Router();
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
import authMiddleware from "../middleware/auth.js";
import {
  createVideo,
  getVideos,
  getVideoById,
  updateVideoById,
  deleteVideoById,
  uploadVideoFile,
} from "../controllers/videoController.js";

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Управление видео материалами
 */

/**
 * @swagger
 * /api/videos:
 *   post:
 *     summary: Загрузка нового видео
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Обзор Node.js"
 *               desc:
 *                 type: string
 *                 example: "Подробный обзор возможностей Node.js"
 *               video:
 *                 type: string
 *                 format: binary
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *               duration:
 *                 type: number
 *                 example: 300
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["nodejs", "backend"]
 *               access:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["5eb16fcf9d5f3f1a64d42123"]
 *     responses:
 *       201:
 *         description: Видео успешно создано
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Не авторизован
 *       500:
 *         description: Ошибка сервера
 */
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createVideo
);

/**
 * @swagger
 * /api/videos:
 *   get:
 *     summary: Получение списка видео
 *     tags: [Videos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Количество элементов на странице
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Поисковая строка для названия видео
 *     responses:
 *       200:
 *         description: Список видео с пагинацией
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                 page:
 *                   type: number
 *                 pages:
 *                   type: number
 *                 videos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Video'
 *       500:
 *         description: Ошибка сервера
 */
router.get("/", getVideos);

/**
 * @swagger
 * /api/videos/{id}:
 *   get:
 *     summary: Получение видео по ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID видео
 *     responses:
 *       200:
 *         description: Данные видео
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       404:
 *         description: Видео не найдено
 *       500:
 *         description: Ошибка сервера
 */
router.get("/:id", authMiddleware, getVideoById);

/**
 * @swagger
 * /api/videos/{id}:
 *   patch:
 *     summary: Обновление видео
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID видео
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               video:
 *                 type: string
 *                 format: binary
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *               duration:
 *                 type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               access:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Обновленное видео
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав доступа
 *       404:
 *         description: Видео не найдено
 *       500:
 *         description: Ошибка сервера
 */
router.patch(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateVideoById
);

/**
 * @swagger
 * /api/videos/{id}:
 *   delete:
 *     summary: Удаление видео
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID видео
 *     responses:
 *       200:
 *         description: Видео успешно удалено
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав доступа
 *       404:
 *         description: Видео не найдено
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/:id", authMiddleware, deleteVideoById);

router.post(
  "/upload-video",
  upload.fields([{ name: "video" }]),
  uploadVideoFile
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         desc:
 *           type: string
 *         videoUrl:
 *           type: string
 *         thumbnail:
 *           type: object
 *           properties:
 *             public_id:
 *               type: string
 *             url:
 *               type: string
 *         duration:
 *           type: number
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         access:
 *           type: array
 *           items:
 *             type: string
 *         creator:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export default router;
