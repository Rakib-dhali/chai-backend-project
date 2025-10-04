import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    // validation not empty
    //check if user already exist
    //check for image,avatar
    //upload them to cloudinary,avatar
    //create user object- create entry in db
    //move password and refresh token field from response
    //check for user creation

    const {fullName, email, username, password} = req.body
    console.log(email, username);

    if ([fullName, email, username, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, " all field are required")
    }

    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })

    if ( existedUser) {
        throw new ApiError(409, "user with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(404, "avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath )
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar) {
        throw new ApiError(404, "avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar?.url || "" ,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res.this.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully" )
    )

});

export { registerUser };
