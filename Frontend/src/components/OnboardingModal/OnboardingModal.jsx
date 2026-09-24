import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import "./OnboardingModal.css";

const ageRanges = [
  "Under 18",
  "18 - 24",
  "25 - 34",
  "35 - 44",
  "45 - 54",
  "55+",
];

function OnboardingModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [storage, setStorage] = useState({
    age: "",
    genres: [],
  });
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/movies/genres`);

        setGenres(res.data);
      } catch (error) {
        console.error("Error loading genres:", error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    if (!showError) return;

    const timer = setTimeout(() => {
      setShowError(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showError]);

  function navigation(ch) {
    let updatedPrefs = {};
    switch (ch) {
      case 2:
        if (!selectedAge) {
          setShowError(true);
          return;
        }
        updatedPrefs = { ...storage, age: selectedAge };
        setStorage(updatedPrefs);
        localStorage.setItem("pref", JSON.stringify(updatedPrefs));
        setStep(3)
        break;
      case 3:
        updatedPrefs = { ...storage, genres: selectedGenres };
        setStorage(updatedPrefs);
        localStorage.setItem("pref", JSON.stringify(updatedPrefs));
        onClose();
        break;
    }
  }

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <div className="progress-dots">
          <span className={step === 1 ? "active" : ""}></span>
          <span className={step === 2 ? "active" : ""}></span>
          <span className={step === 3 ? "active" : ""}></span>
        </div>

        {step === 1 && (
          <div className="step-content">
            <div className="welcome-icon">🎬</div>

            <h2>Welcome to CineLend</h2>

            <p>
              Discover movies you'll love, <br />
              not just what's trending.
            </p>

            <button className="primary-btn" onClick={() => setStep(2)}>
              Get Started
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            {showError && <p style={{ color: 'red' }}>Please select age</p>}
            <h2>Choose Your Age Group</h2>

            <p>This helps us recommend movies that match your interests.</p>

            <div className="age-grid">
              {ageRanges.map((age) => (
                <button
                  key={age}
                  className={`age-chip ${
                    selectedAge === age ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAge(age)}
                >
                  {age}
                </button>
              ))}
            </div>

            <div className="onboard-buttons">
              <button className="secondary-btn" onClick={() => setStep(1)}>
                Back
              </button>

              <button className="primary-btn" onClick={() => navigation(step)}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h2>Select Genres</h2>

            <div className="genre-grid">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`genre-chip ${
                    selectedGenres.includes(genre) ? "selected" : ""
                  }`}
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>

            <div className="onboard-buttons">
              <button className="secondary-btn" onClick={() => setStep(2)}>
                Back
              </button>

              <button className="primary-btn" onClick={() => navigation(step)}>
                Explore
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnboardingModal;
