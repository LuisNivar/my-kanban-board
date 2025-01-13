import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "./SidebarProvider";

function App() {
  return (
    <div className="flex items-center">
      <SidebarProvider>
        <Sidebar />
        <Outlet />
      </SidebarProvider>
    </div>
  );
}

export default App;
