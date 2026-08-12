import { useEffect, useRef, useState } from "react";
import axios from "axios";
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
  const [input, setInput] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    const value = input;

    if (value.trim().length < 2) {
      setResults([]);
      setOpen(false);
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

        const res = await axios.get("http://localhost:3000/movies/people", {
          params: {
            type,
            search: value,
          },
        });

        setResults(res.data);
        setOpen(true);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input, filterKey]);

  const choose = (person) => {
    setInput(person);

    setFilterState((prev) => ({
      ...prev,
      [filterKey]: person,
    }));

    setOpen(false);
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
          onChange={(e) => {
            setInput(e.target.value);

            if (!e.target.value.trim()) {
              setResults([]);
              setOpen(false);

              setFilterState((prev) => ({
                ...prev,
                [filterKey]: "",
              }));
            }
          }}
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
