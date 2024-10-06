import fs from "fs";
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import path from "path";
import outdoorStations from "../../data/aussenstationen.json" with { type: "json" };
async function downloadFile (url, fileName){
  const res = await fetch(url);
  const destination = path.resolve("./public", fileName);
  const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
  await finished(Readable.fromWeb(res.body).pipe(fileStream));
};
async function deleteFile (filePath){
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    console.error(err);
  }
}

outdoorStations.forEach((product)=>{
  const thumb = product?.FrontalAnsichtFrei?.assetThumb || ""
  downloadFile(`https://pim.tcsapps.de${thumb}`, product.id+".png").then(() => console.log("done"))
})
// outdoorStations.forEach((product)=>{
//   deleteFile(`./public/${product.id}`)
// })