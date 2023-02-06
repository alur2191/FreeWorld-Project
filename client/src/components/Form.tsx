import React, { useEffect, useState } from "react";
import { CLIENT_RENEG_LIMIT } from "tls";
import styles from "./Form.module.scss";

interface IFormField {
  [p: string]: string | number | null;
}

const Form = () => {
  const [formFields, setFormFields] = useState<IFormField[]>([
    {
      student_name: null,
      hours_needed: null,
      earnings_potential: null,
    },
  ]);

  useEffect(() => {
    console.log("effect", formFields);
  }, [formFields]);

  // handle click event of the Add button
  const handleAddField = () => {
    setFormFields([
      ...formFields,
      {
        student_name: null,
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
          <label htmlFor="max_students">
            Number of Students for Consideration
          </label>
          <input type="text" id="max_students" />
        </div>
        {formFields.map((field, i) => (
          <div className={styles.studentRow} key={field.id}>
            <span>{`#${i + 1}`}</span>
            <div className={styles.studentField}>
              <label htmlFor={`studentName${i}`}>Student Name</label>
              <input
                type="text"
                id={`studentName${i}`}
                name="student_name"
                value={field.student_name ? field.student_name : ""}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>
            <div className={styles.studentField}>
              <label htmlFor={`hoursNeeded${i}`}>Hours Needed</label>
              <input
                type="number"
                id={`hoursNeeded${i}`}
                name="hours_needed"
                value={field.hours_needed ? field.hours_needed : ""}
                onChange={(e) => handleInputChange(e, i)}
              />
            </div>
            <div className={styles.studentField}>
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
