import express from "express";
const router = express.Router();
import {
  createGroup,
  getGroups,
  getGroupById,
  updateGroupById,
  deleteGroupById,
  addGroupMember,
  removeGroupMember,
} from "../controllers/groupController.js";
import authMiddleware from "../middleware/auth.js";

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Управление группами пользователей
 */

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Создание новой группы
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - members
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Разработчики"
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
 *     responses:
 *       201:
 *         description: Созданная группа
 *       400:
 *         description: Ошибка валидации
 *       403:
 *         description: Нет прав доступа
 *       500:
 *         description: Ошибка сервера
 */
router.post("/", authMiddleware, createGroup);

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Получение списка всех групп
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список групп
 *       500:
 *         description: Ошибка сервера
 */
router.get("/", authMiddleware, getGroups);

/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     summary: Получение группы по ID
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID группы
 *     responses:
 *       200:
 *         description: Данные группы
 *       404:
 *         description: Группа не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.get("/:id", authMiddleware, getGroupById);

/**
 * @swagger
 * /api/groups/{id}:
 *   patch:
 *     summary: Обновление информации о группе
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID группы
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Обновленные данные группы
 *       403:
 *         description: Нет прав для изменения
 *       404:
 *         description: Группа не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.patch("/:id", authMiddleware, updateGroupById);

/**
 * @swagger
 * /api/groups/{id}:
 *   delete:
 *     summary: Удаление группы
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID группы
 *     responses:
 *       200:
 *         description: Группа успешно удалена
 *       403:
 *         description: Нет прав для удаления
 *       404:
 *         description: Группа не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/:id", authMiddleware, deleteGroupById);

/**
 * @swagger
 * /api/groups/{id}/members:
 *   post:
 *     summary: Добавление участника в группу
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID группы
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID добавляемого пользователя
 *     responses:
 *       200:
 *         description: Обновленные данные группы
 *       403:
 *         description: Нет прав для добавления
 *       404:
 *         description: Группа не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.post("/:id/members", authMiddleware, addGroupMember);

/**
 * @swagger
 * /api/groups/{groupId}/members/{userId}:
 *   delete:
 *     summary: Удаление участника из группы
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID группы
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID удаляемого пользователя
 *     responses:
 *       200:
 *         description: Обновленные данные группы
 *       403:
 *         description: Нет прав для удаления
 *       404:
 *         description: Группа не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/:id/members/:userId", authMiddleware, removeGroupMember);

export default router;
