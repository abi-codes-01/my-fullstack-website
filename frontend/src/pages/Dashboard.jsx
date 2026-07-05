import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem('user')) || 'User';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Welcome to Your Secure Website, {username}!</h1>
      <p>This is a protected dashboard. You made it here via a successful backend SQL authentication flow!</p>
      <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' }}>
        Log Out
      </button>
    </div>
  );
}

export default Dashboard;