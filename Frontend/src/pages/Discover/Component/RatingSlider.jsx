import { Range, getTrackBackground } from "react-range";
import { RATING_CONFIG } from "../../../constants/discover";
import "./RatingSlider.css";

function RatingSlider({ filterState, setFilterState }) {
  const values = [
    Number(filterState.minRating || RATING_CONFIG.min),
    Number(filterState.maxRating || RATING_CONFIG.max),
  ];

  const handleChange = ([min, max]) => {
    if (max - min < RATING_CONFIG.minDistance) {
      return;
    }

    setFilterState((prev) => ({
      ...prev,
      minRating: min,
      maxRating: max,
    }));
  };

  return (
    <section className="filter-slider">
      <h3>IMDb Rating</h3>

      <div className="rating-header">
        <span>{values[0].toFixed(1)}</span>

        <span className="rating-divider">—</span>

        <span>{values[1].toFixed(1)}</span>
      </div>

      <Range
        values={values}
        min={RATING_CONFIG.min}
        max={RATING_CONFIG.max}
        step={RATING_CONFIG.step}
        allowOverlap={false}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="rating-track"
            style={{
              ...props.style,
              background: getTrackBackground({
                values,
                min: RATING_CONFIG.min,
                max: RATING_CONFIG.max,
                colors: [
                  "var(--button-bg)",
                  "var(--accent)",
                  "var(--button-bg)",
                ],
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} className="rating-thumb">
            <div className="rating-thumb-inner" />
          </div>
        )}
      />
    </section>
  );
}

export default RatingSlider;
