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

  ["genres", "languages", "countries", "rated"].forEach((key) => {
    filterState[key].forEach((item) =>
      chips.push({
        label: item,
        key,
        value: item,
      }),
    );
  });

  if (filterState.cast)
    chips.push({
      label: filterState.cast,
      key: "cast",
    });

  if (filterState.director)
    chips.push({
      label: filterState.director,
      key: "director",
    });

  if (filterState.writer)
    chips.push({
      label: filterState.writer,
      key: "writer",
    });

  if (!chips.length) return null;

  return (
    <div className="filter-chips">
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value ?? chip.label}`}
          className="filter-chip"
          onClick={() => remove(chip.key, chip.value)}
        >
          {chip.label}

          <span>✕</span>
        </button>
      ))}
    </div>
  );
}

export default FilterChips;
