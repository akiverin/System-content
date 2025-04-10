import { ComponentLoader, Dashboard } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  Dashboard: componentLoader.add("Dashboard", "./dashboard"),
  ImageCell: componentLoader.add("ImageCell", "./imageCell"),
};

export { componentLoader, Components };
