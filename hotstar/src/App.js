import React, { useState } from "react";
// Updated lowercase imports
import Navbar from "./components/navbar";
import Banner from "./components/banner";
import Row from "./components/row";
import SearchBar from "./components/search-bar";
import MovieModal from "./components/movie-modal";
import LiveSports from "./components/live-sports";
import "./App.css";

const API_KEY = process.env.REACT_APP_TMDB;
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All", "Movies", "Web Series", "Action", "Comedy",
    "Thriller", "Romance", "Horror", "Sci-Fi", "Animation",
    "Hindi", "Tamil", "Telugu",
  ];

  const handleSearch = async (query) => {
    if (!query) { setSearchResults([]); return; }
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    setSearchResults(data.results || []);
  };

  return (
    <div className="app">
      <Navbar onSearch={handleSearch} />
      <Banner apiKey={API_KEY} onMovieClick={setSelectedMovie} />

      <div className="categories">
        {categories.map((cat) => (
          <div
            key={cat}
            className={`cat-pill ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      {searchResults.length > 0 && (
        <Row
          title="Search Results"
          fetchUrl=""
          moviesOverride={searchResults}
          onMovieClick={setSelectedMovie}
          isLarge
        />
      )}

      <LiveSports />

      <Row
        title="Trending Now"
        fetchUrl={`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`}
        onMovieClick={setSelectedMovie}
        isLarge
      />
      
      {/* Rest of your Rows stay the same... */}

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}

export default App;
