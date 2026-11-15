import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { GlassButton, GlassCard, GlassNav, GlassSwitch } from '@zakisheriff/liquid-glass';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { ActivityIcon, DumbbellIcon, HomeIcon, MoonIcon, SunIcon, TeamsIcon, TrophyIcon, UsersIcon } from './icons';
import logo from './octofitapp-small.png';
import './App.css';

const pages = [
  { to: '/', label: 'Home', icon: <HomeIcon /> },
  { to: '/activities', label: 'Activities', icon: <ActivityIcon />, text: 'Log and review workouts completed by students.' },
  { to: '/leaderboard', label: 'Leaderboard', icon: <TrophyIcon />, text: 'See who is leading the school fitness challenge.' },
  { to: '/teams', label: 'Teams', icon: <TeamsIcon />, text: 'Browse teams and their members.' },
  { to: '/users', label: 'Users', icon: <UsersIcon />, text: 'Look up registered OctoFit users.' },
  { to: '/workouts', label: 'Workouts', icon: <DumbbellIcon />, text: 'Explore suggested workouts.' },
];
const featurePages = pages.filter(page => page.text);

const THEME_KEY = 'octofit-theme';

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function useCompactScreen() {
  const query = '(max-width: 767.98px)';
  const [compact, setCompact] = useState(() => (window.matchMedia ? window.matchMedia(query).matches : false));

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const media = window.matchMedia(query);
    const update = () => setCompact(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return compact;
}

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <GlassCard className="octofit-hero mb-4" padding="2rem" radius="32px">
        <img src={logo} className="octofit-hero-logo" alt="" />
        <div>
          <h1 className="octofit-title">Welcome to OctoFit Tracker</h1>
          <p className="lead mb-0">
            Fitness tracking for Mergington High School: log activities, join teams and climb the leaderboard.
          </p>
        </div>
      </GlassCard>
      <div className="row g-4">
        {featurePages.map(page => (
          <div className="col-12 col-md-6 col-lg-4" key={page.to}>
            <GlassCard className="octofit-feature h-100" padding="1.5rem" radius="28px">
              <span className="octofit-feature-icon">{page.icon}</span>
              <h2 className="h4">{page.label}</h2>
              <p className="flex-grow-1">{page.text}</p>
              <GlassButton variant="tinted" onClick={() => navigate(page.to)}>
                Open {page.label}
              </GlassButton>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
}

function Shell() {
  const [theme, setTheme] = useState(getInitialTheme);
  const compact = useCompactScreen();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-bs-theme', theme);
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const isDark = theme === 'dark';
  const activeIndex = Math.max(0, pages.findIndex(page => page.to === pathname));

  return (
    <div className="container octofit-shell">
      <header className="octofit-header">
        <Link className="octofit-brand" to="/">
          <img src={logo} className="octofit-logo" alt="OctoFit logo" />
          <span>OctoFit Tracker</span>
        </Link>
        <GlassNav
          className="octofit-nav"
          aria-label="Sections"
          items={pages.map(({ label, icon }) => ({ label, icon }))}
          activeIndex={activeIndex}
          onChange={index => navigate(pages[index].to)}
          showLabels={!compact}
        />
        <div className="octofit-theme">
          <SunIcon />
          <GlassSwitch checked={isDark} onChange={checked => setTheme(checked ? 'dark' : 'light')} aria-label="Dark mode" />
          <MoonIcon />
        </div>
      </header>
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
  );
}

function App() {
  return (
    <Router>
      <Shell />
    </Router>
  );
}

export default App;
