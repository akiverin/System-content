const User = require("../models/User");

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
    const { firstName, lastName, email, role, group } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, role, group },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "Пользователь не найден" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
