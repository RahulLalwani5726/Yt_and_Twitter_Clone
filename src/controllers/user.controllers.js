import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/User.model.js"
import {UploadOnCloudinary} from "../utils/cloudinary.js"
import {Response} from "../utils/Response.js"
const userRegister = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
// ---------------------------------------------
    // get user details from frontend
    const {fullName , password , email , username} = req.body;
    // validation - not empty
    if([fullName , password,email,username].some(field => field?.trim() == "")){
        throw ApiError(401 , "All fields Are Required");
    }
    // check if user already exists: username, email
    if(User.findOne({
        $or:[{username},{email}]
    })){
        throw ApiError(401 , "User Already Exits");
    }

    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) throw new ApiError(401,"Avatar Img is Required");
    // upload them to cloudinary,check avatar
    const avatar = UploadOnCloudinary(avatarLocalPath);
    const coverImage = UploadOnCloudinary(coverImageLocalPath);

    if(!avatar) throw new ApiError(500 , "Somting Went Wrong While Uploading File");
    // create user object - create entry in db

    const user = {
        username:username.trim().toLowerCase(),
        email:email,
        fullname:fullName,
        password:password,
        avatar:avatar.url,
        coverimage:coverImage?.url || ""
    }
    User.create(user);
    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id)?.select(
        "-password -refreshtoken"
    )
    // check for user creation
    if(!createdUser) throw new ApiError(500 , "Somting Went Wrong While Creating User")
    // return res
    return res.status(201).json(
        new Response(201 , "User Created Succeccfully! " , createdUser)
    )
})

export {
    userRegister,
}