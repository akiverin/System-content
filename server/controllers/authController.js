const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, group } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Пользователь уже существует" });

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      group,
    });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Неверная почта или пароль" });
    }

    const token = generateToken(user);
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Неверный текущий пароль" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Пароль успешно изменён" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
