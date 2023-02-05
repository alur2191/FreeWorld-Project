import express from "express";
import cors from "cors";

const router = express();

router.use(cors());
router.use(express.json());

// Routes

const port = process.env.PORT || 3030;

router.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
