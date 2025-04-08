import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { dark, light, noSidebar } from "@adminjs/themes";
import User from "../models/User.js";
import Group from "../models/Group.js";
import Post from "../models/Post.js";
import Course from "../models/Course.js";
import Video from "../models/Video.js";
import Tag from "../models/Tag.js";
import Document from "../models/Document.js";

// Регистрируем адаптер для mongoose
AdminJS.registerAdapter(AdminJSMongoose);

// Настраиваем ресурсы
const adminJs = new AdminJS({
  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: { isVisible: false },
        },
      },
    },
    {
      resource: Group,
      options: {
        properties: {
          members: { isVisible: { list: true, edit: false, filter: false } },
          createdBy: { isVisible: false },
        },
      },
    },
    {
      resource: Post,
      options: {
        properties: {
          content: { isVisible: { list: true, edit: true, filter: false } },
          creator: { isVisible: false },
        },
      },
    },
    {
      resource: Course,
      options: {
        properties: {
          content: {
            isVisible: { list: true, edit: true, filter: false },
          },
          creator: { isVisible: false },
        },
      },
    },
    {
      resource: Video,
      options: {
        properties: {
          creator: { isVisible: false },
        },
      },
    },
    {
      resource: Tag,
      options: {
        properties: {
          creator: { isVisible: false },
        },
      },
    },
    {
      resource: Document,
      options: {
        properties: {
          creator: { isVisible: false },
        },
      },
    },
  ],
  rootPath: "/admin",
  branding: {
    companyName: "System Content Admin",
  },
});

// Создаём защищённый роутер для админ-панели с аутентификацией
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      // Предполагается, что у вас в модели User реализован метод comparePassword
      const user = await User.findOne({ email });
      if (
        user &&
        user.role === "admin" &&
        (await user.comparePassword(password))
      ) {
        return user;
      }
      return false;
    },
    cookieName: "adminjs",
    cookiePassword:
      process.env.ADMINJS_COOKIE_PASSWORD || "some-secret-password",
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
  }
);

export { adminJs, adminRouter };
