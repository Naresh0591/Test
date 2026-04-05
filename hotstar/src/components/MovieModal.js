import React from "react";
import "./MovieModal.css";

const IMG_BASE = "https://image.tmdb.org/t/p";

function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  const rating = movie.vote_average?.toFixed(1);
  const year   = movie.release_date?.split("-")[0];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {movie.backdrop_path && (
          <div
            className="modal-backdrop-img"
            style={{ backgroundImage: `url("${IMG_BASE}/w780${movie.backdrop_path}")` }}
          >
            <div className="modal-backdrop-overlay" />
          </div>
        )}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="modal-body">
          {movie.poster_path && (
            <img className="modal-poster" src={`${IMG_BASE}/w300${movie.poster_path}`} alt={movie.title} />
          )}
          <div className="modal-info">
            <h2 className="modal-title">{movie.title}</h2>
            <div className="modal-meta">
              {rating && <span className="modal-rating">★ {rating}</span>}
              {year && <span>{year}</span>}
              {movie.original_language && (
                <span className="modal-lang">{movie.original_language.toUpperCase()}</span>
              )}
            </div>
            <p className="modal-overview">{movie.overview}</p>
            <div className="modal-actions">
              <button className="modal-play-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                Watch Now
              </button>
              <button className="modal-trailer-btn">+ Watchlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
