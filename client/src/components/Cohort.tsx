import React, { useContext } from "react";
import { CohortContext } from "../context/CohortContext";

const Cohort: React.FC = () => {
  const { cohorts } = useContext(CohortContext);
  return <div></div>;
};

export default Cohort;
