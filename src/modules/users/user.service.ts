import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { registerUserPayload } from "./user.interface";




const registerUserIntoDB = async (payload: registerUserPayload) => {
    const { name, email, password, avatarUrl } = payload

    const isUserExist = await prisma.user.findUnique({
        where: { email }
    })

    if (isUserExist) {
        throw new Error("User with this email already Exist");
    }
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash: hashedPassword,
            profile :{
                create :{
                   avatarUrl 
                }
            }
        }
    });

    // await prisma.profile.create({
    //     data: {
    //         userId: createdUser.id,
    //         avatarUrl
    //     }
    // })

    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email
        },
        omit: {
            passwordHash: true
        },
        include: {
            profile: true
        }
    })
    return user;
}

export const userService = {
    registerUserIntoDB
}