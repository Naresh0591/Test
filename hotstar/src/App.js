import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Row from "./components/Row";
import SearchBar from "./components/SearchBar";
import MovieModal from "./components/MovieModal";
import LiveSports from "./components/LiveSports";
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

      {/* Category pills */}
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

      {/* Search results */}
      {searchResults.length > 0 && (
        <Row
          title="Search Results"
          fetchUrl=""
          moviesOverride={searchResults}
          onMovieClick={setSelectedMovie}
          isLarge
        />
      )}

      {/* Live Sports */}
      <LiveSports />

      {/* Content rows */}
      <Row
        title="Trending Now"
        fetchUrl={`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`}
        onMovieClick={setSelectedMovie}
        isLarge
      />
      <Row
        title="Popular Movies"
        fetchUrl={`${BASE_URL}/movie/popular?api_key=${API_KEY}`}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Top Rated"
        fetchUrl={`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`}
        onMovieClick={setSelectedMovie}
        isTopTen
      />
      <Row
        title="Action"
        fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Comedy"
        fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Thriller"
        fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=53`}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Animation"
        fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`}
        onMovieClick={setSelectedMovie}
      />
      <Row
        title="Adventure"
        fetchUrl={`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=12`}
        onMovieClick={setSelectedMovie}
      />

      {/* Movie detail modal */}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}

export default App;
