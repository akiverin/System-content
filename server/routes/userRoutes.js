// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление пользователями
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получение списка пользователей
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список пользователей
 *       500:
 *         description: Ошибка сервера
 */
router.get("/", authMiddleware, getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получение пользователя по id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Данные пользователя
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */
router.get("/:id", authMiddleware, getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Обновление информации пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя для обновления
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               group:
 *                 type: string
 *     responses:
 *       200:
 *         description: Обновленные данные пользователя
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */
router.patch("/:id", authMiddleware, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Удаление пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя для удаления
 *     responses:
 *       200:
 *         description: Пользователь успешно удален
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
