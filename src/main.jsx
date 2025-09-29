import React from "react";
import ReactDOM from "react-dom/client";
import KnittingCalculator from "./KnittingCalculator";

// Import Bootstrap CSS here
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <KnittingCalculator />
    </React.StrictMode>
);
