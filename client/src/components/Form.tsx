import React, { useContext, useState } from "react";
import { CohortContext } from "../context/CohortContext";
import styles from "./Form.module.scss";

interface Applicant {
  applicant_name: string | null;
  hours_needed: number | null;
  earnings_potential: number | null;
}
interface Applicants extends Array<Applicant> {}

const Form = () => {
  const { setCohorts } = useContext(CohortContext);
  const [currentMaxEarnings, setCurrentMaxEarnings] = useState<number>(0);
  const [maxCreditHours, setMaxCreditHours] = useState<number>(0);
  const [maxStudentsConsidered, setMaxStudentsConsidered] = useState<number>(0);
  const [passingStudents, setPassingStudents] = useState<string[]>();

  const [formFields, setFormFields] = useState<any>([
    {
      applicant_name: null,
      hours_needed: null,
      earnings_potential: null,
    },
  ]);
  // handle click event of the Add button
  const handleAddField = () => {
    setFormFields([
      ...formFields,
      {
        applicant_name: null,
        hours_needed: null,
        earnings_potential: null,
      },
    ]);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...formFields];
    list.splice(index, 1);
    setFormFields(list);
  };

  // handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value, type } = e.target;
    const fieldList = [...formFields];
    if (value === "") {
      fieldList[index][name] = null;
    } else {
      type === "number"
        ? (fieldList[index][name] = Number(value))
        : (fieldList[index][name] = value);
    }
    setFormFields(fieldList);
    calculate(formFields, maxCreditHours, maxStudentsConsidered);
  };

  const calculate = (
    applicants: Applicants,
    timeLimit: number,
    studentNumber: number
  ) => {
    let max = null;
    if (!applicants) return;

    for (let i = 0; i < applicants.length; i++) {
      let leftCount = i + 1;
      let leftSide = applicants.slice(0, leftCount);

      for (let x = i + 1; x < applicants.length; x++) {
        if (studentNumber - leftCount > applicants.length) break;

        let totalTime = 0;
        let studentList: any = [];
        const rightSide = applicants.slice(x, x + studentNumber - leftCount);
        const leftSum = leftSide.reduce((n, curr, y) => {
          totalTime += Number(leftSide[y].hours_needed);
          studentList.push(leftSide[y].applicant_name);
          return n + Number(curr.earnings_potential);
        }, 0);
        
        const rightSum = rightSide.reduce((n, curr, y) => {
          totalTime += Number(rightSide[y].hours_needed);
          studentList.push(rightSide[y].applicant_name);
          return n + Number(curr.earnings_potential);
        }, 0);

        const totalSum = leftSum + rightSum;

        if (totalTime > timeLimit) continue;
        if (max == null) {
          max = totalSum;
        } else if (totalSum > max) {
          max = totalSum;
          setPassingStudents(studentList);
        }
      }
    }
    setCurrentMaxEarnings(Number(max));
    return max;
  };

  return (
    <div className="applicant-form">
      <form className={styles.form}>
        <div className={styles.formContainer}>
          <label htmlFor="max_hours">Maximum Credit Hours</label>
          <input
            type="number"
            id="max_hours"
            onChange={(e) => setMaxCreditHours(Number(e.target.value))}
          />
        </div>
        <div className={styles.formContainer}>
          <label htmlFor="max_applicants">
            Number of Students for Consideration
          </label>
          <input
            type="number"
            id="max_applicants"
            onChange={(e) => setMaxStudentsConsidered(Number(e.target.value))}
          />
        </div>
        <h4>Applicants</h4>
        {formFields.map((field: Applicant, i: number) => (
          <div className={styles.applicantRow} key={i}>
            <span>{`#${i + 1}`}</span>
            <div className={styles.applicantField}>
              <label htmlFor={`applicantName${i}`}>Student Name</label>
              <input
                type="text"
                id={`applicantName${i}`}
                name="applicant_name"
                value={field.applicant_name ? field.applicant_name : ""}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>
            <div className={styles.applicantField}>
              <label htmlFor={`hoursNeeded${i}`}>Hours Needed</label>
              <input
                type="number"
                id={`hoursNeeded${i}`}
                name="hours_needed"
                value={field.hours_needed ? field.hours_needed : ""}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>
            <div className={styles.applicantField}>
              <label htmlFor={`earningsPotential${i}`}>
                Earnings Potential
              </label>
              <input
                type="number"
                id={`earningsPotential${i}`}
                name="earnings_potential"
                value={field.earnings_potential ? field.earnings_potential : ""}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>
            {formFields.length > 1 ? (
              <button
                className={styles.deleteButton}
                type="button"
                onClick={() => handleRemoveClick(i)}
              >
                Remove
              </button>
            ) : null}
          </div>
        ))}
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() =>
              calculate(formFields, maxCreditHours, maxStudentsConsidered)
            }
          >
            Calculate
          </button>
          <button type="button" onClick={handleAddField}>
            Add applicant
          </button>
        </div>

        <div>
          <p>
            <strong>Calculated Max Earnings: </strong>
            {currentMaxEarnings ? "$" + currentMaxEarnings : "N/A"}
          </p>
          <p>
            <strong>Passing Students: </strong>
            {passingStudents
              ? passingStudents.map((student) => student + " ")
              : "N/A"}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Form;
