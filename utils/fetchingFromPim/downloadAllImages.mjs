import fs from "fs";
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import path from "path";
import outdoorStations from "../../data/aussenstationen.json" with { type: "json" };
import indoor from "../../data/innenestationen.json" with { type: "json" };
import acc from "../../data/Zubehoer.json" with { type: "json" };
import er from "../../data/Funktionserweiterung.json" with { type: "json" };
async function downloadFile (url, fileName){
  const res = await fetch(url);
  const destination = path.resolve("./public/ProductImages/", fileName);
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
// outdoorStations.forEach((product)=>{
// 	deleteFile(`./public/ProductImages/${product.id}` +'.png')
//   })
// outdoorStations.forEach((product)=>{
//   const thumb = product?.FrontalAnsichtFrei?.assetThumb || null
//   if(thumb)
// 	downloadFile(`https://pim.tcsapps.de${thumb}`, product.id+".png").then(() => console.log("done"))
// })
// indoor.forEach(async(product)=>{
// 	const thumb = product?.FrontalAnsichtFrei?.assetThumb || null
// 	if(thumb)
// 	 await downloadFile(`https://pim.tcsapps.de${thumb}`, product.id+".png").then(() => console.log("done"))
// })
// acc.forEach(async (product)=>{
// 	const thumb = product?.FrontalAnsichtFrei?.assetThumb || null
// 	if(thumb)
// 	  await downloadFile(`https://pim.tcsapps.de${thumb}`, product.id+".png").then(() => console.log("done"))
// })
er.forEach(async (product)=>{
	const thumb = product?.FrontalAnsichtFrei?.assetThumb || null
	if(thumb)
	  await downloadFile(`https://pim.tcsapps.de${thumb}`, product.id+".png").then(() => console.log("done"))
})
