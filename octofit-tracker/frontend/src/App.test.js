import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the navigation menu', () => {
  render(<App />);
  ['Activities', 'Leaderboard', 'Teams', 'Users', 'Workouts'].forEach(label => {
    expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
  });
});

test('toggles dark mode and remembers it', () => {
  localStorage.setItem('octofit-theme', 'light');
  render(<App />);
  expect(document.documentElement).toHaveAttribute('data-bs-theme', 'light');
  fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
  expect(document.documentElement).toHaveAttribute('data-bs-theme', 'dark');
  expect(localStorage.getItem('octofit-theme')).toBe('dark');
});
