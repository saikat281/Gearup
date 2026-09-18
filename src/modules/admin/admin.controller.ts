import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const category = await adminService.createCategoryIntoDb(payload);

    sendResponse(res, {
        success: true,
        successStatus: httpStatus.OK,
        message: "Category Created successfully",
        data: {
            category
        }
    })
})


export const adminController = {
    createCategory
}