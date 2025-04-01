const Course = require("../models/Course");

// Получение всех курсов с пагинацией и фильтрацией
exports.getCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } },
      ];
    }

    const courses = await Course.find(filter)
      .populate("creator", "-password")
      .populate("access", "name")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Course.countDocuments(filter);

    res.json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      courses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение курса по ID с полной информацией
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("creator", "-password")
      .populate("access", "name")
      .populate({
        path: "content.resourceId",
        select: "title duration", // Пример полей для связанных ресурсов
        // options: { sort: { order: 1 } },
      });

    if (!course) {
      return res.status(404).json({ message: "Курс не найден" });
    }

    // Проверка доступа
    if (!course.access.length && req.user.role !== "admin") {
      return res.status(403).json({ message: "Доступ запрещен" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создание нового курса
exports.createCourse = async (req, res) => {
  try {
    const { title, desc, content, tags, access, image } = req.body;

    const newCourse = new Course({
      title,
      desc,
      content: content.map((item) => ({
        ...item,
        resourceId: item.resourceId,
        resourceType: item.resourceType,
        order: parseInt(item.order),
        duration: parseInt(item.duration) || 0,
      })),
      tags: tags.filter((t, i, a) => a.indexOf(t) === i).slice(0, 10),
      access,
      image: image || null,
      creator: req.user.id,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Обновление курса
exports.updateCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Курс не найден" });
    }

    // Проверка прав доступа
    if (req.user.role !== "admin" && !course.creator.equals(req.user.id)) {
      return res.status(403).json({ message: "Нет прав на редактирование" });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "title",
      "desc",
      "content",
      "tags",
      "access",
      "image",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res
        .status(400)
        .json({ error: "Недопустимые поля для обновления" });
    }

    // Специальная обработка контента
    if (req.body.content) {
      course.content = req.body.content.map((item) => ({
        ...item,
        order: parseInt(item.order),
        duration: parseInt(item.duration) || 0,
      }));
    }

    // Обновление остальных полей
    updates.forEach((update) => {
      if (update !== "content") {
        course[update] = req.body[update];
      }
    });

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Удаление курса
exports.deleteCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Курс не найден" });
    }

    if (req.user.role !== "admin" && !course.creator.equals(req.user.id)) {
      return res.status(403).json({ message: "Нет прав на удаление" });
    }

    await course.deleteOne();
    res.json({ message: "Курс успешно удален" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
