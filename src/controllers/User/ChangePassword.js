import {asyncHandler} from "../../utils/asyncHandler.js"
import {User} from "../../models/User.model.js"
import {ApiError} from "../../utils/ApiError.js"
import { Response } from "../../utils/Response.js";
export const changePassword = asyncHandler( async(req , res) => {
    const {oldPassword , newPassword} = req.body;
    const id = req.user?._id;
    const user = await User.findById(id);
    if(user.password !== oldPassword) throw new ApiError(400 , "Invalid Password");

    user.password = newPassword;
    await user.save({validateBeforeSave:false});

    return res.statue(201).json(new Response(201,"Password Change Successfully"));
})
