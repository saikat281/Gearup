import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";
import { JwtPayload } from "jsonwebtoken";


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

export const auth = (...RequiredRoles: UserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken ? req.cookies.accessToken :
            req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;

        // check token exist / user logged in or not
        if (!token) {
            throw new Error("You are not logged in, please log in to access this resource")
        }



        // verify user
        const verifiedToken = jwtUtils.verifiedToken(token, config.jwt_access_secret)

        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error)
        }

        const { email, id, name, role } = verifiedToken.data as JwtPayload;

        // matching required roles
        if (!RequiredRoles.includes(role)) {
            throw new Error("Forbidden ! You don't have permission to access this resourse")
        }

        // check user exist in DB or not

        const user = await prisma.user.findUnique({
            where: { id, email, name, role }
        })

        if (!user) {
            throw new Error("User not found")
        }

        // check user unblocked or blocked

        if (user?.isActive === false) {
            throw new Error("Your Account has been blocked. please contact support")
        }

        // return req.user

        req.user = {
            name,
            email,
            id,
            role
        }

        next();

    })
}