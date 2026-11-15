import React, { useCallback, useEffect, useState } from 'react';
import ResourceList from './ResourceList';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const API_URL = codespace
  ? `https://${codespace}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

const COLUMNS = [
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
];

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(() => {
    setLoading(true);
    setError(null);
    console.log('Fetching users from:', API_URL);
    fetch(API_URL)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log('Fetched users:', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <ResourceList title="Users" items={users} columns={COLUMNS} loading={loading} error={error} onRefresh={loadUsers} />
  );
}

export default Users;
