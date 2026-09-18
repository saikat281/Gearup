import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { providerController } from "./provider.controller";

const router = Router();



router.post('/gear',auth(UserRole.PROVIDER),providerController.addGear)




export const providerRouter = router;