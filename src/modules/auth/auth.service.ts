import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"

const loginUser = async(payload : ILoginUser)=>{

    const {email,password} = payload;

    // const findUser = await prisma.user.findUnique({
    //     where : {email}
    // })
    // if(!findUser){
    //     throw new Error("User Not Found")
    // }
    
    // simplify version: findUniqueOrThrow => it automatically handle error
    const user = await prisma.user.findUniqueOrThrow({
        where : {email}
    })

    const isPasswordMatched = await bcrypt.compare(password, user.passwordHash);

    if(!isPasswordMatched){
        throw new Error("Passowrd is incorrect")
    }


    return user;
}

export const authService = {
    loginUser
}