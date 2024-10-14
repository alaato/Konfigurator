export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const response = await fetch(body.url);
    const buffer = await response.arrayBuffer();
    // Convert the image buffer to base64
    const base64 = Buffer.from(buffer).toString("base64");
    const mimeType = "image/jpg";
    console.log(base64)
    return {
      base64: `data:${mimeType};base64,${base64}`,
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: "File not found",
    };
  }
});
