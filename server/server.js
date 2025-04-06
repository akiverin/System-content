require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const courseRoutes = require("./routes/courseRoutes");
const groupRoutes = require("./routes/groupRoutes");
const videoRoutes = require("./routes/videoRoutes");

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const localClient = "http://localhost:5173";
const productionClient = "https://syscontent.kiver.net";
const serverUrls = [isProduction ? productionClient : "http://localhost:5050"];

app.use(
  cors({
    origin: isProduction ? productionClient : localClient,
    exposedHeaders: ["Content-Type", "Authorization"],
  })
);

app.set("trust proxy", true);
connectDB();

// Swagger Configuration
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

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions))
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/videos", videoRoutes);

// Middleware
app.use((req, res, next) => {
  req.isProduction = isProduction;
  next();
});

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
