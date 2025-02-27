import { BrowserRouter } from "react-router";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="app w-[97vw]">
        <Dashboard />
      </div>
    </BrowserRouter>
  );
}

export default App;
