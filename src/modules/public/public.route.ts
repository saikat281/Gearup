import { Router } from "express";
import { publicController } from "./public.controller";

const router = Router();


router.get('/gear',publicController.getGears)

router.get('/gear/:gearId',publicController.getGearById)

router.get('/categories',publicController.getAllCategories)

export const publicRouter = router;