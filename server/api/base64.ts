import base64Img from 'base64-img';

export default defineEventHandler(async (event) => {


  const base64 = base64Img.base64Sync('public/TCS_Logo_RGB.jpg')
  return base64
})
