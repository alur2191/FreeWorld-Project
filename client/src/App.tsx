import CohortInfo from "./components/Cohort";
import Form from "./components/Form";
import { CohortContextProvider } from "./context/CohortContext";

function App() {
  return (
    <CohortContextProvider>
      <div className="App">
        <Form />
        <CohortInfo />
      </div>
    </CohortContextProvider>
  );
}

export default App;
