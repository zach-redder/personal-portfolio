import React, { useEffect } from "react";
import { useRouter } from "next/router"; // Use Next.js's useRouter hook
import Newsletter from "./pages/newsletter.js"; // Ensure proper imports from pages folder
import MainApp from "./pages/index.js"; // Ensure proper import

import AOS from 'aos'; // For AOS animations

// Component to handle AOS refresh on route changes
function AnimationRefresh({ children }) {
  const router = useRouter();  // Access Next.js router
  
  useEffect(() => {
    // Refresh AOS animations when route changes
    AOS.init();
    AOS.refresh();
  }, [router.asPath]); // Trigger AOS refresh on pathname change

  return <>{children}</>;
}

// Main App Component for Next.js
function App() {
  return (
    <AnimationRefresh>
      <AppRoutes />
    </AnimationRefresh>
  );
}

// AppRoutes Component to handle routing in Next.js
function AppRoutes() {
  const router = useRouter();  // Use Next.js router for programmatic navigation

  useEffect(() => {
    // Check if the current path is neither '/' nor '/newsletter'
    if (router.asPath !== "/" && !router.asPath.startsWith("/newsletter")) {
      // If it is a different route, redirect to the homepage
      router.push("/");
    }
  }, [router]); // Run on path change

  return (
    <>
      {/* Next.js handles routing automatically based on pages directory */}
      <MainApp /> {/* This is your homepage component */}
      <Newsletter /> {/* Explicitly render other pages if necessary */}
    </>
  );
}

export default App;
