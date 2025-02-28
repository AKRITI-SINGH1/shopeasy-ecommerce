const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
    cloud_name : "dj9d1jyiy",
    api_key : "658899267451537",
    api_secret : "cyl7c1fEx0qOVxaiFSJIU_AbMNo",

});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
  
    return result;
  }

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };