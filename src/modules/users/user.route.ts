import bcrypt from "bcryptjs";
import { Request, Response, Router } from "express";
import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { userController } from "./user.controller";

const router = Router();

router.post('/register', userController.RegisterUser)

export const userRouter = router;