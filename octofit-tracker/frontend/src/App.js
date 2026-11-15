import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.png';
import './App.css';

const navItems = [
  { to: '/activities', label: 'Activities', text: 'Log and review workouts completed by students.' },
  { to: '/leaderboard', label: 'Leaderboard', text: 'See who is leading the school fitness challenge.' },
  { to: '/teams', label: 'Teams', text: 'Browse teams and their members.' },
  { to: '/users', label: 'Users', text: 'Look up registered OctoFit users.' },
  { to: '/workouts', label: 'Workouts', text: 'Explore suggested workouts.' },
];

function Home() {
  return (
    <div>
      <div className="octofit-hero p-4 p-md-5 mb-4 bg-body rounded-3 shadow-sm">
        <img src={logo} className="octofit-hero-logo" alt="" />
        <div>
          <h1 className="display-5 fw-bold">Welcome to OctoFit Tracker</h1>
          <p className="lead mb-0">
            Fitness tracking for Mergington High School: log activities, join teams and climb the leaderboard.
          </p>
        </div>
      </div>
      <div className="row g-4">
        {navItems.map(item => (
          <div className="col-12 col-md-6 col-lg-4" key={item.to}>
            <div className="card octofit-feature-card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h2 className="card-title h4">{item.label}</h2>
                <p className="card-text flex-grow-1">{item.text}</p>
                <Link to={item.to} className="btn btn-primary align-self-start">
                  Open {item.label}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const THEME_KEY = 'octofit-theme';

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <Router>
      <div className="container py-3">
        <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar rounded-3 px-3">
          <Link className="navbar-brand octofit-brand fw-bold" to="/">
            <img src={logo} className="octofit-logo" alt="OctoFit logo" />
            <span>OctoFit Tracker</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofitNav"
            aria-controls="octofitNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="octofitNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {navItems.map(item => (
                <li className="nav-item" key={item.to}>
                  <NavLink className="nav-link" to={item.to}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn-outline-light btn-sm ms-lg-3 mb-2 mb-lg-0"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-pressed={isDark}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </nav>
        <main className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
