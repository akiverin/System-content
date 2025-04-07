import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // не возвращаем пароль
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Пользователь не найден" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Пользователь не найден" });

    // Обработка аватара
    if (req.file) {
      // Удаление старого изображения
      if (user.image?.public_id) {
        await cloudinary.uploader.destroy(user.image.public_id);
      }

      // Загрузка нового изображения
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "avatars",
            allowed_formats: ["jpg", "png", "jpeg", "gif"],
            transformation: [{ width: 500, height: 500, crop: "limit" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(req.file.buffer);
      });

      user.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Обновление остальных полей
    const updatableFields = ["firstName", "lastName", "email", "role", "group"];
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    // Валидация и сохранение
    await user.validate();
    const updatedUser = await user.save();

    // Формирование ответа
    const responseUser = updatedUser.toObject();
    delete responseUser.password;

    res.json({
      ...responseUser,
      image: updatedUser.image,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      message: error.message,
      errors: error.errors || undefined,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "Пользователь не найден" });
    res.json({ message: "Пользователь успешно удален" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
