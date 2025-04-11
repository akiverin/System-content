import Course from "../models/Course.js";
import Group from "../models/Group.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import Video from "../models/Video.js";
import Post from "../models/Post.js";
import Document from "../models/Document.js";

export const getCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const filter = {};
    let accessFilter = {};
    let user = null;

    // 1. Попытка получить пользователя из токена (без блокировки запроса)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        user = await User.findById(decoded.id).select("role");

        // Добавляем группы пользователя только если он не админ
        if (user.role !== "admin") {
          const userGroups = await Group.find({ members: user._id }).select(
            "_id"
          );
          user.groupIds = userGroups.map((g) => g._id);
        }
      } catch (error) {
        // Невалидный токен игнорируем, user остается null
      }
    }

    // 2. Построение фильтра доступа
    if (user?.role === "admin") {
      // Администраторы видят все курсы
    } else if (user) {
      // Авторизованные пользователи (не админы)
      accessFilter = {
        $or: [
          { access: { $size: 0 } }, // Доступ для всех
          { access: { $in: user.groupIds } }, // Доступ по группам
        ],
      };
    } else {
      // Неавторизованные пользователи
      accessFilter = { access: { $size: 0 } };
    }

    // 3. Добавляем поисковый фильтр
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } },
      ];
    }

    // 4. Объединяем фильтры
    const finalFilter =
      Object.keys(filter).length > 0
        ? { $and: [filter, accessFilter] }
        : accessFilter;

    // 5. Выполнение запроса
    const courses = await Course.find(finalFilter)
      .populate("creator", "-password")
      .populate("tags")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Course.countDocuments(finalFilter);
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
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("creator", "-password")
      .populate("tags")
      .populate({
        path: "content.resourceId",
        select: "title duration desc",
      });

    if (!course) {
      return res.status(404).json({ message: "Курс не найден" });
    }

    // Проверка доступа
    if (req.user.role !== "admin") {
      // Если access не пуст - проверяем группы
      if (course.access.length > 0) {
        const userGroups = await Group.find({
          _id: { $in: course.access.map((g) => g._id) },
          members: req.user.id,
        }).countDocuments();

        if (userGroups === 0) {
          return res.status(403).json({ message: "Доступ запрещен" });
        }
      }
      // Если access пуст - доступ разрешен автоматически
    }
    // Параллельное получение связанных материалов (с проверкой, что поле course совпадает с courseId)
    const [videos, posts, documents] = await Promise.all([
      Video.find({ course: courseId })
        .select("title desc duration courseOrder")
        .lean(),
      Post.find({ course: courseId })
        .select("title desc text courseOrder")
        .lean(),
      Document.find({ course: courseId })
        .select("title desc fileUrl format courseOrder")
        .lean(),
    ]);

    // Добавляем к каждому объекту тип ресурса для дальнейшей идентификации
    const formattedVideos = videos.map((item) => ({
      ...item,
      resourceType: "Video",
    }));
    const formattedPosts = posts.map((item) => ({
      ...item,
      resourceType: "Post",
    }));
    const formattedDocuments = documents.map((item) => ({
      ...item,
      resourceType: "Document",
    }));

    // Объединяем все материалы в один массив
    let content = [
      ...formattedVideos,
      ...formattedPosts,
      ...formattedDocuments,
    ];

    // Сортировка по полю courseOrder (если курс привязан, то это значение должно быть числом, иначе — помещается в конец)
    content.sort((a, b) => {
      const orderA = a.courseOrder || Number.MAX_SAFE_INTEGER;
      const orderB = b.courseOrder || Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });

    // Для вывода добавляем новое поле content, не влияющее на данные в БД
    const courseObj = course.toObject();
    courseObj.content = content;

    res.json(courseObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создание нового курса
export const createCourse = async (req, res) => {
  try {
    const { title, desc, content, tags, access } = req.body;
    let imageData;
    // Обработка изображения
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "courses",
            allowed_formats: ["jpg", "png", "jpeg", "gif"],
            transformation: [{ width: 800, height: 500, crop: "limit" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      imageData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    console.log(
      title,
      desc,
      content,
      tags ? tags.filter((t, i, a) => a.indexOf(t) === i).slice(0, 10) : [],
      imageData,
      req.user.id
    );

    // Валидация и создание курса
    const newCourse = new Course({
      title,
      desc,
      // content: content
      //   ? content.map((item) => ({
      //       ...item,
      //       resourceId: item.resourceId,
      //       resourceType: item.resourceType,
      //       order: parseInt(item.order),
      //       duration: parseInt(item.duration) || 0,
      //     }))
      //   : [],
      tags: tags
        ? tags.filter((t, i, a) => a.indexOf(t) === i).slice(0, 10)
        : [],
      access,
      image: imageData
        ? {
            public_id: imageData.public_id,
            url: imageData.url,
          }
        : undefined,
      creator: req.user.id,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: error.errors,
    });
  }
};

// Обновление курса
export const updateCourseById = async (req, res) => {
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
export const deleteCourseById = async (req, res) => {
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
