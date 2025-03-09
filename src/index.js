import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use ReactDOM from "react-dom/client"
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// Create a root and render the App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// Register the service worker
serviceWorkerRegistration.register();
