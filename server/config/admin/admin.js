import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { dark, light, noSidebar } from "@adminjs/themes";
import User from "../../models/User.js";
import Group from "../../models/Group.js";
import Post from "../../models/Post.js";
import Course from "../../models/Course.js";
import Video from "../../models/Video.js";
import Tag from "../../models/Tag.js";
import Document from "../../models/Document.js";
import dotenv from "dotenv";
import { componentLoader, Components } from "./components/index.js";
import Session from "../../models/Session.js";

dotenv.config();

AdminJS.registerAdapter(AdminJSMongoose);

const teacherActions = {
  list: {
    isAccessible: ({ currentAdmin }) => {
      return currentAdmin && currentAdmin.role !== "student";
    },
  },
  edit: {
    isAccessible: ({ currentAdmin, record }) => {
      return (
        currentAdmin &&
        (currentAdmin.role === "admin" ||
          record.params.creator === currentAdmin._id.toString())
      );
    },
  },
  delete: {
    isAccessible: ({ currentAdmin, record }) => {
      return (
        currentAdmin &&
        (currentAdmin.role === "admin" ||
          record.params.creator === currentAdmin._id.toString())
      );
    },
  },
  new: {
    isAccessible: ({ currentAdmin }) => currentAdmin.role !== "student",
  },
};

// Функция для проверки доступа к курсам
const courseResourceOptions = {
  resource: Course,
  options: {
    navigation: {
      icon: "Book",
    },
    properties: {
      _id: {
        isVisible: { list: false, show: true, edit: false },
      },
      creator: {
        isVisible: {
          list: false,
          edit: true,
          filter: true,
          show: true,
        },
      },
      "image.url": {
        isVisible: { list: false, show: false, edit: true },
        components: {
          edit: Components.ImageUpload,
          list: Components.ImageUpload,
        },
        custom: {
          folder: "courses",
        },
      },
      "image.public_id": {
        isVisible: { list: false, show: false, edit: false },
      },
      image: {
        isVisible: { list: true, show: true, edit: false },
        components: {
          list: Components.ImageCell,
          show: Components.ImageCell,
        },
      },
    },
    actions: teacherActions,
  },
};

