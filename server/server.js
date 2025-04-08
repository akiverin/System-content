import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Импорт маршрутов
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import { adminRouter } from "./config/admin.js";

const app = express();
app.use("/admin", adminRouter);

const isProduction = process.env.NODE_ENV === "production";
const localClient = "http://localhost:5173";
const productionClient = "https://syscontent.kiver.net";
const serverUrls = [isProduction ? productionClient : "http://localhost:5050"];

// Настройка CORS
app.use(
  cors({
    origin: isProduction ? productionClient : localClient,
    exposedHeaders: ["Content-Type", "Authorization"],
  })
);

app.set("trust proxy", true);

// Подключение к базе данных
connectDB();

// Конфигурация Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "System Content API",
      version: "1.0.0",
      description:
        "API документация для образовательной платформы System Content",
    },
    servers: serverUrls.map((url) => ({ url })),
  },
  apis: ["./routes/*.js", "./models/*.js"],
};

// Middleware для Swagger
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions))
);

// Парсинг тела запроса
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Регистрация маршрутов
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/documents", documentRoutes);

// Кастомный middleware
app.use((req, res, next) => {
  req.isProduction = isProduction;
  next();
});

// Запуск сервера
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(
    `Сервер запущен в ${isProduction ? "production" : "development"} режиме`
  );
  console.log(`Порт: ${PORT}`);
  console.log(
    `CORS разрешен для: ${isProduction ? productionClient : localClient}`
  );
});
