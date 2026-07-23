import {User} from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVerificationMailGenContent, sendEmail } from "../utils/mail.js";

const generateAccessAndRefreshTokens = async (userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(
            500, "Something went wrong while generate token"
        );
    }
};
const registerUser = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    });
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists", [])
    }
    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false
    });

   const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken();

   user.emailVerificationToken = hashedToken;
   user.emailVerificationExpiry = tokenExpiry;

   await user.save({validateBeforeSave: false})

   await sendEmail({
    email:user.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailGenContent(
        user.username,
    )
   });
});