const adminJs = new AdminJS({
  defaultTheme: light.id,
  availableThemes: [dark, light, noSidebar],
  resources: [
    {
      resource: User,
      options: {
        navigation: {
          icon: "User",
        },
        listProperties: ["image", "firstName", "lastName", "email", "role"],
        properties: {
          _id: {
            isVisible: { list: false, show: true, edit: false },
          },
          image: {
            isVisible: { list: true, show: true, edit: true },
            components: {
              list: Components.ImageCell,
              show: Components.ImageCell,
            },
          },
          password: { isVisible: false },
          "image.url": {
            isVisible: { list: false, show: false, edit: true },
            components: {
              edit: Components.ImageUpload,
              list: Components.ImageUpload,
            },
            custom: {
              folder: "avatars",
            },
          },
          "image.public_id": {
            isVisible: false,
          },
          role: {
            availableValues: [
              { value: "student", label: "Ученик" },
              { value: "teacher", label: "Учитель" },
              { value: "admin", label: "Администратор" },
            ],
          },
        },
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) => {
              return currentAdmin && currentAdmin.role !== "student";
            },
          },
          edit: {
            isAccessible: ({ currentAdmin }) => {
              return currentAdmin && currentAdmin.role === "admin";
            },
          },
          delete: {
            isAccessible: ({ currentAdmin }) => {
              return currentAdmin && currentAdmin.role === "admin";
            },
          },
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin.role === "admin",
          },
        },
      },
    },
    {
      resource: Group,
      options: {
        navigation: {
          icon: "Users",
        },
        properties: {
          members: { isVisible: { list: true, edit: true, filter: true } },
          createdBy: { isVisible: false },
        },
      },
      actions: {
        list: {
          isAccessible: ({ currentAdmin }) => {
            return currentAdmin && currentAdmin.role !== "student";
          },
        },
        edit: {
          isAccessible: ({ currentAdmin }) => {
            return currentAdmin && currentAdmin.role === "admin";
          },
        },
        delete: {
          isAccessible: ({ currentAdmin }) => {
            return currentAdmin && currentAdmin.role === "admin";
          },
        },
        new: {
          isAccessible: ({ currentAdmin }) => currentAdmin.role === "admin",
        },
      },
    },
    {
      resource: Post,
      options: {
        navigation: {
          icon: "Edit",
        },
        properties: {
          _id: {
            isVisible: { list: false, show: true, edit: false },
          },
          tags: {
            isVisible: { list: false, show: true, edit: true },
          },
          author: {
            isVisible: {
              list: false,
              show: true,
              edit: true,
              filter: true,
            },
          },
          text: {
            type: "richtext",
            isVisible: { list: false, show: true, edit: true, filter: false },
          },
          "image.url": {
            isVisible: { list: false, show: false, edit: true },
            components: {
              edit: Components.ImageUpload,
              list: Components.ImageUpload,
            },
            custom: {
              folder: "posts",
            },
          },
          "image.public_id": {
            isVisible: false,
          },
        },
        actions: teacherActions,
      },
    },
    courseResourceOptions,
    {
      resource: Video,
      options: {
        navigation: {
          icon: "Video",
        },
        properties: {
          _id: {
            isVisible: { list: false, show: false, edit: false },
          },
          "image.url": {
            isVisible: { list: false, show: false, edit: true },
            components: {
              edit: Components.ImageUpload,
              list: Components.ImageUpload,
            },
            custom: {
              folder: "thumbnails",
            },
          },
          "image.public_id": {
            isVisible: { list: false, show: false, edit: false },
          },
          videoUrl: {
            isVisible: { list: false, show: false, edit: true },
            components: {
              edit: Components.VideoUpload,
              list: Components.VideoUpload,
            },
          },
          createdAt: { list: false, show: true, edit: true },
          updatedAt: { list: false, show: true, edit: true },
          creator: { list: false, show: true, edit: true },
        },
        actions: teacherActions,
      },
    },
    {
      resource: Tag,
      options: {
        navigation: {
          icon: "Tag",
        },
        properties: {
          creator: { isVisible: false },
        },
        actions: teacherActions,
      },
    },
    {
      resource: Session,
      options: {
        navigation: {
          icon: "Archive",
        },
        properties: {
          token: { isVisible: { list: false, show: true, edit: false } },
          _id: { isVisible: { list: false, show: true } },
        },
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) => {
              return currentAdmin && currentAdmin.role === "admin";
            },
          },
        },
      },
    },
    {
      resource: Document,
      options: {
        navigation: {
          icon: "File",
        },
        properties: {
          creator: { list: false, show: true, edit: true },
          fileUrl: {
            isVisible: { list: false, show: false, edit: true },
            components: {
              edit: Components.DocumentUpload,
              list: Components.DocumentUpload,
            },
            custom: {
              folder: "documents",
            },
          },
        },
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) => {
              return currentAdmin && currentAdmin.role === "admin";
            },
          },
        },
      },
    },
  ],
  componentLoader,
  dashboard: {
    component: Components.Dashboard,
  },
  rootPath: "/admin",
  branding: {
    companyName: "System Content Admin",
  },
});

const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_LOGIN,
  password: process.env.ADMIN_PASSWORD,
};

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      // Проверка учетных данных из .env
      if (ADMIN_CREDENTIALS.email && ADMIN_CREDENTIALS.password) {
        if (
          email === ADMIN_CREDENTIALS.email &&
          password === ADMIN_CREDENTIALS.password
        ) {
          return { email: "admin", role: "admin" };
        }
      }

      // Проверка в базе данных
      const user = await User.findOne({ email });
      if (user && (user.role === "admin" || user.role === "teacher")) {
        if (await user.comparePassword(password)) {
          return user;
        }
      }
      return false;
    },
    cookieName: "admin",
    cookiePassword:
      process.env.ADMINJS_COOKIE_PASSWORD || "secure-cookie-password-32",
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
  }
);

adminRouter.get("/api/dashboard-stats", async (req, res) => {
  try {
    const [users, groups, posts, courses] = await Promise.all([
      User.countDocuments(),
      Group.countDocuments(),
      Post.countDocuments(),
      Course.countDocuments(),
    ]);
    res.json({ users, groups, posts, courses });
  } catch (error) {
    console.error("Ошибка в dashboard-stats:", error);
    res.status(500).json({ error: "Ошибка при получении статистики" });
  }
});
export { adminJs, adminRouter };
