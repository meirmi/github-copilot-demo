import React, { useCallback, useEffect, useState } from 'react';
import ResourceList from './ResourceList';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const API_URL = codespace
  ? `https://${codespace}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'members', label: 'Members' },
];

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTeams = useCallback(() => {
    setLoading(true);
    setError(null);
    console.log('Fetching teams from:', API_URL);
    fetch(API_URL)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log('Fetched teams:', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  return (
    <ResourceList title="Teams" items={teams} columns={COLUMNS} loading={loading} error={error} onRefresh={loadTeams} />
  );
}

export default Teams;
