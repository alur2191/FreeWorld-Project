import express from "express";
import controller from "../controllers/Applicant";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const router = express.Router();

router.get("/get/", controller.getAll);
router.get("/get/:id", controller.getApplicant);
router.post(
  "/create/",
  ValidateJoi(Schemas.applicant.create),
  controller.createApplicant
);

export = router;
