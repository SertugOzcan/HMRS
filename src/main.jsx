import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserPreferencesProvider } from "./context/UserPreferencesContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SidebarCheckForSupervisorContextProvider } from "./context/SidebarCheckForSupervisorContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserPreferencesProvider>
      <AuthContextProvider>
        <SidebarCheckForSupervisorContextProvider>
          <App />
        </SidebarCheckForSupervisorContextProvider>
      </AuthContextProvider>
    </UserPreferencesProvider>
  </React.StrictMode>
);
