const fs = require("fs");
const path = require("path");
const uuid = require("uuid").v4;

const processUpload = async (file, options) => {
  if (!file) return null;

  const ext = path.extname(file.originalname);
  const filename = `${uuid()}${ext}`;
  const targetPath = path.join(options.finalDir, filename);
  const finalPath = path.join(options.publicDir, targetPath);

  if (!fs.existsSync(path.dirname(finalPath))) {
    fs.mkdirSync(path.dirname(finalPath), { recursive: true });
  }

  fs.renameSync(file.path, finalPath);

  return {
    path: targetPath,
    mimetype: file.mimetype,
    size: file.size,
    originalname: file.originalname,
  };
};

const deleteFile = (filePath) => {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

module.exports = { processUpload, deleteFile };
