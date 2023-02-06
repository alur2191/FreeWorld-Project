import React, { useState, createContext, ReactNode } from "react";

interface Cohort {
  max_earnings: number;
  students: Students[];
}

interface Students {
  student_name: string | null;
  earnings_potential: number;
}

interface CohortContextValue {
  cohorts: Cohort | null;
  setCohorts: React.Dispatch<React.SetStateAction<Cohort | null>>;
}

type Props = {
  children: ReactNode;
};

const CohortContext = createContext<CohortContextValue>({
  cohorts: null,
  setCohorts: function (value: React.SetStateAction<Cohort | null>): void {
    throw new Error("Function not implemented.");
  },
});

const CohortContextProvider = (props: Props) => {
  const [cohorts, setCohorts] = useState<Cohort | null>({
    max_earnings: 0,
    students: [{ student_name: null, earnings_potential: 0 }],
  });

  return (
    <CohortContext.Provider
      value={{
        cohorts,
        setCohorts,
      }}
    >
      {props.children}
    </CohortContext.Provider>
  );
};

export { CohortContext, CohortContextProvider };
