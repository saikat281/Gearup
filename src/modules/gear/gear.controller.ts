import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { gearService } from "./gear.service";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from "http-status";

const getGears = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const gearItems = await gearService.getGearFromDB();

    sendResponse(res,{
        success : true,
        successStatus : httpStatus.OK,
        message : "Get GearItems Successfully",
        data : {
            gearItems
        }
    })

})

export const gearController = {
    getGears
}