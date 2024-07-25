import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./satoshi.css";

const RootComponent = () => {
  return (
    <React.StrictMode>
      <Router basename="/transforme-monitoring-system">
        <App />
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RootComponent />
);
