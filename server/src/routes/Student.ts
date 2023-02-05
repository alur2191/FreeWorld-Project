import express from "express";
import controller from "../controllers/Student";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const router = express.Router();

router.get("/get/", controller.readAll);
router.get('/get/:id', controller.getStudent);
router.post(
  "/create/",
  ValidateJoi(Schemas.student.create),
  controller.createStudent
);

export = router;
