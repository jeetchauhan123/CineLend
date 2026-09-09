import { useEffect, useRef, useState } from "react";

import useDebounce from "../../../hooks/useDebounce";
import { searchDiscoverPeople } from "../../../services/discoverService";
import { PERSON_TYPES } from "../../../constants/discover";

import "./PersonSearch.css";

function PersonSearch({
  title,
  placeholder,
  filterKey,
  filterState,
  setFilterState,
}) {
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState(filterState[filterKey] || "");

  const wrapperRef = useRef(null);

  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    setInput(filterState[filterKey] || "");
  }, [filterState, filterKey]);

  useEffect(() => {
    const close = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  useEffect(() => {
    const value = debouncedInput.trim();

    if (value.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    const fetchPeople = async () => {
      try {
        const response = await searchDiscoverPeople(
          PERSON_TYPES[filterKey],
          value,
        );

        setResults(response.data);
        setOpen(true);
      } catch (error) {
        console.error("Error loading people:", error);

        setResults([]);
        setOpen(false);
      }
    };

    fetchPeople();
  }, [debouncedInput, filterKey]);

  const choose = (person) => {
    setInput(person);

    setFilterState((previous) => ({
      ...previous,
      [filterKey]: person,
    }));

    setOpen(false);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    setInput(value);

    if (!value.trim()) {
      setResults([]);
      setOpen(false);

      setFilterState((previous) => ({
        ...previous,
        [filterKey]: "",
      }));
    }
  };

  return (
    <section className="filter-section">
      <h3>{title}</h3>

      <div className="person-search-wrapper" ref={wrapperRef}>
        <input
          className="person-search"
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={handleInputChange}
          onFocus={() => {
            if (results.length) {
              setOpen(true);
            }
          }}
        />

        {open && results.length > 0 && (
          <div className="person-dropdown">
            {results.map((person) => (
              <button
                key={person}
                type="button"
                className="person-option"
                onClick={() => choose(person)}
              >
                {person}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PersonSearch;
