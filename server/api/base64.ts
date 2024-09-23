import fs from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async (event) => {
  const filePath = resolve(process.cwd()+ `/public/TCS_Logo_RGB.jpg`);
  if(filePath)
    console.log(filePath)
  try {  
    const file =  fs.readFileSync(filePath);
    const base64 = file.toString('base64');
    const mimeType = 'image/jpg'
    return {
      base64: `data:${mimeType};base64,${base64}`
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: 'File not found',
    };
  }

})
