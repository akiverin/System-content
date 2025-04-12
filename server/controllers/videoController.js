import Video from "../models/Video.js";
import cloudinary from "../config/cloudinary.js";

/**
 * Helper: Загружает файл в Cloudinary с использованием upload_stream.
 * @param {Buffer} fileBuffer - Буфер файла для загрузки.
 * @param {String} folder - Название папки в Cloudinary.
 * @param {Array} allowedFormats - Допустимые форматы файлов.
 * @returns {Promise<Object>} - Результат загрузки.
 */
const uploadToCloudinary = (
  fileBuffer,
  folder,
  allowedFormats = ["mp4", "mov", "avi", "mkv"],
  resourceType = "video" // Добавляем параметр типа ресурса
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        allowed_formats: allowedFormats,
        resource_type: resourceType, // Явно указываем тип контента
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Создание нового видео.
 * Загружает видео и (опционально) обложку через Cloudinary.
 */
export const createVideo = async (req, res) => {
  try {
    const { title, desc, duration, tags, access } = req.body;
    if ((req.user.role !== "admin") & (req.user.role !== "teacher")) {
      return res.status(403).json({ message: "Нет прав на создание видео" });
    }
    // Обработка загрузки видео файла через Cloudinary
    let videoUploadResult;
    if (req.files && req.files.video && req.files.video.length > 0) {
      videoUploadResult = await uploadToCloudinary(
        req.files.video[0].buffer,
        "videos",
        ["mp4", "mov", "avi", "mkv"]
      );
    } else if (!req.body.videoUrl) {
      return res.status(400).json({
        message: "Необходимо загрузить видео файл или предоставить URL",
      });
    }

    // Обработка загрузки обложки (thumbnail), если предоставлена
    let thumbnailUploadResult;
    if (req.files && req.files.thumbnail && req.files.thumbnail.length > 0) {
      thumbnailUploadResult = await uploadToCloudinary(
        req.files.thumbnail[0].buffer,
        "thumbnails",
        ["jpg", "png", "jpeg", "gif"],
        "image"
      );
    }

    // Создание записи о видео в базе данных
    const newVideo = new Video({
      title,
      desc,
      videoUrl: videoUploadResult
        ? videoUploadResult.secure_url
        : req.body.videoUrl,
      duration: duration || 0, // Добавляем значение по умолчанию
      tags: tags ? (Array.isArray(tags) ? tags : [tags]) : [],
      access: access ? (Array.isArray(access) ? access : [access]) : [],
      creator: req.user.id,
      image: thumbnailUploadResult
        ? {
            public_id: thumbnailUploadResult.public_id,
            url: thumbnailUploadResult.secure_url,
          }
        : undefined,
    });

    const savedVideo = await newVideo.save();

    // Возвращаем созданное видео с данными создателя
    const populatedVideo = await Video.findById(savedVideo._id).populate(
      "creator",
      "-password"
    );

    res.status(201).json(populatedVideo);
  } catch (error) {
    console.error("Ошибка при создании видео:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Получение списка видео с поиском и пагинацией.
 */
export const getVideos = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
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
    if (searchQuery) {
      filter.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { desc: { $regex: searchQuery, $options: "i" } },
      ];
    }

    // 4. Объединяем фильтры
    const finalFilter =
      Object.keys(filter).length > 0
        ? { $and: [filter, accessFilter] }
        : accessFilter;

    const total = await Video.countDocuments(finalFilter);
    const videos = await Video.find(finalFilter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("access")
      .populate("creator", "-password");

    res.json({
      videos,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Получение видео по ID.
 */
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("access")
      .populate("creator", "-password")
      .populate("tags", "title");
    if (!video) {
      return res.status(404).json({ message: "Видео не найдено" });
    }

    // Проверка доступа
    if (req.user.role !== "admin") {
      // Если access не пуст - проверяем группы
      if (video.access.length > 0) {
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
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Обновление видео по ID.
 * Позволяет обновить поля видео, а также загрузить новый видеофайл и/или обложку.
 */
export const updateVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Видео не найдено" });
    }

    // Проверка прав: только создатель или админ могут обновлять видео
    if (video.creator.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Нет прав для обновления видео" });
    }

    // Если новый видео файл загружается, загружаем его через Cloudinary и обновляем videoUrl
    if (req.file) {
      // Если ранее видео было загружено через Cloudinary и хранится public_id, можно удалить его:
      if (video.videoUrl) await cloudinary.uploader.destroy(video.videoUrl);
      const videoUploadResult = await uploadToCloudinary(
        req.file.buffer,
        "videos",
        ["mp4", "mov", "avi", "mkv"]
      );
      req.body.videoUrl = videoUploadResult.secure_url;
      // Можно сохранить videoPublicId, если требуется для удаления в будущем:
      // req.body.videoPublicId = videoUploadResult.public_id;
    }

    // Обработка обновления обложки, если загружен новый файл
    if (req.files && req.files.thumbnail) {
      if (video.thumbnail && video.thumbnail.public_id) {
        await cloudinary.uploader.destroy(video.thumbnail.public_id);
      }
      const thumbnailUploadResult = await uploadToCloudinary(
        req.files.thumbnail[0].buffer,
        "thumbnails",
        ["jpg", "png", "jpeg", "gif"],
        "image"
      );
      req.body.thumbnail = {
        public_id: thumbnailUploadResult.public_id,
        url: thumbnailUploadResult.secure_url,
      };
    }

    // Обновляем только разрешённые поля
    const updatableFields = [
      "title",
      "desc",
      "duration",
      "tags",
      "access",
      "videoUrl",
      "thumbnail",
    ];
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        video[field] = req.body[field];
      }
    });

    const updatedVideo = await video.save();
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Удаление видео по ID.
 * Удаляет запись и, при наличии, удаляет связанные файлы в Cloudinary.
 */
export const deleteVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Видео не найдено" });
    }

    // Проверка прав: только создатель или админ могут удалить видео
    if (video.creator.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Нет прав для удаления видео" });
    }

    // Удаление обложки из Cloudinary, если имеется
    if (video.thumbnail && video.thumbnail.public_id) {
      await cloudinary.uploader.destroy(video.thumbnail.public_id);
    }
    // Если у вас хранится videoPublicId, можно удалить и видеофайл:
    // if (video.videoPublicId) await cloudinary.uploader.destroy(video.videoPublicId);

    await video.deleteOne();
    res.json({ message: "Видео успешно удалено" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadVideoFile = async (req, res) => {
  try {
    if (!req.files || !req.files.video) {
      return res.status(400).json({ message: "Файл видео не выбран" });
    }
    const fileBuffer = req.files.video[0].buffer;
    const uploadResult = await uploadToCloudinary(fileBuffer, "videos");
    res.json({ secure_url: uploadResult.secure_url });
  } catch (error) {
    console.error("Ошибка загрузки видео:", error);
    res.status(500).json({ error: error.message });
  }
};
