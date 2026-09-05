import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { userService } from "./user.service";

const RegisterUser = async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        console.log(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to register user",
            error: (error as Error).message

        })
    }
}

export const userController = {
    RegisterUser,
}