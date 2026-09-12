import bcrypt from "bcryptjs";
import { NextFunction, Request, Response, Router } from "express";
import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

declare global {
    namespace Express {
        interface Request {
            user?: {
                name: string,
                email: string,
                id:string,
                role: UserRole
            }
        }
    }
}

router.post('/register', userController.RegisterUser)

router.get('/me', (req: Request, res: Response, next: NextFunction) => {
    // const cookies = req.cookies;
    const { accessToken } = req.cookies
    // console.log(accessToken);

    // res.send("Get my profile")

    const verifiedToken = jwtUtils.verifiedToken(accessToken, config.jwt_access_secret)

    // console.log(varifiedToken)

    if (typeof verifiedToken === "string") { // for verification.id type
        throw new Error("Invalid Token");
    }

    const { email, id, name, role } = verifiedToken;
    console.log(role);

    // const requiredRoles = ["CUSTOMER","PROVIDER","ADMIN"];
    const requireRoles = [UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN];

    if (!requireRoles.includes(role)) {
        return res.status(403).json({
            success: false,
            statusCode: httpStatus.FORBIDDEN,
            message: "Forbidden ! You don't have permission to access this resourse"

        })
    }

    req.user = {
        name, email,id,role
    }

    next();
}, userController.getMyProfile)

export const userRouter = router;