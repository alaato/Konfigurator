const fs = require("fs");
const path = require("path");

function getImagesNames() {
  const folderPath = path.resolve(__dirname, "../../public/ProductImages");

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
  const imagesNamesWithQuotes = imagesNames.map((name) => `"${name}"`);
  const writePath = path.resolve(__dirname, "./imageNames.txt");
  fs.writeFileSync(writePath, imagesNames.join("\n"));
  return imagesNames;
}

getImagesNames();
