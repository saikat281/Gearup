import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors"
import config from "./config";
import { prisma } from "./lib/prisma";

import { error } from "node:console";
import bcrypt from "bcryptjs";
import { userRouter } from "./modules/users/user.route";


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

// app.post('/api/users/register', async (req: Request, res: Response) => {
   
// })

app.use('/api/users', userRouter)

export default app;