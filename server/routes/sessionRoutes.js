import express from "express";
import Session from "../models/Session.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const sessions = await Session.find({ user: req.user._id });
  res.json(sessions);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session || session.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Доступ запрещен" });

  session.revoked = true;
  await session.save();
  res.json({ message: "Сессия отозвана" });
});

export default router;
