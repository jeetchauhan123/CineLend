import "./FilterChips.css";

function FilterChips({ filterState, setFilterState }) {
  const chips = [];

  const remove = (key, value = null) => {
    setFilterState((prev) => {
      const updated = {
        ...prev,
      };

      if (Array.isArray(updated[key])) {
        updated[key] = updated[key].filter((item) => item !== value);
      } else {
        updated[key] = "";
      }

      return updated;
    });
  };

  // Array-based filters
  const arrayFilters = [
    { key: "genres", label: "Genre" },
    { key: "languages", label: "Language" },
    { key: "countries", label: "Country" },
    { key: "rated", label: "Rated" },
  ];

  arrayFilters.forEach(({ key, label }) => {
    filterState[key].forEach((item) => {
      chips.push({
        label: `${label}: ${item}`,
        key,
        value: item,
      });
    });
  });

  // People filters
  if (filterState.cast) {
    chips.push({
      label: `Actor: ${filterState.cast}`,
      key: "cast",
    });
  }

  if (filterState.director) {
    chips.push({
      label: `Director: ${filterState.director}`,
      key: "director",
    });
  }

  if (filterState.writer) {
    chips.push({
      label: `Writer: ${filterState.writer}`,
      key: "writer",
    });
  }

  // Rating
  if (filterState.minRating && filterState.maxRating) {
    chips.push({
      label: `Rating: ${filterState.minRating}–${filterState.maxRating}`,
      key: "rating",
      removeKeys: ["minRating", "maxRating"],
    });
  } else if (filterState.minRating) {
    chips.push({
      label: `Rating: ${filterState.minRating}+`,
      key: "minRating",
    });
  } else if (filterState.maxRating) {
    chips.push({
      label: `Rating: ${filterState.maxRating} or less`,
      key: "maxRating",
    });
  }

  // Year
  if (filterState.yearFrom && filterState.yearTo) {
    chips.push({
      label: `Year: ${filterState.yearFrom}–${filterState.yearTo}`,
      key: "year",
      removeKeys: ["yearFrom", "yearTo"],
    });
  } else if (filterState.yearFrom) {
    chips.push({
      label: `Year: ${filterState.yearFrom}+`,
      key: "yearFrom",
    });
  } else if (filterState.yearTo) {
    chips.push({
      label: `Year: ${filterState.yearTo} or earlier`,
      key: "yearTo",
    });
  }

  // Runtime
  if (filterState.runtimeMin && filterState.runtimeMax) {
    chips.push({
      label: `Runtime: ${filterState.runtimeMin}–${filterState.runtimeMax} min`,
      key: "runtime",
      removeKeys: ["runtimeMin", "runtimeMax"],
    });
  } else if (filterState.runtimeMin) {
    chips.push({
      label: `Runtime: ${filterState.runtimeMin}+ min`,
      key: "runtimeMin",
    });
  } else if (filterState.runtimeMax) {
    chips.push({
      label: `Runtime: ${filterState.runtimeMax} min or less`,
      key: "runtimeMax",
    });
  }

  if (!chips.length) return null;

  return (
    <div className="filter-chips">
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value ?? chip.label}`}
          className="filter-chip"
          onClick={() => {
            if (chip.removeKeys) {
              setFilterState((prev) => {
                const updated = { ...prev };

                chip.removeKeys.forEach((key) => {
                  updated[key] = "";
                });

                return updated;
              });
            } else {
              remove(chip.key, chip.value);
            }
          }}
        >
          {chip.label}
          <span>✕</span>
        </button>
      ))}
    </div>
  );
}

export default FilterChips;
