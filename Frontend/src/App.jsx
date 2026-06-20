import OnboardingModal from "./components/OnboardingModal/OnboardingModal";
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer';
import { movies } from "./data/movies";

import { useEffect, useState } from 'react';

import './App.css'
import { Outlet } from "react-router-dom";


function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <div>
      {showOnboarding && (
        <OnboardingModal
          onClose={() => setShowOnboarding(false)}
        />
      )}

      <Navbar 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Outlet />

      <Footer />
    </div>
  )
}

export default App
