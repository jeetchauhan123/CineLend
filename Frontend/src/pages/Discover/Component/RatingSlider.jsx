import { Range, getTrackBackground } from "react-range";
import "./RatingSlider.css";

const MIN = 0;
const MAX = 10;
const STEP = 0.1;
const MIN_DISTANCE = 0.1;

function RatingSlider({ filterState, setFilterState }) {
  const values = [
    Number(filterState.minRating || MIN),
    Number(filterState.maxRating || MAX),
  ];

  const handleChange = ([min, max]) => {
    if (max - min < MIN_DISTANCE) {
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
        min={MIN}
        max={MAX}
        step={STEP}
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
                min: MIN,
                max: MAX,
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
          <div
            {...props}
            className="rating-thumb"
          >
            <div className="rating-thumb-inner" />
          </div>
        )}
      />
    </section>
  );
}

export default RatingSlider;