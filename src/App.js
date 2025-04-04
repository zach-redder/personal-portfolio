// Imports from react
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Newsletter from "./pages/Newsletter.js";
import AOS from 'aos';

// Imports from our components folder
import MainApp from "./pages/Main.js";

// Component to handle AOS refresh on route changes
function AnimationRefresh({ children }) {
  const location = useLocation();
  
  useEffect(() => {
    // Refresh AOS animations when route changes
    AOS.refresh();
  }, [location]);

  return <>{children}</>;
}

// Our main app component
function App() {
  return (
    // Router component to handle routing from pages
    <Router className="router">
      <AnimationRefresh>
        <Routes>
          <Route path="/" element={<MainApp/>} />
          <Route path="/newsletter" element={<Newsletter/>} />
          <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>
      </AnimationRefresh>
    </Router>
  );
}

export default App;
