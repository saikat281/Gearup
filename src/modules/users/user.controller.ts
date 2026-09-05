import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";



// const RegisterUser = async (req: Request, res: Response) => {
//     try {
//         // req
//         const payload = req.body;

//         const user = await userService.registerUserIntoDB(payload)

//         // res
//         res.status(httpStatus.CREATED).json({
//             success: true,
//             successStatus: httpStatus.CREATED,
//             message: "User Registered successfully",
//             data: {
//                 user
//             }
//         });
//     } catch (error) {

//     }
// }

const RegisterUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // req
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload)

    // res
    res.status(httpStatus.CREATED).json({
        success: true,
        successStatus: httpStatus.CREATED,
        message: "User Registered successfully",
        data: {
            user
        }
    });
})

export const userController = {
    RegisterUser,
}