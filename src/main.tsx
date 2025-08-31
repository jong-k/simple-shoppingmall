import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppProvider from "./app/providers";
import AppRouter from "./app/router";
import "./app/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </StrictMode>
);
