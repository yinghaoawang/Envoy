export {};
const cloudinary = require('cloudinary').v2;
const config = require('../config');
const Jimp = require('jimp');

cloudinary.config({
  cloud_name: config.CLOUDINARY.CLOUD_NAME,
  api_key: config.CLOUDINARY.API_KEY,
  api_secret: config.CLOUDINARY.API_SECRET
});

async function uploadProfileImage(imageData: any) {
  const url = imageData.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(url, 'base64');
  // downscale the image with jimp to save upload storage space
  const jimpRes = await Jimp.read(buffer);
  jimpRes.resize(256, Jimp.AUTO);

  const base64 = await jimpRes.getBase64Async(Jimp.MIME_PNG);

  // upload to cloudinary
  const cloudinaryRes = await cloudinary.uploader.upload(base64);
  return cloudinaryRes;
}

module.exports = { uploadProfileImage };
