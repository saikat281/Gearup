import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


const RegisterUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // req
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload)

    

    sendResponse(res,{
        success : true,
        successStatus : httpStatus.CREATED,
        message : "User Registered successfully",
        data : {
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

export const userController = {
    RegisterUser,
}