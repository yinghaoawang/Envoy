export {};
const cloudinary = require('cloudinary').v2;
const config = require('../config');
const Jimp = require('jimp');

cloudinary.config({
  cloud_name: config.CLOUDINARY.CLOUD_NAME,
  api_key: config.CLOUDINARY.API_KEY,
  api_secret: config.CLOUDINARY.API_SECRET
});

async function uploadProfileImage(url: any) {
  try {
    // downscale the image with jimp to save upload storage space
    const jimpRes = await Jimp.read(url);
    jimpRes.resize(256, Jimp.AUTO);

    const base64 = await jimpRes.getBase64Async(Jimp.MIME_PNG);

    // upload to cloudinary
    const cloudinaryRes = await cloudinary.uploader.upload(base64);
    return cloudinaryRes;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { uploadProfileImage };
