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

const router = Router();

declare global {
    namespace Express {
        interface Request {
            user?: {
                name: string,
                email: string,
                id: string,
                role: UserRole
            }
        }
    }
}

router.post('/register', userController.RegisterUser)


const auth = (...RequiredRoles: UserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken 
        // || req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;

        if (!token) {
            throw new Error("You are not logged in, please log in to access this resource")
        }

        const verifiedToken = jwtUtils.verifiedToken(token, config.jwt_access_secret)



        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error)
        }

        const { email, id, name, role } = verifiedToken.data as JwtPayload;

        if (!RequiredRoles.includes(role)) {
            throw new Error("Forbidden ! You don't have permission to access this resourse")
        }

        const user = await prisma.user.findUnique({
            where : {id,email,name,role}
        })

        if(!user){
            throw new Error("User not found")
        }

        if(user?.isActive === false){
            throw new Error("Your Account has been blocked. please contact support")
        }

        req.user ={
            name,
            email,
            id,
            role
        }

        next();

    })
}

router.get('/me', auth(UserRole.ADMIN,UserRole.CUSTOMER,UserRole.PROVIDER),userController.getMyProfile)

export const userRouter = router;