// Imports from react
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Imports from our components folder
import MainApp from "./pages/Main.js";

// Our main app component
function App() {
  return (
    // Router component to handle routing from pages
    <Router claassName="router">
      <Routes>
        <Route path="/" element={<MainApp/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
