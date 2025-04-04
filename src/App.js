// Imports from react
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Newsletter from "./pages/Newsletter.js";

// Imports from our components folder
import MainApp from "./pages/Main.js";

// Our main app component
function App() {
  return (
    // Router component to handle routing from pages
    <Router className="router">
      <Routes>
        <Route path="/" element={<MainApp/>} />
        <Route path="/newsletter" element={<Newsletter/>} />
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </Router>
  );
}

export default App;
