import db from "../config";
import express, { Request, Response } from "express";

const router = express.Router();

// @route    GET cohorts/get
// @desc     Get all cohorts
// @access   Public
const readAll = async (req: Request, res: Response) => {
  try {
    const cohortData = await db.query("select * from cohorts");

    res.status(200).json({
      status: "success",
      results: cohortData.rows.length,
      data: {
        cohorts: cohortData.rows,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error! Unable to process request." });
  }
};

// @route    POST cohorts/create
// @desc     Create a cohort
// @access   Public
const createCohort = async (req: Request, res: Response) => {
  try {
    const results = await db.query(
      "INSERT INTO cohorts (max_earnings, max_hours, considered) values ($1, $2, $3) returning *",
      [req.body.max_earnings, req.body.max_hours, req.body.considered]
    );

    res.status(201).json({
      status: "succes",
      data: {
        cohort: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error! Unable to process request." });
  }
};

export default { readAll, createCohort };
