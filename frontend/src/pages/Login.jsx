import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Reaching out to our future Spring Boot backend on port 8080
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      localStorage.setItem('user', JSON.stringify(response.data.username));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Sign In</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={styles.input} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.toggleText}>
          New here? <Link to="/register" style={styles.link}>Create an account</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f7fb', fontFamily: 'Arial' },
  card: { background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  input: { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  error: { color: 'red', fontSize: '14px', backgroundColor: '#ffeef0', padding: '10px', borderRadius: '4px' },
  toggleText: { marginTop: '20px', textAlign: 'center', fontSize: '14px' },
  link: { color: '#007bff', textDecoration: 'none' }
};

export default Login;