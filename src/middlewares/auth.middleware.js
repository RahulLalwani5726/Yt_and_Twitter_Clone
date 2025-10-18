import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
export const verifyJWT = asyncHandler(async(req , res , next) =>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        
        if(!token) throw new ApiError(405 , "Invalid Token");
        const DecodeJwT = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
        
        const user = User.findById(DecodeJwT?._id).select("-password -refreshtoken");
        if(!user) throw new ApiError(405 , "Invalid Token");
        
        req.user = user;
    } catch (error) {
        console.log("Error :: authMiddleware :: ", error.messege || "In Auth VerityJWT func");
    }
    finally{
        next();
    }
})