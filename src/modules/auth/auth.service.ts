import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const loginUser = async (payload: ILoginUser) => {

    const { email, password } = payload;

    // const findUser = await prisma.user.findUnique({
    //     where : {email}
    // })
    // if(!findUser){
    //     throw new Error("User Not Found")
    // }

    // simplify version: findUniqueOrThrow => it automatically handle error
    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    })

    const isPasswordMatched = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordMatched) {
        throw new Error("Passowrd is incorrect")
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    // const accessToken = jwt.sign(
    //     jwtPayload,
    //     config.jwt_access_secret, {
    //         expiresIn: config.jwt_access_expires_in
    //     } as SignOptions
    // )

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    )

    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions
    )


    // const refreshToken = jwt.sign(
    //     jwtPayload,
    //     config.jwt_refresh_secret, {
    //         expiresIn: config.jwt_refresh_expires_in
    //     } as SignOptions
    // )

    return {
        accessToken, refreshToken
    };
}

const refreshToken = async(refreshToken : string)=>{

    const verifiedToken = jwtUtils.verifiedToken(refreshToken,config.jwt_refresh_secret)

    if(!verifiedToken.success){
        throw new Error(verifiedToken.error)
    }

    const {id} = verifiedToken.data as JwtPayload;

    const user = await prisma.user.findUniqueOrThrow({
        where : {id}
    })

   const jwtPayload = {
    id,
    name : user.name,
    email : user.email,
    role:user.role

   }

   const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_refresh_expires_in as SignOptions
   )

   return {accessToken}
}

export const authService = {
    loginUser,refreshToken
}