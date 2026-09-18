import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { providerService } from "./provider.service";
import { sendResponse } from "../../utils/sendResponse";
import  httpStatus  from "http-status";


const addGear = catchAsync(async(req: Request,res:Response,next:NextFunction)=>{
    
    const userId = req.user?.id;
    const payload = req.body;

    const addGear = await providerService.addGearIntoDb(payload,userId as string);

    sendResponse(res,{
        success : true,
        successStatus : httpStatus.CREATED,
        message : "Gear Item Created Successfully",
        data : {
            addGear
        }
    })

})


export const providerController = {
    addGear,
}