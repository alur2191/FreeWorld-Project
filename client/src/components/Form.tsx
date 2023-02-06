import React, { useContext, useEffect, useState } from "react";
import { CohortContext } from "../context/CohortContext";
import styles from "./Form.module.scss";

interface IFormField {
  [p: string]: string | number | null;
}

const Form = () => {
  const { setCohorts } = useContext(CohortContext);
  const [formFields, setFormFields] = useState<IFormField[]>([
    {
      applicant_name: null,
      hours_needed: null,
      earnings_potential: null,
    },
  ]);

  useEffect(() => {
    console.log("effect", formFields);
    setCohorts({max_earnings: 1000,
      students: [{ student_name: "hello world", earnings_potential: 1000 }]})
  }, [formFields]);

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
    const { name, value } = e.target;
    const fieldList = [...formFields];
    if (value === "") {
      fieldList[index][name] = null;
    } else {
      fieldList[index][name] = value;
    }
    setFormFields(fieldList);
  };

  return (
    <div className="applicant-form">
      <form className={styles.form}>
        <div className={styles.formContainer}>
          <label htmlFor="max_hours">Maximum Credit Hours</label>
          <input type="text" id="max_hours" />
        </div>
        <div className={styles.formContainer}>
          <label htmlFor="max_applicants">
            Number of Students for Consideration
          </label>
          <input type="text" id="max_applicants" />
        </div>
        {formFields.map((field, i) => (
          <div className={styles.applicantRow} key={field.id}>
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
        <button type="button" onClick={handleAddField}>
          Add field
        </button>
      </form>
    </div>
  );
};

export default Form;
