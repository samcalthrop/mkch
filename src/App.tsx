
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProjectView } from "./screens/ProjectView/ProjectView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectView />} />
      <Route path="/projectView/*" element={<ProjectView />} />
    </Routes>
  );
}

export default App;
