const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid").v4;

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // не возвращаем пароль
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Пользователь не найден" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const userData = { ...req.body };
  const avatarFile = req.file;
  const uploadsDir = req.uploadsDir;

  try {
    // 1. Находим пользователя
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // 2. Обрабатываем аватар
    if (avatarFile) {
      try {
        // Удаляем старый аватар
        if (user.image) {
          const oldAvatarPath = path.join(uploadsDir, user.image);
          try {
            await fs.unlink(oldAvatarPath);
          } catch (unlinkErr) {
            if (unlinkErr.code !== "ENOENT") throw unlinkErr; // Игнорируем ошибку если файл не существует
          }
        }

        // Генерируем новый путь
        const fileExt = path.extname(avatarFile.originalname);
        const avatarFileName = `${uuid()}${fileExt}`;
        const avatarPath = path.join("avatars", avatarFileName);
        const targetPath = path.join(uploadsDir, avatarPath);

        // Создаём директорию если не существует
        await fs.mkdir(path.dirname(targetPath), { recursive: true });

        // Перемещаем файл (с поддержкой разных файловых систем)
        await fs
          .rename(avatarFile.path, targetPath)
          .catch(async (renameErr) => {
            // Если переименование не работает между файловыми системами
            await fs.copyFile(avatarFile.path, targetPath);
            await fs.unlink(avatarFile.path);
          });

        userData.image = avatarPath; // Сохраняем относительный путь
      } catch (fileError) {
        return res.status(500).json({
          message: "Ошибка при обработке изображения",
          error: fileError.message,
        });
      }
    }

    // 3. Обновляем разрешённые поля
    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "role",
      "group",
      "image",
    ];
    allowedFields.forEach((field) => {
      if (userData[field] !== undefined) {
        user[field] = userData[field];
      }
    });

    // 4. Сохраняем изменения
    const updatedUser = await user.save();
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.json(userResponse);
  } catch (error) {
    // Удаляем временный файл при ошибке
    if (avatarFile) {
      try {
        await fs.unlink(avatarFile.path);
      } catch (unlinkErr) {
        console.error("Ошибка удаления временного файла:", unlinkErr);
      }
    }

    // Обработка ошибок
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({
      message: error.message || "Ошибка при обновлении пользователя",
      errors: error.errors, // Для mongoose validation errors
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "Пользователь не найден" });
    res.json({ message: "Пользователь успешно удален" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Файл не загружен" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const finalPath = path.join(
      __dirname,
      "../uploads/avatars",
      req.file.filename
    );
    fs.renameSync(req.file.path, finalPath);

    user.avatar = `/uploads/avatars/${req.file.filename}`;
    await user.save();

    res.json({
      avatar: `http://syscontent.kiver.net/api${user.avatar}`,
      message: "Аватар успешно обновлён",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при обновлении аватара",
    });
  }
};
