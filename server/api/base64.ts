import base64Img from 'base64-img';

export default defineEventHandler((event) => {
  const base64 = base64Img.base64Sync('@/public/TCS_Logo_RGB.jpg')
  if(!base64) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    })
  }
  return base64
})
