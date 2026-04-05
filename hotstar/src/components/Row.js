import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Row.css";

const IMG_BASE = "https://image.tmdb.org/t/p";

function Row({ title, fetchUrl, moviesOverride, onMovieClick, isLarge, isTopTen }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (moviesOverride) { setMovies(moviesOverride); return; }
    if (!fetchUrl) return;
    axios.get(fetchUrl)
      .then((res) => setMovies(res.data.results || []))
      .catch((err) => console.error(`Row [${title}] fetch failed:`, err));
  }, [fetchUrl, moviesOverride]);

  if (!movies.length) return null;

  if (isTopTen) {
    return (
      <div className="section fade-up">
        <div className="section-header">
          <div className="section-title">{title}</div>
          <button className="see-all">See All →</button>
        </div>
        <div className="top10-row">
          {movies.slice(0, 10).map((movie, index) => (
            <div key={movie.id} className="top10-card" onClick={() => onMovieClick && onMovieClick(movie)}>
              <div className="top10-num">{index + 1}</div>
              <div className="movie-card-img top10-poster">
                {movie.poster_path ? (
                  <img src={`${IMG_BASE}/w300${movie.poster_path}`} alt={movie.title} className="poster-img" />
                ) : (
                  <div className="poster-placeholder">{movie.title}</div>
                )}
                <div className="card-overlay">
                  <div className="play-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21" /></svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="section fade-up">
      <div className="section-header">
        <div className="section-title">{title}</div>
        <button className="see-all">See All →</button>
      </div>
      <div className="row-scroll">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`movie-card ${isLarge ? "large" : ""}`}
            onClick={() => onMovieClick && onMovieClick(movie)}
          >
            <div className="movie-card-img">
              {movie.poster_path ? (
                <img src={`${IMG_BASE}/w300${movie.poster_path}`} alt={movie.title} className="poster-img" />
              ) : (
                <div className="poster-placeholder">{movie.title}</div>
              )}
              <div className="card-overlay">
                <div className="play-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21" /></svg>
                </div>
              </div>
              {movie.vote_average >= 7.5 && (
                <div className="card-badge gold">★ {movie.vote_average.toFixed(1)}</div>
              )}
            </div>
            <div className="card-info">
              <div className="card-title">{movie.title}</div>
              <div className="card-year">{movie.release_date?.split("-")[0]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
