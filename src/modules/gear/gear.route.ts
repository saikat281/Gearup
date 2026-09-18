import { Router } from "express";
import { gearController } from "./gear.controller";

const router = Router();


router.get('/',gearController.getGears)

export const gearRouter = router;