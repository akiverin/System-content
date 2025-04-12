import { ComponentLoader, Dashboard } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  Dashboard: componentLoader.add("Dashboard", "./dashboard"),
  ImageCell: componentLoader.add("ImageCell", "./imageCell"),
  VideoUpload: componentLoader.add("VideoUpload", "./videoUpload"),
  ImageUpload: componentLoader.add("ImageUpload", "./imageUpload"),
};

export { componentLoader, Components };
