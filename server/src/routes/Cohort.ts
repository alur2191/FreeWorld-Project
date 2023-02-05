import express from "express";
import controller from "../controllers/Cohort";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const router = express.Router();

router.get("/get/", controller.readAll);
router.post(
  "/create/",
  ValidateJoi(Schemas.cohort.create),
  controller.createCohort
);

export = router;
