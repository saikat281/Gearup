import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt from "jsonwebtoken"
import { jwtUtils } from "../../utils/jwt";


const RegisterUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // req
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload)



    sendResponse(res, {
        success: true,
        successStatus: httpStatus.CREATED,
        message: "User Registered successfully",
        data: {
            user
        }
    })

    // res
    // res.status(httpStatus.CREATED).json({
    //     success: true,
    //     successStatus: httpStatus.CREATED,
    //     message: "User Registered successfully",
    //     data: {
    //         user
    //     }
    // });
})

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    
    console.log(req.user);
//     // const cookies = req.cookies;
//     const {accessToken} =req.cookies
//     // console.log(accessToken);

//     // res.send("Get my profile")

//    const verifiedToken = jwtUtils.verifiedToken(accessToken,config.jwt_access_secret)

//     // console.log(varifiedToken)

//     if(typeof verifiedToken === "string"){ // for verification.id type
//         throw new Error("Invalid Token");
//     }

    

    const profile = await userService.getMyProfileFromDB(req.user?.id as string)

     sendResponse(res, {
        success: true,
        successStatus: httpStatus.OK,
        message: "User fetched successfully",
        data: {
            profile
        }
    })
})

export const userController = {
    RegisterUser,getMyProfile
}