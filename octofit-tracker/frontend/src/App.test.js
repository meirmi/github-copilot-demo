import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the navigation menu', () => {
  render(<App />);
  ['Home', 'Activities', 'Leaderboard', 'Teams', 'Users', 'Workouts'].forEach(label => {
    expect(screen.getByRole('tab', { name: label })).toBeInTheDocument();
  });
});

test('toggles dark mode and remembers it', () => {
  localStorage.setItem('octofit-theme', 'light');
  render(<App />);
  expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  fireEvent.click(screen.getByRole('switch', { name: 'Dark mode' }));
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  expect(document.documentElement).toHaveAttribute('data-bs-theme', 'dark');
  expect(localStorage.getItem('octofit-theme')).toBe('dark');
});
