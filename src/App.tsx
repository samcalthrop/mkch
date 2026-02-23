
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProjectView } from "./screens/ProjectView/ProjectView";
import { WindowShell } from "./WindowShell/WindowShell";

function App() {

  return (
    <Routes>
      <Route element={<WindowShell />}>
        <Route path="/" element={<ProjectView />} />
        <Route path="/projectView/*" element={<ProjectView />} />
      </Route>
    </Routes>
  );
}

export default App;
