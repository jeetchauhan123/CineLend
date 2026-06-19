import OnboardingModal from "./components/OnboardingModal/OnboardingModal";
import Navbar from './components/Navbar/Navbar'

import { movies } from "./data/movies";

import './App.css'
import { useEffect, useState } from "react";
import HeroSlider from "./components/HeroSlider/HeroSlider";
import Home from "./components/homemovie/HomeMovies";
import Footer from "./components/Footer/Footer";


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

      <HeroSlider />

      <Home />

      <Footer />
    </div>
  )
}

export default App
