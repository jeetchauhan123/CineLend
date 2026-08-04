import "./RangeFilter.css";

function RangeFilter({
  title,
  minValue,
  maxValue,
  minPlaceholder,
  maxPlaceholder,
  minKey,
  maxKey,
  draftFilters,
  setDraftFilters,
}) {
  const updateValue = (key, value) => {
    setDraftFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  return (
    <section className="filter-section">
      <h3>{title}</h3>

      <div className="range-filter">
        <input
          type="number"
          placeholder={minPlaceholder}
          value={draftFilters[minKey]}
          min={minValue}
          max={maxValue}
          onChange={(e) =>
            updateValue(minKey, e.target.value)
          }
        />

        <span>—</span>

        <input
          type="number"
          placeholder={maxPlaceholder}
          value={draftFilters[maxKey]}
          min={minValue}
          max={maxValue}
          onChange={(e) =>
            updateValue(maxKey, e.target.value)
          }
        />
      </div>
    </section>
  );
}

export default RangeFilter;
