import db from "../config";
import express, { Request, Response } from "express";

const router = express.Router();

interface Applicant {
  name: string;
  earnings_potential: number;
  hours_needed: number;
}
// @route    GET applicants/get
// @desc     Get all applicants
// @access   Public
const getAll = async (req: Request, res: Response) => {
  try {
    const applicantData = await db.query("select * from applicants");

    res.status(200).json({
      status: "success",
      results: applicantData.rows.length,
      data: {
        applicants: applicantData.rows,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error! Unable to process request." });
  }
};

// @route    GET applicants/get/:id
// @desc     Get an applicant by ID
// @access   Public
const getApplicant = async (req: Request, res: Response) => {
  try {
    const applicants = await db.query(
      "select * from applicants where id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        applicant: applicants.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error! Unable to process request." });
  }
};

// @route    POST applicants/create
// @desc     Create an applicant
// @access   Public
const createApplicant = async (req: Request, res: Response) => {
  const { cohort_id, applicants } = req.body;

  try {
    const results = await db.query(
      `INSERT INTO applicants ( cohort_id, name, earnings_potential, hours_needed) 
      values ${applicants
        .map(
          (applicant: Applicant) =>
            `(${cohort_id}, '${applicant.name}', ${applicant.earnings_potential}, ${applicant.hours_needed})`
        )
        .join(",")} returning *`
    );

    res.status(201).json({
      status: "succes",
      data: {
        applicant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error! Unable to process request." });
  }
};

export default { getAll, createApplicant, getApplicant };
