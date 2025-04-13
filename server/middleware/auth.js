import jwt from "jsonwebtoken";
import Session from "../models/Session.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Нет доступа. Токен не предоставлен.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await Session.findOne({ token, revoked: false });

    if (!session)
      return res.status(401).json({ message: "Сессия недействительна" });

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Токен истек" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Неверный токен" });
    }
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export default authMiddleware;
