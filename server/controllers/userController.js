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
  try {
    const userId = req.params.id;
    const userData = { ...req.body };
    let avatarFile = req.file;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (avatarFile) {
      if (user.image) {
        const oldAvatarPath = path.join(__dirname, "..", user.image);
        if (fs.existsSync(oldAvatarPath)) {
          fs.unlinkSync(oldAvatarPath);
        }
      }
      const fileExt = path.extname(avatarFile.originalname);
      const avatarFileName = `${uuid()}${fileExt}`;
      const avatarPath = path.join("uploads", "avatars", avatarFileName);

      fs.renameSync(avatarFile.path, path.join(__dirname, "..", avatarPath));
      userData.image = avatarPath;
    }
    const fieldsToUpdate = [
      "firstName",
      "lastName",
      "email",
      "role",
      "group",
      "image",
    ];
    fieldsToUpdate.forEach((field) => {
      if (userData[field] !== undefined) {
        user[field] = userData[field];
      }
    });

    const updatedUser = await user.save();
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.json(userResponse);
  } catch (error) {
    console.error(error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    const statusCode = error.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({
      message: error.message || "Ошибка при обновлении пользователя",
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
