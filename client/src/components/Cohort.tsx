import React, { useContext } from 'react';
import { CohortContext } from '../context/CohortContext';

const Cohort: React.FC = () => {
  const { cohorts } = useContext(CohortContext);
      console.log("COHORT:",cohorts)
  return (
    <div>
    </div>
  );
};

export default Cohort;
