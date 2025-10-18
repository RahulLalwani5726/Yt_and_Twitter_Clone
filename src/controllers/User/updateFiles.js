import {asyncHandler} from "../../utils/asyncHandler.js"
import {User} from "../../models/User.model.js"
import {ApiError} from "../../utils/ApiError.js"
import { Response } from "../../utils/Response.js";
import {UploadOnCloudinary} from  "../../utils/cloudinary.js"
export const updateAvatar = asyncHandler(async(req , res) =>{
    const avaterPath = req.file?.path;
    if(!avaterPath) throw new ApiError(401 , "Invalid Image");
    const avatar = await UploadOnCloudinary(avaterPath);
    if(!avatar.url) throw new ApiError(501,"Unable to Upload Avatar on DB");
    const user = User.findByIdAndUpdate(req.user._id , {
        $set:{
            avatar:avatar.url
        }
    },{new:true}).select("-password");
    return res.status(201).json(
        new Response(201,"Avatar Updated successful" , user)
    )
}) 
export const updateCoverImage = asyncHandler(async(req , res) =>{
    const coverImagePath = req.file?.path;
    if(!coverImagePath) throw new ApiError(401 , "Invalid Image");
    const coverImage = await UploadOnCloudinary(coverImagePath);
    if(!coverImage.url) throw new ApiError(501,"Unable to Upload Avatar on DB");
    const user = User.findByIdAndUpdate(req.user._id , {
        $set:{
            coverimage:coverImage.url
        }
    },{new:true}).select("-password");
    return res.status(201).json(
        new Response(201,"Avatar Updated successful" , user)
    )
}) 