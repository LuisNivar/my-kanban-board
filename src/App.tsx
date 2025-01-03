import "./App.css";
import { Kanban } from "./components/Kanban";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Kanban />
    </div>
  );
}

export default App;
