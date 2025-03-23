const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateAvatar,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/uploadMiddleware");

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
router.patch("/:id", upload.avatarUpload.single("avatar"), updateUser);

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

/**
 * @swagger
 * /api/users/avatar:
 *   put:
 *     summary: Обновление аватара пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: avatar
 *         type: file
 *         description: Файл изображения для аватара
 *         required: true
 *     responses:
 *       200:
 *         description: Аватар успешно обновлён
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatar:
 *                   type: string
 *                   example: "uploads/avatars/3c3d3f3e-4f4a-4b4d-8e8d-9d9c8b7a6e5f.jpg"
 *                 message:
 *                   type: string
 *                   example: "Аватар успешно обновлён"
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Файл не был загружен"
 *       401:
 *         description: Пользователь не авторизован
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка при обновлении аватара"
 */
router.put(
  "/avatar",
  authMiddleware,
  upload.avatarUpload.single("avatar"),
  updateAvatar
);

module.exports = router;
