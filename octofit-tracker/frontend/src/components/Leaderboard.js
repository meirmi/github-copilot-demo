import React, { useCallback, useEffect, useState } from 'react';
import ResourceList from './ResourceList';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const API_URL = codespace
  ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

const COLUMNS = [
  { key: 'user', label: 'User' },
  { key: 'score', label: 'Score' },
];

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLeaderboard = useCallback(() => {
    setLoading(true);
    setError(null);
    console.log('Fetching leaderboard from:', API_URL);
    fetch(API_URL)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log('Fetched leaderboard:', data);
        setLeaderboard(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  return (
    <ResourceList
      title="Leaderboard"
      items={leaderboard}
      columns={COLUMNS}
      loading={loading}
      error={error}
      onRefresh={loadLeaderboard}
    />
  );
}

export default Leaderboard;
