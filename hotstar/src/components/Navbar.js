import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./Navbar.css";

function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "TV Shows", "Movies", "Sports", "Kids", "Premium"];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          <div className="logo-icon">H</div>
          <div className="logo-text">disney+<span>hotstar</span></div>
        </div>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li
              key={link}
              className={activeLink === link ? "active" : ""}
              onClick={() => setActiveLink(link)}
            >
              {link}
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="icon-btn" onClick={() => setSearchOpen((v) => !v)} title="Search">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button className="subscribe-btn">Subscribe</button>
          <div className="avatar" title="Profile">A</div>
        </div>
      </nav>

      {searchOpen && (
        <div className="search-overlay">
          <div className="search-overlay-inner">
            <SearchBar onSearch={onSearch} autoFocus />
            <button className="overlay-close" onClick={() => setSearchOpen(false)}>✕ Close</button>
          </div>
          <div className="search-popular">
            Popular:
            <span onClick={() => onSearch("Spider-Man")}>Spider-Man</span>
            <span onClick={() => onSearch("RRR")}>RRR</span>
            <span onClick={() => onSearch("Pathaan")}>Pathaan</span>
            <span onClick={() => onSearch("Pushpa")}>Pushpa</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
