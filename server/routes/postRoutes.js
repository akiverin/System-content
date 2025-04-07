import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  deletePostById,
  updatePostById,
} from "../controllers/postController.js";
const router = express.Router();
import authMiddleware from "../middleware/auth.js";

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Управление постами
 */

/**
 * @swagger
 * /api/posts/:
 *   patch:
 *     summary: Создание поста
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               image:
 *                 type: string
 *               author:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Данные созданного поста
 *       500:
 *         description: Ошибка сервера
 */
router.post("/", authMiddleware, createPost);

/**
 * @swagger
 * /api/posts/:
 *   get:
 *     summary: Получение списка постов
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список постов
 *       500:
 *         description: Ошибка сервера
 */
router.get("/", getPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Получение поста по id
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID поста
 *     responses:
 *       200:
 *         description: Данные поста
 *       404:
 *         description: Пост не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get("/:id", getPostById);

/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     summary: Обновление поста
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               image:
 *                 type: string
 *               author:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Обновленные данные поста
 *       404:
 *         description: Пост не найден
 *       500:
 *         description: Ошибка сервера
 */
router.patch("/:id", authMiddleware, updatePostById);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Удаление поста
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID поста для удаления
 *     responses:
 *       200:
 *         description: Пост успешно удален
 *       404:
 *         description: Пост не найден
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/:id", authMiddleware, deletePostById);

export default router;
