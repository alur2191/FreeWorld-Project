import db from "../config";
import express, { Request, Response } from "express";

const router = express.Router();

interface Student {
  name: string;
  cohort_id: number;
  applicant_id: number;
}

// @route    GET students/get
// @desc     Get all students
// @access   Public
const getAll = async (req: Request, res: Response) => {
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

// @route    GET students/get/:id
// @desc     Get a student by ID
// @access   Public
const getStudent = async (req: Request, res: Response) => {
  try {
    const students = await db.query("select * from students where id = $1", [
      req.params.id,
    ]);

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
};

// @route    POST students/create
// @desc     Create a student
// @access   Public
const createStudent = async (req: Request, res: Response) => {
  const { studentsList: students} = req.body;
  try {
    const results = await db.query(
      `INSERT INTO students (cohort_id, applicant_id, name) values ${students
        .map(
          (student: Student) =>
            `(${student.cohort_id}, ${student.applicant_id}, '${student.name}')`
        )
        .join(",")} returning *`
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

export default { getAll, createStudent, getStudent };
