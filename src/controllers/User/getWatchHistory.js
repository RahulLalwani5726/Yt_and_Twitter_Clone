import { User } from "../../models/User.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { Response } from "../../utils/Response.js"
import mongoose from "mongoose"

const getWatchHistory = asyncHandler(async (req, res) => {

    if (!userId) throw ApiError(404, "User not Found");

    const user = User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline:[
                    
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline:[
                                {
                                    $project:{
                                        fullname:1,
                                        username:1,
                                        avatar:1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields:{
                            owner : {
                                $first:"$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res.status(201).json(new Response(201,"User Fetched Success" , user[0].watchHistory));
})