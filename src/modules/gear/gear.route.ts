import { Router } from "express";
import { gearController } from "./gear.controller";

const router = Router();


router.get('/',gearController.getGears)

router.get('/:gearId',gearController.getGearById)

export const gearRouter = router;