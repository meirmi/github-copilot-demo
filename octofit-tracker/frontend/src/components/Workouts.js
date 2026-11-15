import React, { useCallback, useEffect, useState } from 'react';
import ResourceList from './ResourceList';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const API_URL = codespace
  ? `https://${codespace}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
];

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWorkouts = useCallback(() => {
    setLoading(true);
    setError(null);
    console.log('Fetching workouts from:', API_URL);
    fetch(API_URL)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log('Fetched workouts:', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  return (
    <ResourceList
      title="Workouts"
      items={workouts}
      columns={COLUMNS}
      loading={loading}
      error={error}
      onRefresh={loadWorkouts}
    />
  );
}

export default Workouts;
