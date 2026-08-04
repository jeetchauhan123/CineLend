import "./FilterChips.css";

function FilterChips({ appliedFilters, setAppliedFilters, setDraftFilters }) {
  const chips = [];

  const remove = (key, value = null) => {
    setAppliedFilters((prev) => {
      const updated = { ...prev };

      if (Array.isArray(updated[key])) {
        updated[key] = updated[key].filter((item) => item !== value);
      } else {
        updated[key] = "";
      }

      setDraftFilters(updated);

      return updated;
    });
  };

  ["genres", "languages", "countries", "rated"].forEach((key) => {
    appliedFilters[key].forEach((item) =>
      chips.push({
        label: item,
        key,
        value: item,
      }),
    );
  });

  if (appliedFilters.cast)
    chips.push({
      label: appliedFilters.cast,
      key: "cast",
    });

  if (appliedFilters.director)
    chips.push({
      label: appliedFilters.director,
      key: "director",
    });

  if (appliedFilters.writer)
    chips.push({
      label: appliedFilters.writer,
      key: "writer",
    });

  if (!chips.length) return null;

  return (
    <div className="filter-chips">
      {chips.map((chip) => (
        <button
          key={chip.label}
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
