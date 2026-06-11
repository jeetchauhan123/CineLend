import OnboardingModal from "./components/OnboardingModal/OnboardingModal";

import { movies } from "./data/movies";

import './App.css'
import { useState } from "react";


function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <div>
      {showOnboarding && (
        <OnboardingModal
          onClose={() => setShowOnboarding(false)}
        />
      )}

    </div>
  )
}

export default App
