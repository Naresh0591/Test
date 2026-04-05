import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, autoFocus }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  
  // FIXED: timerRef must be at the top level, not inside handleChange
  const timerRef = useRef(null);

  // Focus the input on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
    
    // CLEANUP: Clear any pending timers when the component unmounts
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [autoFocus]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // 1. Clear the existing timer whenever the user types
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 2. Set a new timer to trigger live search after 400ms of no typing
    timerRef.current = setTimeout(() => {
      onSearch(value);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear the timer since we are performing an manual search now
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      {/* Magnifying Glass Icon */}
      <svg 
        className="search-icon" 
        width="16" 
        height="16" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="2"
      >
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

      {/* Show 'X' button only when there is text in the box */}
      {query && (
        <button type="button" className="clear-btn" onClick={handleClear}>
          ✕
        </button>
      )}

      <button type="submit" className="search-submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
