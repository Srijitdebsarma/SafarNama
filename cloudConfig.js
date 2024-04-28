const cloudinary=require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary");
require("dotenv").config();

//configaration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

//storage
const storage= new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'SafarNama_DEV',
        allowerdFormats: ['png','jpg','jpeg'], 
    },
})

module.exports={
    cloudinary,
    storage,
}