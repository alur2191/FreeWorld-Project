
import db from "../config";
import express, { Request, Response } from "express";

const router = express.Router();

const readAll = async (req: Request, res: Response) => {
  try {
    const studentData = await db.query("select * from students");

    res.status(200).json({
      status: "success",
      results: studentData.rows.length,
      data: {
        students: studentData.rows,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error! Unable to process request." });
  }
};

const createStudent = async (req: Request, res: Response) => {
  try {
    const results = await db.query(
      "INSERT INTO students (cohort_id, applicant_id, name) values ($1, $2, $3) returning *",
      [
        req.body.cohort_id,
        req.body.applicant_id,
        req.body.name
      ]
    );

    res.status(201).json({
      status: "succes",
      data: {
        student: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error! Unable to process request." });
  }
};

const getStudent = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id)
    const students = await db.query(
      "select * from students where id = $1",
      [req.params.id]
    );
    
    res.status(200).json({
      status: "succes",
      data: {
        student: students.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error! Unable to process request." });
  }
}

export default { readAll, createStudent, getStudent }
