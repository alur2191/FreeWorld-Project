import express from "express";
import cors from "cors";
import cohortRoutes from "./routes/Cohort";
import applicantRoutes from "./routes/Applicant";
import studentRoutes from "./routes/Student";

const router = express();

router.use(cors());
router.use(express.json());

// Routes
router.use("/cohorts", cohortRoutes);
router.use("/applicants", applicantRoutes);
router.use("/students", studentRoutes);

const port = process.env.PORT || 3030;

router.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
