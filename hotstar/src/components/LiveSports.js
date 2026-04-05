import React, { useState } from "react";
import "./LiveSports.css";

const SPORTS_DATA = [
  { id: 1, live: true,  emoji: "🏏", league: "IPL 2024 · Match 42",   match: "MI vs CSK",              status: "Mumbai Indians 186/4 (18.2 ov)", color: "#1a6cff", category: "Cricket"    },
  { id: 2, live: true,  emoji: "⚽", league: "Champions League",        match: "Real Madrid vs Man City", status: "67' · 2 – 1",                  color: "#00b09b", category: "Football"   },
  { id: 3, live: false, emoji: "🎾", league: "Wimbledon · QF",          match: "Djokovic vs Alcaraz",     status: "Tomorrow, 6:30 PM IST",         color: "#8e44ad", category: "Tennis"     },
  { id: 4, live: false, emoji: "🏎️", league: "Formula 1 · British GP", match: "Qualifying Session",      status: "Saturday, 7:00 PM IST",         color: "#e74c3c", category: "F1"         },
  { id: 5, live: false, emoji: "🏀", league: "NBA Finals",              match: "Celtics vs Mavericks",    status: "Tonight, 8:00 AM IST",          color: "#f39c12", category: "Basketball" },
];

function LiveSports() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Cricket", "Football", "Tennis", "F1", "Basketball"];

  const filteredSports =
    activeFilter === "All"
      ? SPORTS_DATA
      : SPORTS_DATA.filter((s) => s.category === activeFilter);

  return (
    <div className="section fade-up">
      <div className="section-header">
        <div className="section-title">Live Sports</div>
        <div className="sports-filters">
          {filters.map((f) => (
            <button
              key={f}
              className={`sport-filter ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="sports-row">
        {filteredSports.map((sport) => (
          <div key={sport.id} className={`sport-card ${sport.live ? "is-live" : ""}`}>
            <div className="sport-bg-emoji">{sport.emoji}</div>
            {sport.live && (
              <div className="live-badge"><span className="live-dot" />LIVE</div>
            )}
            <div className="sport-body">
              <div className="sport-league">{sport.league}</div>
              <div className="sport-match">{sport.match}</div>
              <div className="sport-status">{sport.status}</div>
              {sport.live && <button className="watch-live-btn">Watch Live →</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveSports;
