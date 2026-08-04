import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./PersonSearch.css";

function PersonSearch({
  title,
  placeholder,
  filterKey,
  draftFilters,
  setDraftFilters,
}) {
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () =>
      document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    const value = draftFilters[filterKey];

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const type =
          filterKey === "cast"
            ? "cast"
            : filterKey === "director"
            ? "directors"
            : "writers";

        const res = await axios.get(
          "http://localhost:3000/movies/people",
          {
            params: {
              type,
              search: value,
            },
          }
        );

        setResults(res.data);
        setOpen(true);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [draftFilters, filterKey]);

  const choose = (person) => {
    setDraftFilters((prev) => ({
      ...prev,
      [filterKey]: person,
    }));

    setResults([]);
    setOpen(false);
  };

  return (
    <section className="filter-section">
      <h3>{title}</h3>

      <div
        className="person-search-wrapper"
        ref={wrapperRef}
      >
        <input
          className="person-search"
          type="text"
          placeholder={placeholder}
          value={draftFilters[filterKey]}
          onChange={(e) =>
            setDraftFilters((prev) => ({
              ...prev,
              [filterKey]: e.target.value,
            }))
          }
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