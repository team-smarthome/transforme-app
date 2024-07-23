import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./satoshi.css";
import { selectedRoutes } from "./utils/atomstates";
import { useAtom } from "jotai";

const RootComponent = () => {
  const [appMode] = useAtom(selectedRoutes);
  console.log(appMode, "appMode");

  return (
    <React.StrictMode>
      <Router basename={`${appMode}`}>
        <App />
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RootComponent />
);
