import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { publicService } from "./public.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";

const getGears = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const gearItems = await publicService.getGearFromDB();

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

    const getGears = await publicService.getGearByIdFromDB(gearId as string)

    sendResponse(res, {
        success: true,
        successStatus: httpStatus.OK,
        message: "Get GearItems Successfully",
        data: {
            getGears
        }
    })
})

const getAllCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const categories = await publicService.getAllCategoriesFromDB();

    sendResponse(res, {
        success: true,
        successStatus: httpStatus.OK,
        message: "Get Categories Successfully",
        data: {
            categories
        }
    })
})

export const publicController = {
    getGears, getGearById, getAllCategories
}