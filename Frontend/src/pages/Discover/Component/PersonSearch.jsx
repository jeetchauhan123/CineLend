import "./PersonSearch.css";

function PersonSearch({
  title,
  placeholder,
  filterKey,
  selectedFilters,
  setSelectedFilters,
}) {
  return (
    <section className="filter-section">
      <h3>{title}</h3>

      <input
        className="person-search"
        type="text"
        placeholder={placeholder}
        value={selectedFilters[filterKey]}
        onChange={(e) =>
          setSelectedFilters((previous) => ({
            ...previous,
            [filterKey]: e.target.value,
          }))
        }
      />
    </section>
  );
}

export default PersonSearch;
