import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from "http-status";

const loginUser = catchAsync(async(req : Request,res: Response, next : NextFunction)=>{
    const payload = req.body;

    const {accessToken,refreshToken} = await authService.loginUser(payload);

    res.cookie("accessToken",accessToken,{
        httpOnly : true,
        secure :false,
        sameSite :"none",
        maxAge : 1000 * 60 * 60 * 60 //24 hour or 1 day

    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly : true,
        secure :false,
        sameSite :"none",
        maxAge : 1000 * 60 * 60 * 60 * 7 //24 hour or 1 day

    })

    sendResponse(res,{
        success:true,
        successStatus : httpStatus.OK,
        message : "Successfully Logged in",
        data : {
            accessToken,refreshToken
        }
    })

})


export const authController = {
    loginUser
}