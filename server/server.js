require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

//swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "System Content API",
      version: "1.0.0",
      description:
        "API документация для образовательной платформы System Content",
    },
    servers: [
      {
        url: "http://localhost:5050",
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
