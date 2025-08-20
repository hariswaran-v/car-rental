import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom"; // <-- change here
import { AppProvider } from "./context/AppContext.jsx";
import { MotionConfig } from "framer-motion";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <AppProvider>
      <MotionConfig viewport={{ once: true }}>
        <App />
      </MotionConfig>
    </AppProvider>
  </HashRouter>
);
