import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";


const router = Router();

router.post('/category',auth(UserRole.ADMIN),adminController.createCategory)






export const adminRouter = router;
