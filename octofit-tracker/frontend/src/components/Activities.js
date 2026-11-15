import React, { useCallback, useEffect, useState } from 'react';
import ResourceList from './ResourceList';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const API_URL = codespace
  ? `https://${codespace}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

const COLUMNS = [
  { key: 'user', label: 'User' },
  { key: 'activity_type', label: 'Activity Type' },
  { key: 'duration', label: 'Duration' },
];

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadActivities = useCallback(() => {
    setLoading(true);
    setError(null);
    console.log('Fetching activities from:', API_URL);
    fetch(API_URL)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log('Fetched activities:', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return (
    <ResourceList
      title="Activities"
      items={activities}
      columns={COLUMNS}
      loading={loading}
      error={error}
      onRefresh={loadActivities}
    />
  );
}

export default Activities;
