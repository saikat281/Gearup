import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors"
import config from "./config";
import { prisma } from "./lib/prisma";
import httpStatus from "http-status";
import { error } from "node:console";
import bcrypt from "bcryptjs";


const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors({
    origin: config.app_url,
    credentials: true
}))

app.get('/', async (req: Request, res: Response) => {
    const user = await prisma.user.findMany();
    console.log(user);
    res.send("Hello world");
})

app.post('/api/users/register', async (req: Request, res: Response) => {
    const { name, email, password, avatarUrl } = req.body;

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
            passwordHash: hashedPassword
        }
    });

    await prisma.profile.create({
        data: {
            userId: createdUser.id,
            avatarUrl
        }
    })

    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: createdUser.email
        },
        omit :{
            passwordHash : true
        },
        include :{
            profile : true
        }
    })

    res.status(httpStatus.CREATED).json({
        success: true,
        successStatus: httpStatus.CREATED,
        message: "User Registered successfully",
        data: {
            user
        }
    });
})

export default app;