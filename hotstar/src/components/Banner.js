import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Banner.css";

function Banner({ apiKey, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((res) => setMovies(res.data.results.slice(0, 5)))
      .catch((err) => console.error("Banner fetch failed:", err));
  }, [apiKey]);

  const movie = movies[current];

  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [movies]);

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "…" : str;

  return (
    <header
      className="banner"
      style={{
        backgroundImage: movie
          ? `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`
          : "none",
      }}
    >
      <div className="banner-overlay" />
      <div className="banner-content">
        <div className="banner-badge">
          <span className="banner-badge-dot" />
          NOW STREAMING
        </div>
        <h1 className="banner-title">{movie?.title}</h1>
        <div className="banner-meta">
          <span className="banner-rating">★ {movie?.vote_average?.toFixed(1)}</span>
          <span className="banner-dot" />
          <span>{movie?.release_date?.split("-")[0]}</span>
          <span className="banner-dot" />
          <span>HD</span>
        </div>
        <p className="banner-description">{truncate(movie?.overview, 180)}</p>
        <div className="banner-actions">
          <button className="btn-play" onClick={() => onMovieClick && onMovieClick(movie)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a0a12">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Watch Now
          </button>
          <button className="btn-trailer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5,3 19,12 5,21" />
            </svg>
            Trailer
          </button>
          <button className="btn-add" title="Add to Watchlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
      <div className="banner-thumbs">
        {movies.map((m, i) => (
          <div
            key={m.id}
            className={`banner-thumb ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
            style={{ backgroundImage: `url("https://image.tmdb.org/t/p/w200${m.poster_path}")` }}
          />
        ))}
      </div>
      <div className="banner-dots">
        {movies.map((_, i) => (
          <div
            key={i}
            className={`banner-dot-btn ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </header>
  );
}

export default Banner;
