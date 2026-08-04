import { useState } from "react";
import CheckboxGroup from "./CheckboxGroup";
import "./DiscoverSidebar.css";
import FilterGroup from "./FilterGroup";
import PersonSearch from "./PersonSearch";
import RangeFilter from "./RangeFilter";


function DiscoverSidebar({
  filters,
  draftFilters,
  setDraftFilters,
  onFilterChange,
  onClear,
  onApply,
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
            selectedValues={draftFilters.genres}
            onChange={onFilterChange}
          />

          <CheckboxGroup
            title="Languages"
            category="languages"
            options={filters.languages}
            selectedValues={draftFilters.languages}
            onChange={onFilterChange}
          />

          <CheckboxGroup
            title="Countries"
            category="countries"
            options={filters.countries}
            selectedValues={draftFilters.countries}
            onChange={onFilterChange}
          />

          <CheckboxGroup
            title="Rated"
            category="rated"
            options={filters.rated}
            selectedValues={draftFilters.rated}
            onChange={onFilterChange}
          />
        </FilterGroup>

        <FilterGroup
          title="Range"
          isOpen={openGroup === "numbers"}
          onToggle={() =>
            setOpenGroup((prev) => (prev === "numbers" ? null : "numbers"))
          }
        >
          <RangeFilter
            title="IMDb Rating"
            minValue={0}
            maxValue={10}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            minKey="minRating"
            maxKey="maxRating"
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
          />

          <RangeFilter
            title="Release Year"
            minValue={1900}
            maxValue={2100}
            minPlaceholder="From"
            maxPlaceholder="To"
            minKey="yearFrom"
            maxKey="yearTo"
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
          />

          <RangeFilter
            title="Runtime (min)"
            minValue={0}
            maxValue={500}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            minKey="runtimeMin"
            maxKey="runtimeMax"
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
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
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
          />

          <PersonSearch
            title="Director"
            placeholder="Search director..."
            filterKey="director"
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
          />

          <PersonSearch
            title="Writer"
            placeholder="Search writer..."
            filterKey="writer"
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
          />
        </FilterGroup>
      </div>

      <div className="filter-actions">
        <button className="apply-filter-btn" onClick={onApply}>
          Apply Filters
        </button>
      </div>
    </aside>
  );
}

export default DiscoverSidebar;
