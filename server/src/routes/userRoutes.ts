export {};
const { isAuthenticated } = require('../middlewares');
const { prisma } = require('../helpers/prismaHelper');
const { uploadProfileImage } = require('../helpers/cloudinaryHelper');
const { filterPasswordKeys, encrypt } = require('../helpers');
const router = require('express').Router();

router.post('/upload', isAuthenticated, async (req: any, res: any, next: any) => {
  try {
    const uploadData = req.body.uploadData;
    const uploadRes = await uploadProfileImage(uploadData);
    if (uploadRes?.url == null) throw new Error('Could not upload image');
    const user = await prisma.user.update({
      where: {
        id: req.user.id
      },
      data: {
        profileImgUrl: uploadRes.url
      }
    });
    res.send(user);
  } catch (error) {
    return next(error);
  }
});

router.post('/update', isAuthenticated, async (req: any, res: any, next: any) => {
  try {
    const updateData = {
      ...req.body
    }
    if (req.body.password) {
      updateData.hashedPassword = encrypt(updateData.password, req.user.salt);
      delete updateData.password;
    }
    const user = await prisma.user.update({
      where: {
        id: req.user.id
      },
      data: updateData
    });
    res.send(filterPasswordKeys(user));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;