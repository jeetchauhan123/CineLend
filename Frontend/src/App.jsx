import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import OnboardingModal from "./components/OnboardingModal/OnboardingModal";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import { useTheme } from "./context/ThemeContext";

import "./App.css";

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    const pref = localStorage.getItem("pref");

    if (pref) {
      setShowOnboarding(false);
    }
  }, []);

  return (
    <div>
      {showOnboarding && (
        <OnboardingModal onClose={() => setShowOnboarding(false)} />
      )}

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onClose={() => setShowOnboarding(true)}
      />

      <Outlet />

      <Footer />
    </div>
  );
}

export default App;
