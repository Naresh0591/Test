import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, autoFocus }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    // Live search after 400ms debounce
    const timerRef = useRef(null);
    clearTimeout(timerRef.current);
     timerRef.current = setTimeout(() => { ... }, 400);
     };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <svg className="search-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search movies, shows, sports..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />

      {query && (
        <button type="button" className="clear-btn" onClick={handleClear}>
          ✕
        </button>
      )}

      <button type="submit" className="search-submit">Search</button>
    </form>
  );
}

export default SearchBar;
