import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      setMessage(response.data.message + " Redirecting to login...");
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required style={styles.input} />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={styles.input} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.toggleText}>
          Already have an account? <Link to="/" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f7fb', fontFamily: 'Arial' },
  card: { background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  input: { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  error: { color: 'red', fontSize: '14px', backgroundColor: '#ffeef0', padding: '10px', borderRadius: '4px' },
  success: { color: 'green', fontSize: '14px', backgroundColor: '#e6f4ea', padding: '10px', borderRadius: '4px' },
  toggleText: { marginTop: '20px', textAlign: 'center', fontSize: '14px' },
  link: { color: '#007bff', textDecoration: 'none' }
};

export default Register;