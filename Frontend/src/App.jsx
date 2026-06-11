import OnboardingModal from "./components/OnboardingModal/OnboardingModal";

import { movies } from "./data/movies";

import './App.css'


function App() {

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
