const fs = require("fs");
const path = require("path");

export default function getImagesNames() {
  const folderPath = path.resolve(__dirname, "../public/images");

  const imagesNames = fs.readdirSync(folderPath).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return (
      ext === ".png" ||
      ext === ".jpg" ||
      ext === ".jpeg" ||
      ext === ".gif" ||
      ext === ".bmp" ||
      ext === ".svg"
    );
  });

  return imagesNames;
}
