import { useState } from "react";
import CheckboxGroup from "./CheckboxGroup";
import "./DiscoverSidebar.css";
import FilterGroup from "./FilterGroup";
import PersonSearch from "./PersonSearch";
import RangeFilter from "./RangeFilter";
import FilterChips from "./FilterChips";
import RatingSlider from "./RatingSlider";

function DiscoverSidebar({
  filters,
  filterState,
  setFilterState,
  onFilterChange,
  onClear,
}) {
  const [openGroup, setOpenGroup] = useState("categories");

  return (
    <aside className="discover-filters">
      <div className="filter-top">
        <div className="filter-header">
          <h2>Filters</h2>

          <button type="button" onClick={onClear}>
            Clear All
          </button>
        </div>
        <FilterChips
          filterState={filterState}
          setFilterState={setFilterState}
        />
      </div>

      <div className="filter-content">
        <FilterGroup
          title="Categories"
          isOpen={openGroup === "categories"}
          onToggle={() =>
            setOpenGroup((prev) =>
              prev === "categories" ? null : "categories",
            )
          }
        >
          <CheckboxGroup
            title="Genres"
            category="genres"
            options={filters.genres}
            selectedValues={filterState.genres}
            onChange={onFilterChange}
          />

          <CheckboxGroup
            title="Languages"
            category="languages"
            options={filters.languages}
            selectedValues={filterState.languages}
            onChange={onFilterChange}
          />

          <CheckboxGroup
            title="Countries"
            category="countries"
            options={filters.countries}
            selectedValues={filterState.countries}
            onChange={onFilterChange}
          />

          <CheckboxGroup
            title="Rated"
            category="rated"
            options={filters.rated}
            selectedValues={filterState.rated}
            onChange={onFilterChange}
          />
        </FilterGroup>

        <FilterGroup
          title="Range"
          isOpen={openGroup === "range"}
          onToggle={() =>
            setOpenGroup((prev) => (prev === "range" ? null : "range"))
          }
        >
          
          <RatingSlider
            filterState={filterState}
            setFilterState={setFilterState}
          />

          <RangeFilter
            title="Release Year"
            minValue={1900}
            maxValue={2100}
            minPlaceholder="From"
            maxPlaceholder="To"
            minKey="yearFrom"
            maxKey="yearTo"
            filterState={filterState}
            setFilterState={setFilterState}
          />

          <RangeFilter
            title="Runtime (min)"
            minValue={0}
            maxValue={500}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            minKey="runtimeMin"
            maxKey="runtimeMax"
            filterState={filterState}
            setFilterState={setFilterState}
          />
        </FilterGroup>

        <FilterGroup
          title="People"
          isOpen={openGroup === "people"}
          onToggle={() =>
            setOpenGroup((prev) => (prev === "people" ? null : "people"))
          }
        >
          <PersonSearch
            title="Actor"
            placeholder="Search actor..."
            filterKey="cast"
            filterState={filterState}
            setFilterState={setFilterState}
          />

          <PersonSearch
            title="Director"
            placeholder="Search director..."
            filterKey="director"
            filterState={filterState}
            setFilterState={setFilterState}
          />

          <PersonSearch
            title="Writer"
            placeholder="Search writer..."
            filterKey="writer"
            filterState={filterState}
            setFilterState={setFilterState}
          />
        </FilterGroup>
      </div>
    </aside>
  );
}

export default DiscoverSidebar;
