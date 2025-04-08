// Imports from React
import React, { useEffect } from "react";
import { useRouter } from 'next/router'; // Next.js router
import AOS from 'aos'; // Animation library

// Imports from our components folder
import MainApp from "./pages"; // Page components in Next.js (no .js extension required)

// Component to handle AOS refresh on route changes
function AnimationRefresh({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Refresh AOS animations on route changes
    AOS.refresh();
  }, [router.asPath]); // Trigger on route change

  return <>{children}</>;
}

// Main component with navigation logic
export default function App() {
  return (
    <AnimationRefresh>
      <MainApp /> {/* Use your main page component here */}
    </AnimationRefresh>
  );
}
