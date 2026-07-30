import CheckboxGroup from "./CheckboxGroup";
import "./DiscoverSidebar.css";
import PersonSearch from "./PersonSearch";
import RangeFilter from "./RangeFilter";

function DiscoverSidebar({
  filters,
  selectedFilters,
  setSelectedFilters,
  onFilterChange,
  onClear,
}) {
  return (
    <aside className="discover-filters">
      <div className="filter-header">
        <h2>Filters</h2>

        <button type="button" onClick={onClear}>
          Clear All
        </button>
      </div>

      {/* Genres */}
      <CheckboxGroup
        title="Genres"
        category="genres"
        options={filters.genres}
        selectedValues={selectedFilters.genres}
        onChange={onFilterChange}
      />

      <CheckboxGroup
        title="Languages"
        category="languages"
        options={filters.languages}
        selectedValues={selectedFilters.languages}
        onChange={onFilterChange}
      />

      <CheckboxGroup
        title="Countries"
        category="countries"
        options={filters.countries}
        selectedValues={selectedFilters.countries}
        onChange={onFilterChange}
      />

      <CheckboxGroup
        title="Rated"
        category="rated"
        options={filters.rated}
        selectedValues={selectedFilters.rated}
        onChange={onFilterChange}
      />

      <RangeFilter
        title="IMDb Rating"
        minValue={0}
        maxValue={10}
        minPlaceholder="Min"
        maxPlaceholder="Max"
        minKey="minRating"
        maxKey="maxRating"
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      <RangeFilter
        title="Release Year"
        minValue={1900}
        maxValue={2100}
        minPlaceholder="From"
        maxPlaceholder="To"
        minKey="yearFrom"
        maxKey="yearTo"
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      <RangeFilter
        title="Runtime (min)"
        minValue={0}
        maxValue={500}
        minPlaceholder="Min"
        maxPlaceholder="Max"
        minKey="runtimeMin"
        maxKey="runtimeMax"
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      <PersonSearch
        title="Actor"
        placeholder="Search actor..."
        filterKey="cast"
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      <PersonSearch
        title="Director"
        placeholder="Search director..."
        filterKey="director"
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      <PersonSearch
        title="Writer"
        placeholder="Search writer..."
        filterKey="writer"
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </aside>
  );
}

export default DiscoverSidebar;
