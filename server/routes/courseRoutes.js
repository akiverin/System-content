const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourseById,
  updateCourseById,
} = require("../controllers/courseController");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Управление учебными курсами
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Создание нового курса
 *     tags: [Courses]
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
 *                 example: "Основы Node.js"
 *               desc:
 *                 type: string
 *                 example: "Полный курс по основам Node.js"
 *               image:
 *                 type: string
 *                 format: binary
 *               content:
 *                 type: string
 *                 description: JSON-массив элементов контента
 *                 example: '[{"order":1,"resourceType":"Video","resourceId":"507f1f77bcf86cd799439011","duration":45}]'
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["programming", "backend"]
 *               access:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["5eb16fcf9d5f3f1a64d42123"]
 *     responses:
 *       201:
 *         description: Созданный курс
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав доступа
 *       500:
 *         description: Ошибка сервера
 */
router.post("/", authMiddleware, upload.single("image"), createCourse);

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Получение списка курсов
 *     tags: [Courses]
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
 *         description: Поисковая строка
 *     responses:
 *       200:
 *         description: Список курсов с пагинацией
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPages:
 *                   type: number
 *                 currentPage:
 *                   type: number
 *                 courses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *       500:
 *         description: Ошибка сервера
 */
router.get("/", getCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Получение курса по ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID курса
 *     responses:
 *       200:
 *         description: Данные курса
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Курс не найден
 *       403:
 *         description: Нет доступа
 *       500:
 *         description: Ошибка сервера
 */
router.get("/:id", authMiddleware, getCourseById);

/**
 * @swagger
 * /api/courses/{id}:
 *   patch:
 *     summary: Обновление курса
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID курса
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
 *               image:
 *                 type: string
 *                 format: binary
 *               content:
 *                 type: string
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
 *         description: Обновленный курс
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав доступа
 *       404:
 *         description: Курс не найден
 *       500:
 *         description: Ошибка сервера
 */
router.patch("/:id", authMiddleware, upload.single("image"), updateCourseById);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Удаление курса
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID курса
 *     responses:
 *       200:
 *         description: Курс успешно удален
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав доступа
 *       404:
 *         description: Курс не найден
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/:id", authMiddleware, deleteCourseById);

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         desc:
 *           type: string
 *         content:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ContentItem'
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
 *         image:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ContentItem:
 *       type: object
 *       properties:
 *         order:
 *           type: number
 *         resourceType:
 *           type: string
 *           enum: [Video, Post, Doc]
 *         resourceId:
 *           type: string
 *         duration:
 *           type: number
 */

module.exports = router;
