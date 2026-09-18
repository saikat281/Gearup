import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { gearService } from "./gear.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";

const getGears = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const gearItems = await gearService.getGearFromDB();

    sendResponse(res, {
        success: true,
        successStatus: httpStatus.OK,
        message: "Get GearItems Successfully",
        data: {
            gearItems
        }
    })

})

const getGearById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const gearId = req.params.gearId;

    const getGears = await gearService.getGearByIdFromDB(gearId as string)

    sendResponse(res, {
        success: true,
        successStatus: httpStatus.OK,
        message: "Get GearItems Successfully",
        data: {
            getGears
        }
    })
})

export const gearController = {
    getGears, getGearById
}