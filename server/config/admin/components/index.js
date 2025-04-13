import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  Dashboard: componentLoader.add("Dashboard", "./dashboard"),
  ImageCell: componentLoader.add("ImageCell", "./imageCell"),
  VideoUpload: componentLoader.add("VideoUpload", "./videoUpload"),
  ImageUpload: componentLoader.add("ImageUpload", "./imageUpload"),
  DocumentUpload: componentLoader.add("DocumentUpload", "./documentUpload"),
};

export { componentLoader, Components };
