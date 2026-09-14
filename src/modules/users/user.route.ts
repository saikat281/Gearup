import bcrypt from "bcryptjs";
import { NextFunction, Request, Response, Router } from "express";
import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import { UserRole } from "../../../generated/prisma/enums";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { auth } from "../../middleware/auth";

const router = Router();


router.post('/register', userController.RegisterUser)




router.get('/me', auth(UserRole.ADMIN,UserRole.CUSTOMER,UserRole.PROVIDER),userController.getMyProfile)

export const userRouter = router;