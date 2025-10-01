import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRATE
})

export const UploadOnCloudinary = async (LocalFilePath) =>{
    try {
        const response = await cloudinary.uploader.upload(LocalFilePath , {
            resource_type:"auto"
        })
        return response;
    } catch (error) {
        console.log("cloudinary.js :: UploadOnCloudinary :: Error",error);        
    }
    finally{
        
        fs.unlinkSync(LocalFilePath) // that is core laibery of node js it help us to manage files
        // unlink methods get file path witch is uploaded on our server for temperlay and it is unlink( deleted )
    }
}