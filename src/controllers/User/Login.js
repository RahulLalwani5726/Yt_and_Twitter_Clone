import { asyncHandler } from "../../utils/asyncHandler.js"
import {ApiError} from "../../utils/ApiError.js"
import User from "../../models/User.model.js"
import { Response } from "../../utils/Response.js";

const AccessAndRefreshGenrator = async(userId) => {
    const user = User.findById(userId);
    if(!user) throw new ApiError(500,"Somting went Wrong while Login User")
    const accessToken = user.genrateAccessToken()
    const refreshToken = user.genrateAccessToken()
    user.refreshToken = refreshToken;
    user.save({validateBeforeSave:false})
    return {accessToken , refreshToken};
}

const userLogin = asyncHandler(async (req , res)=>{
    // check given details are currect
    // check user is exits
    // check password
    // genrate tokens 
    // return

    const {email,username , password} = req.body;

    if( !email && !username ) throw new ApiError(401 , "email or username is required");
    // or alternate apporch 
    // if(!(email||username)) if both are null they give false but ! convet true similurly true convert to false thats the logic
    const user = await User.findOne({
        $or : [{username},{email}]
    })
    
    if(!user) throw new ApiError(404 , "User Not Found");

    const verifyPassword = user.isPasswordCurrect(password);

    if(verifyPassword) throw new ApiError(401 , "Password is Incurrect");

    const {accessToken , refreshToken} = AccessAndRefreshGenrator(user._id);

    const userData = User.findById(user_id).select(
        "-password -refreshtoken"
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(201)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken" , refreshToken , options)
    .json(new Response(
        201,
        "User Login successfull",
        {
            user:userData,
            accessToken,
            refreshToken
        },
        200
    ));
})

export {
    LoginUser
}