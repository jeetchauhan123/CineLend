import { useState } from "react";
import "./OnboardingModal.css";
import axios from 'axios'
import { useEffect } from "react";

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
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAge, setSelectedAge] = useState("");


  useEffect(() => {
    const fetchgenre = async ()=>{
      try {
        const res = await axios.get("http://localhost:3000/movies/genres");
        setGenres(res.data);
      } catch (error) {
        console.log("no genre gound");
      }
    }
    fetchgenre();
  }, [])

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
        <button className="close-btn" onClick={onClose}>✕</button>
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
              Discover movies you'll love, <br/>
              not just what's trending.
            </p>

            <button className="primary-btn" onClick={() => setStep(2)}>
              Get Started
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
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

              <button className="primary-btn" onClick={() => setStep(3)}>
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

              <button className="primary-btn" onClick={onClose}>
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
