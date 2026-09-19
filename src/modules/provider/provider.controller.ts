import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { providerService } from "./provider.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";


const addGear = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.user?.id;
    const payload = req.body;

    const addGear = await providerService.addGearIntoDb(payload, userId as string);

    sendResponse(res, {
        success: true,
        successStatus: httpStatus.CREATED,
        message: "Gear Item Created Successfully",
        data: {
            addGear
        }
    })

})

const updateGear = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const gearId = req.params.gearId;
    const providerId = req.user?.id;
    const payload = req.body;

    const UpdateGearItem = await providerService.updateGear(gearId as string, providerId as string, payload);

    sendResponse(res, {
        success: true,
        successStatus: httpStatus.OK,
        message: "Gear Item updated Successfully",
        data: {
            UpdateGearItem
        }
    })


})


export const providerController = {
    addGear, updateGear
}