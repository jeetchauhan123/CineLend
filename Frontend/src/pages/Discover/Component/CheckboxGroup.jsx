import { useState } from "react";
import { CHECKBOX_VISIBLE_COUNT } from "../../../constants/discover";
import "./CheckboxGroup.css";

function CheckboxGroup({ title, category, options, selectedValues, onChange }) {
  const [expanded, setExpanded] = useState(false);

  const visibleOptions = expanded
    ? options
    : options.slice(0, CHECKBOX_VISIBLE_COUNT);

  return (
    <section className="filter-section">
      <h3>{title}</h3>

      <div className="filter-list">
        {visibleOptions.map((option) => (
          <label key={option} className="filter-checkbox">
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => onChange(category, option)}
            />
            <span className="checkbox" />
            <span>{option}</span>
          </label>
        ))}
      </div>

      {options.length > CHECKBOX_VISIBLE_COUNT && (
        <button
          className="show-more-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded
            ? "Show Less"
            : `Show ${options.length - CHECKBOX_VISIBLE_COUNT} More`}
        </button>
      )}
    </section>
  );
}

export default CheckboxGroup;
