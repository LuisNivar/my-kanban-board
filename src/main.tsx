import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { Kanban } from "./components/Kanban.tsx";
import "./index.css";
import Settings from "./pages/Settings.tsx";
import Home from "./pages/home.tsx";
import NotFoundPage from "./pages/NoFoundPage.tsx";
import ValidateBoardId from "./ValidateBoardId.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/board/:id" element={<ValidateBoardId />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
